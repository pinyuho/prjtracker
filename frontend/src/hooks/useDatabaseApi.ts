import { useState, useEffect, Dispatch, SetStateAction } from "react";
import qs from "qs";

import { AxiosError } from "axios";
import agent from "../agent";

import { ITaskRaw, TaskStatus } from "../types";

const useDatabaseApi = (): [
  (tasks: ITaskRaw[]) => Promise<any>, // addTasks
  (
    issueId: number,
    taskStatus: TaskStatus,
    isSetLoading: boolean
  ) => Promise<any>, // editTasksStatus
  (issueId: number) => Promise<any>, // getTaskStatus
  (issueIds: number[]) => Promise<any> // batchReadTasks
] => {
  const [rerender, setRerender] = useState(false);
  const [loading, setLoading] = useState(false);

  const addTasks = async (tasks: ITaskRaw[]) => {
    try {
      const { data } = await agent.post(
        `/db/tasks`,
        tasks, // req.body
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`
          }
        }
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
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`
          }
        }
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
      const { data } = await agent.get(`/db/task/${issueId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`
        }
      });
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
      const { data } = await agent.get(`/db/tasks/${qs.stringify(issueIds)}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`
        }
      });
      console.log("Get task status:", data);
      setLoading(false);

      return data;
    } catch (error) {
      const err = error as AxiosError;
      console.log("error: ", err.response?.data);
      return err.response?.data;
    }
  };

  return [addTasks, editTaskStatus, getTaskStatus, batchReadTasks];
};

export default useDatabaseApi;
