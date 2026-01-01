export enum TaskStatus {
  Open = "open",
  InProgress = "in-progress",
  Done = "done",
}

export enum IssueStatus {
  Open = "open",
  Closed = "closed",
}
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
  state: IssueStatus; // default: "open"
  labels: string[];
  number: number;
  html_url: string;
  repo: string;
}

export interface IRepo {
  id: number;
  name: string;
  open_issues_count: number;
}
