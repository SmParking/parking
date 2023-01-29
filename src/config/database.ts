import mongoose from "mongoose";
import config from "./config";
import { Log } from "log-color-console-npm";
const urlParser: Object = { useNewUrlParser: true };
const connect = async () => {
  try {
    await mongoose.set("strictQuery", false);
    await mongoose.connect(config.URI, urlParser, () => {
      Log.success("Connected to MongoDB");
    });
  } catch (error) {
    throw error;
  }
};

export default connect;
