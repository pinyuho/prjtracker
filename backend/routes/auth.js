import express from "express";
import crypto from "crypto";
import { GithubAuth } from "../models/GithubAuth.js";
import { encryptToken } from "../utils/tokenCrypto.js";

const router = express.Router();

function base64url(buf) {
  return buf
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/g, "");
}
function randomString(bytes = 32) {
  return base64url(crypto.randomBytes(bytes));
}
function sha256base64url(str) {
  return base64url(crypto.createHash("sha256").update(str).digest());
}

// optional: auth middleware
function requireAuth(req, res, next) {
  if (!req.session?.userId) return res.status(401).json({ error: "not_logged_in" });
  next();
}

/**
 * GET /auth/github
 * Redirect to GitHub authorize with PKCE+state
 */
router.get("/github", (req, res) => {
  const state = randomString(16);
  const codeVerifier = randomString(32);
  const codeChallenge = sha256base64url(codeVerifier);

  req.session.oauthState = state;
  req.session.codeVerifier = codeVerifier;

  const params = new URLSearchParams({
    client_id: process.env.GITHUB_CLIENT_ID,
    redirect_uri: process.env.GITHUB_REDIRECT_URI,
    scope: process.env.GITHUB_SCOPE ?? "read:user repo", // 依需求縮小
    state,
    code_challenge: codeChallenge,
    code_challenge_method: "S256",
  });

  res.redirect(`https://github.com/login/oauth/authorize?${params.toString()}`);
});

/**
 * GET /auth/github/callback
 * Exchange code -> token -> fetch user -> encrypt&store -> session login
 */
router.get("/github/callback", async (req, res) => {
  try {
    const { code, state } = req.query;
    if (!code || !state) return res.status(400).send("Missing code/state");

    if (state !== req.session.oauthState) return res.status(400).send("Bad state");
    const codeVerifier = req.session.codeVerifier;
    if (!codeVerifier) return res.status(400).send("Missing code_verifier");

    // exchange for access token
    const tokenRes = await fetch("https://github.com/login/oauth/access_token", {
      method: "POST",
      headers: { Accept: "application/json", "Content-Type": "application/json" },
      body: JSON.stringify({
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        redirect_uri: process.env.GITHUB_REDIRECT_URI,
        code,
        code_verifier: codeVerifier,
      }),
    });

    const tokenJson = await tokenRes.json();
    if (!tokenRes.ok || tokenJson.error) {
      return res.status(401).json(tokenJson);
    }

    const accessToken = tokenJson.access_token;

    // fetch GitHub user
    const meRes = await fetch("https://api.github.com/user", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: "application/vnd.github+json",
      },
    });
    const me = await meRes.json();
    if (!meRes.ok) return res.status(401).json(me);

    const githubUserId = String(me.id);
    const enc = encryptToken(accessToken);

    // upsert into Mongo
    await GithubAuth.findOneAndUpdate(
      { githubUserId },
      {
        githubUserId,
        username: me.login,
        avatarUrl: me.avatar_url,
        ...enc,
        scope: tokenJson.scope ?? "",
        tokenType: tokenJson.token_type ?? "bearer",
      },
      { upsert: true, new: true }
    );

    // login session
    req.session.userId = githubUserId;
    req.session.username = me.login;
    req.session.avatarUrl = me.avatar_url;

    // cleanup one-time fields
    delete req.session.oauthState;
    delete req.session.codeVerifier;

    // redirect back to frontend
    res.redirect(process.env.FRONTEND_URL ?? "/");
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "server_error" });
  }
});

/**
 * GET /auth/me
 * return session info
 */
router.get("/me", (req, res) => {
  if (!req.session?.userId) return res.json({ loggedIn: false });
  return res.json({
    loggedIn: true,
    userId: req.session.userId,
    username: req.session.username,
    avatarUrl: req.session.avatarUrl,
  });
});

/**
 * POST /auth/logout
 * clear session + delete stored token
 */
router.post("/logout", requireAuth, async (req, res) => {
  try {
    await GithubAuth.deleteOne({ githubUserId: req.session.userId });

    req.session.destroy(() => {
      res.clearCookie("sid"); // 這裡要跟你 session 的 cookie name 一致
      res.json({ ok: true });
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "server_error" });
  }
});

export default router;
