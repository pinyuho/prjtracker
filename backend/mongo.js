import mongoose from "mongoose";
import * as dotenv from "dotenv";

dotenv.config();

mongoose.set("strictQuery", false);

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const dbConnection = mongoose.connection;

export { dbConnection };
