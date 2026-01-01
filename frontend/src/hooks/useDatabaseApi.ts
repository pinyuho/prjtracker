import { useState } from "react";
import qs from "qs";

import { AxiosError } from "axios";
import agent from "../api/agent";

import { ITaskRaw, TaskStatus } from "../types";

const useDatabaseApi = () => {
  // const [rerender, setRerender] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [loading, setLoading] = useState(false);

  const addTasks = async (issueIds: number[]) => {
    try {
      const { data } = await agent.post(
        `/db/tasks`,
        issueIds // req.body
      );
      console.log("Post tasks:", data);
      setLoading(false);

      return data;
    } catch (error) {
      const err = error as AxiosError;
      console.log("error: ", err.response?.data);
      return err.response?.data;
    }
  };

  const editTaskStatus = async (issueId: number, taskStatus: TaskStatus) => {
    try {
      const { data } = await agent.patch(
        `/db/task/${issueId}`,
        { status: taskStatus }, // req.body
      );
      console.log("Edited task:", data);
      setLoading(false);

      return data;
    } catch (error) {
      const err = error as AxiosError;
      console.log("error: ", err.response?.data);
      return err.response?.data;
    }
  };

  const getTaskStatus = async (issueId: number) => {
    try {
      const { data } = await agent.get(`/db/task/${issueId}`);
      console.log("Get task status:", data);
      setLoading(false);

      return data;
    } catch (error) {
      const err = error as AxiosError;
      console.log("error: ", err.response?.data);
      return err.response?.data;
    }
  };

  const batchReadTasks = async (issueIds: number[]) => {
    try {
      const { data } = await agent.get(`/db/tasks/${qs.stringify(issueIds)}`);
      console.log("Batch get task status:", data);
      setLoading(false);

      return data;
    } catch (error) {
      const err = error as AxiosError;
      console.log("error: ", err.response?.data);
      return err.response?.data;
    }
  };

  return { addTasks, editTaskStatus, getTaskStatus, batchReadTasks };
};

export default useDatabaseApi;
