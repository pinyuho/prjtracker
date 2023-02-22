import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { dbConnection } from "./mongo.js";

import Routes from "./routes/index.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());
Routes(app);

dbConnection.once("open", () => {
  console.log("Connected to MongoDB.");
});

app.listen(port, () => {
  console.log(`CORS server on port: ${port}`);
});
