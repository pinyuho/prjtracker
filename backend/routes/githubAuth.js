import express from "express";

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
      Accept: "application/json",
    },
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
      res.json(data);
    });
});

// getUserData
router.get("/user", async function (req, res) {
  //   req.get("Authorization");
  await fetch("https://api.github.com/user", {
    method: "GET",
    headers: {
      Authorization: req.get("Authorization"), // Bearer ACCESSTOKEN
    },
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
      res.json(data);
    });
});

// getIssues
router.get("/issues", async function (req, res) {
  const owner = "pinyuho";
  const repo = "dcard-fe";
  await fetch(`https://api.github.com/repos/${owner}/${repo}/issues`, {
    method: "GET",
    headers: {
      Authorization: req.get("Authorization"), // Bearer ACCESSTOKEN
    },
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
      res.json(data);
    });
});

// getRepos : Create a repository for the authenticated user
router.get("/repos", async function (req, res) {
  const owner = "pinyuho";
  const repo = "dcard-fe";
  await fetch(`https://api.github.com/user/repos`, {
    method: "GET",
    headers: {
      Authorization: req.get("Authorization"), // Bearer ACCESSTOKEN
    },
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
      res.json(data);
    });
});

export default router;
