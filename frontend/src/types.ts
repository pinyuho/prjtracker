export type TaskStatus = "open" | "in-progress" | "done" | "";
export type IssueStatus = "open" | "closed";

export interface ITaskRaw {
  issueId: number;
  status: TaskStatus;
}

export interface ITask {
  issueId: number;
  title: string;
  status: TaskStatus;
  createdTime: Date;
  body: string;
  repo: string;
  number: number;
}

// Raw data fetched from API

export interface IUser {
  login: string; // username
  avatar_url: string;
}

export interface IIssue {
  id: number;
  title: string;
  created_at: Date;
  body: string;
  state: "open" | "closed"; // default: "open"
  labels: string[];
  number: number;
}

export interface IRepo {
  id: number;
  name: string;
  open_issues_count: number;
}
