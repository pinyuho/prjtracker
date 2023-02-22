import { ITask } from "../types";

export function ascendingOrder(a: ITask, b: ITask) {
  return a.number - b.number;
}

export function descendingOrder(a: ITask, b: ITask) {
  return b.number - a.number;
}
