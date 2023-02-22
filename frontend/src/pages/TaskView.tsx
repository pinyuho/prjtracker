import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BiCollection, BiHash, BiTimeFive } from "react-icons/bi";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import moment from "moment";
import { IIssue, TaskStatus } from "../types";

import useGithubApi from "../hooks/useGithubApi";
import useDatabaseApi from "../hooks/useDatabaseApi";

import LoadAnimation from "../components/utils/LoadAnimation";
import TaskStatusSwitch from "../components/utils/TaskStatusSwitch";

import { TaskProperty } from "../components/TaskDetails/index";
import TaskHeader from "../components/TaskDetails/TaskHeader";

const MIN_BODY_LENGTH = 30;

const TaskView = () => {
  const navigate = useNavigate();
  const [editing, setEditing] = useState(false);
  const [issue, setIssue] = useState<IIssue>({} as IIssue);

  const [inputTitle, setInputTitle] = useState("");
  const [inputBody, setInputBody] = useState("");

  const [createdTime, setCreatedTime] = useState("");
  const [status, setStatus] = useState<TaskStatus>("");

  const { repoOwner, repoName, issueNumber } = useParams();

  const [
    rerender,
    setRerender,
    loading,
    setLoading,
    loginWithGithub,
    getUserData,
    getRepos,
    getIssues,
    getIssue,
    updateIssue,
    deleteIssue
  ] = useGithubApi();
  const [addTasks, editTaskStatus, getTaskStatus, batchReadTasks] =
    useDatabaseApi();

  useEffect(() => {
    const fetchTask = async (
      repoOwner: string,
      repoName: string,
      issueNumber: number
    ) => {
      const data: any = await getIssue(repoOwner, repoName, issueNumber);
      setIssue(data);

      // Set edit fields' default input value
      setInputTitle(data.title);
      setInputBody(data.body);

      // Set task properties
      setCreatedTime(moment(data.created_at).format("YYYY-MM-DD HH:mm:ss"));

      // Fetch task status in database
      console.log("Now data id: ", data.id);
      const statusObj: any = await getTaskStatus(data.id); // statusObj: status, found
      setStatus(statusObj.status);
    };

    setLoading(true);
    if (repoOwner && repoName && issueNumber) {
      fetchTask(repoOwner, repoName, Number(issueNumber));
    }
  }, []);

  const handleInputBody = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    event.preventDefault();
    setInputBody(event.target.value);
  };

  const handleDoneClick = () => {
    if (inputTitle === "") {
      alert("Title cannot be empty!");
    } else if (inputBody === null || inputBody?.length < MIN_BODY_LENGTH) {
      alert("Body must be at least 30 characters");
    } else if (repoOwner && repoName && issueNumber) {
      updateIssue(
        repoOwner,
        repoName,
        Number(issueNumber),
        inputTitle,
        inputBody
      );
      setEditing(false);
      navigate(0); // refresh page
    }
  };

  return (
    <div className="flex flex-col">
      <div className="mt-6 w-11/12 self-center md:w-[1100px]">
        {/* Header */}
        <TaskHeader
          title={issue?.title}
          inputTitle={inputTitle}
          setInputTitle={setInputTitle}
          loading={loading}
          editing={editing}
          setEditing={setEditing}
          handleDoneClick={handleDoneClick}
        />

        {/* Task Properties */}
        {/* Issue Number */}
        <div className="mt-2">
          <TaskProperty
            loading={loading}
            icon={BiHash}
            title="Issue number"
            content={issueNumber}
            isContentTextStyle={true}
          />
        </div>
        {/* Issue Created Time */}
        <TaskProperty
          loading={loading}
          icon={BiTimeFive}
          title="Created at"
          content={createdTime}
          isContentTextStyle={true}
        />

        {/* Task Status */}
        <TaskProperty
          loading={loading}
          icon={BiCollection}
          title="Status"
          content={
            <TaskStatusSwitch
              issueId={issue?.id}
              status={status}
              setStatus={setStatus}
            />
          }
          isContentTextStyle={false}
        />

        {/* Task Body */}
        {loading ? (
          <div className="flex flex-row justify-center">
            <div className="mx-10 flex h-[500px] w-8 flex-col justify-center leading-9 text-zinc-600">
              <LoadAnimation />
            </div>
          </div>
        ) : editing ? (
          <div className="mt-2.5 min-h-[480px] w-full rounded-lg border-2 border-zinc-600 bg-[#2c2c2cc3] shadow-inner shadow-[#0c0c0c] ">
            <textarea
              className={`h-full min-h-[480px] w-full bg-transparent px-[26px] pt-5 leading-7 text-zinc-300 outline-none ${
                inputBody?.length < 30 && "border-red-500"
              }`}
              onChange={handleInputBody}
              // value={inputBody}
              defaultValue={inputBody}
            />
          </div>
        ) : (
          <div className="mt-3 flex h-max min-h-[470px] rounded-lg bg-[#8f8f8f0e] px-7 py-5 shadow-inner shadow-[#101010]">
            {issue.body === null ? (
              <div className="flex h-[470px] w-full justify-center">
                <div className="self-center py-1 px-4 text-zinc-500">
                  No desciption provided.
                </div>
              </div>
            ) : (
              <div className="text-md h-max min-h-[470px] min-w-[30px] text-left leading-7 text-zinc-300">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {issue.body}
                </ReactMarkdown>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskView;
