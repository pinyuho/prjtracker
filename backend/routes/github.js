import express, { query } from "express";
import { githubFetch } from "../utils/githubFetch.js";
import { requireGithubAuth } from "../middlewares/requireGithubAuth.js";
import { normalizeIssue } from "../utils/normalizer.js";

const router = express.Router();

// get user data
router.get("/user", requireGithubAuth, async function (req, res) {
  //   req.get("Authorization");
  await githubFetch(req, "https://api.github.com/user", {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      // console.log(data);
      res.json(data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});

// get repos : Get repositories for the authenticated user
router.get("/repos", requireGithubAuth, async function (req, res) {
  const type = "owner";
  await githubFetch(req, `https://api.github.com/user/repos?type=${type}`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      // console.log(data);
      res.json(data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});

// get all issues (cross repos)
router.get("/issues/all", requireGithubAuth, async function (req, res) {
  const sort = "created";
  const direction = "desc";

  try {
    const response = await githubFetch(
      req,
      `https://api.github.com/issues?filter=all` +
        `&per_page=${req.query.per_page}&page=${req.query.page}&sort=${sort}&direction=${direction}`,
      { method: "GET" }
    );

    const data = await response.json();

    const normalized = Array.isArray(data)
      ? data.map((issue) => normalizeIssue(issue))
      : data;

    res.json(normalized);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Failed to fetch issues" });
  }
});

// get issues (of a repo)
router.get("/issues/:owner/:repo", requireGithubAuth, async function (req, res) {
  const sort = "created";
  const direction = "desc";

  try {
    const response = await githubFetch(
      req,
      `https://api.github.com/repos/${req.params.owner}/${req.params.repo}/issues` +
        `?per_page=${req.query.per_page}&page=${req.query.page}&sort=${sort}&direction=${direction}`,
      { method: "GET" }
    );

    const data = await response.json();

    const normalized = Array.isArray(data)
      ? data.map((issue) => normalizeIssue(issue, req.params.owner, req.params.repo))
      : data;

    res.json(normalized);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Failed to fetch issues" });
  }
});

// search issues
router.get("/search/issues/:query", requireGithubAuth, async function (req, res) {
  await githubFetch(req, `https://api.github.com/search/issues?q=${req.params.query}`, {
    method: "GET",
    headers: {
      Accept: "application/vnd.github.text-match+json",
    },
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      // console.log(data);
      res.json(data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});

// ---- single issue routes ----

// get an issue
router.get("/issues/:owner/:repo/:issue_number", requireGithubAuth, async function (req, res) {
  await githubFetch(req, `https://api.github.com/repos/${req.params.owner}/${req.params.repo}/issues/${req.params.issue_number}`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      // console.log(data);
      res.json(data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});

// add an issue
router.post("/issue/:owner/:repo", requireGithubAuth, async function (req, res) {
  await githubFetch(req, `https://api.github.com/repos/${req.params.owner}/${req.params.repo}/issues`, {
    method: "POST",
    body: JSON.stringify(req.body),
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      // console.log(data);
      res.json(data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});

// update an issue
router.patch("/issues/:owner/:repo/:issue_number", requireGithubAuth, async function (req, res) {
  await githubFetch(req, `https://api.github.com/repos/${req.params.owner}/${req.params.repo}/issues/${req.params.issue_number}`, {
    method: "PATCH",
    body: JSON.stringify(req.body),
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      // console.log(data);
      res.json(data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});

export default router;
