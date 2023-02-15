import database from "./database.js";
import githubAuth from "./githubAuth.js";

export default function (app) {
  app.use("/db", database);
  app.use("/github", githubAuth);
}
