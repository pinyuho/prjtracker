import database from "./database.js";
import github from "./github.js";

export default function (app) {
  app.use("/db", database);
  app.use("/github", github);
}
