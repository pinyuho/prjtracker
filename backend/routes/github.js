import express, { query } from "express";

const router = express.Router();
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

// Get code passed from frontend
router.get("/access-token", async (req, res) => {
  console.log(req.query.code);
  const params = `?client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}&code=${req.query.code}`;

  await fetch(`https://github.com/login/oauth/access_token${params}`, {
    method: "POST",
    headers: {
      Accept: "application/vnd.github+json",
    },
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
      res.json(data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});

// getUserData
router.get("/user", async function (req, res) {
  //   req.get("Authorization");
  await fetch("https://api.github.com/user", {
    method: "GET",
    headers: {
      Authorization: req.get("Authorization"),
      Accept: "application/vnd.github+json",
    },
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
      res.json(data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});

// getRepos : Create a repository for the authenticated user
router.get("/repos", async function (req, res) {
  await fetch(`https://api.github.com/user/repos`, {
    method: "GET",
    headers: {
      Authorization: req.get("Authorization"),
      Accept: "application/vnd.github+json",
    },
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
      res.json(data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});

// getIssues
router.get("/issues/:owner/:repo", async function (req, res) {
  await fetch(
    `https://api.github.com/repos/${req.params.owner}/${req.params.repo}/issues`,
    {
      method: "GET",
      headers: {
        Authorization: req.get("Authorization"),
        Accept: "application/vnd.github+json",
      },
    }
  )
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
      res.json(data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});

// getIssue
router.get("/issues/:owner/:repo/:issue_number", async function (req, res) {
  await fetch(
    `https://api.github.com/repos/${req.params.owner}/${req.params.repo}/issues/${req.params.issue_number}`,
    {
      method: "GET",
      headers: {
        Authorization: req.get("Authorization"),
        Accept: "application/vnd.github+json",
      },
    }
  )
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
      res.json(data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});

// updateIssue
router.patch("/issues/:owner/:repo/:issue_number", async function (req, res) {
  await fetch(
    `https://api.github.com/repos/${req.params.owner}/${req.params.repo}/issues/${req.params.issue_number}`,
    {
      method: "PATCH",
      body: JSON.stringify(req.body),
      headers: {
        Authorization: req.get("Authorization"),
        Accept: "application/vnd.github+json",
      },
    }
  )
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
      res.json(data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});

// searchIssues
router.get("/search/issues/:query", async function (req, res) {
  await fetch(`https://api.github.com/search/issues?q=${req.params.query}`, {
    method: "GET",
    headers: {
      Authorization: req.get("Authorization"),
      Accept: "application/vnd.github.text-match+json",
    },
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
      res.json(data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});

// addIssues
router.post("/issues/:owner/:repo", async function (req, res) {
  await fetch(
    `https://api.github.com/repos/${req.params.owner}/${req.params.repo}/issues`,
    {
      method: "POST",
      body: JSON.stringify(req.body),
      headers: {
        Authorization: req.get("Authorization"),
        Accept: "application/vnd.github+json",
      },
    }
  )
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
      res.json(data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});

export default router;
