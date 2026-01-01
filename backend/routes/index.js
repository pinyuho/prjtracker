import database from "./database.js";
import github from "./github.js";
import auth from "./auth.js"

export default function (app) {
  app.use("/db", database);
  app.use("/github", github);
  app.use("/auth", auth)
}
