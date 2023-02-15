export type TaskStatus = "open" | "in-progress" | "done";

export interface ITask {
  id: number;
  title: string;
  status: TaskStatus;
  createdTime: Date;
  body: string;
}
