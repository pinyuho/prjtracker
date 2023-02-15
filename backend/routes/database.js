import express from "express";

// task model
import { Task } from "../models/Task.js";
const router = express.Router();

router.post("/", async (req, res) => {
  const newTask = new Task(req.body);

  let response = {
    message: "",
  };

  await newTask
    .save()
    .then((response.message = `Adding (${req.body.title})`))
    .catch((err) => res.status(400).json("Error! " + err));

  res.json(response);
});

router.get("/", async (req, res) => {
  let response = {
    tasks: [],
    message: "",
  };

  await Task.find()
    .then(function (Tasks) {
      if (Tasks.length !== 0) {
        response.tasks = Tasks;
      } else {
        response.message = `not found!`;
      }
    })
    .catch((err) => res.status(400).json("Error! " + err));

  res.json(response);
});

export default router;
