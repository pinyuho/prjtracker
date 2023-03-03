import express from "express";
import { Task } from "../models/Task.js";

import qs from "qs";
const router = express.Router();

router.post("/tasks", async (req, res) => {
  const issueIds = req.body;
  const bulkUpdateOps = issueIds.map((issueId) => {
    return {
      updateOne: {
        filter: { issueId: issueId },
        update: { $setOnInsert: { status: "open" } },
        upsert: true,
      },
    };
  });

  await Task.bulkWrite(bulkUpdateOps)
    .then((response) => {
      res.json(response);
    })
    .catch((err) => {
      console.error({ err });
    });
});

router.patch("/task/:issueId", async (req, res) => {
  await Task.findOneAndUpdate(
    { issueId: req.params.issueId },
    { $set: { status: req.body.status } },
    { upsert: true }
  )
    .then((response) => res.json(response))
    .catch((err) => res.status(400).json({ err }));
});

router.get("/task/:issueId", async (req, res) => {
  await Task.find({ issueId: req.params.issueId })
    .then((Tasks) => {
      if (Tasks.length !== 0) {
        res.json({
          status: Tasks[0].status,
          found: true,
        });
      } else {
        res.json({
          status: "",
          found: false, // for adding new issues
        });
      }
    })
    .catch((err) => res.status(400).json({ err }));
});

router.get("/tasks/:issueIds", async (req, res) => {
  const issueIdsObj = qs.parse(req.params.issueIds);
  const issueIds = Object.values(issueIdsObj);
  await Task.find({ issueId: { $in: issueIds } })
    .then((response) => {
      res.json(response);
    })
    .catch((err) => res.status(400).json({ err }));
});

export default router;
