import { GithubAuth } from "../models/GithubAuth.js";
import { decryptToken } from "../utils/tokenCrypto.js";

export const requireGithubAuth = async (req, res, next) => {
  try {
    if (!req.session?.userId) {
      return res.status(401).json({ error: "not_logged_in" });
    }

    const auth = await GithubAuth.findOne({ githubUserId: req.session.userId });
    if (!auth) {
      return res.status(401).json({ error: "missing_credentials" });
    }

    const accessToken = decryptToken(auth);

    // 把 token 掛到 req 上，讓後面的 routes 都可以用
    req.githubAccessToken = accessToken;

    // 放行，進到下一個 handler（我的 routes）
    next();
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "server_error" });
  }
};
