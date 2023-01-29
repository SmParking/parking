import dotenv from "dotenv";
import { findSourceMap, SourceMap } from "module";
dotenv.config();
import path from "path";

const BASE_PATH = path.join(__dirname + "../../../");
const SOURCE_PATH = path.join(__dirname + "../../");

const PORT: Number = Number(process.env.PORT) || 8000;
const URI: string = process.env.MONGO_URI || "";
const VERSION = process.env.VERSION || "1.0.0";

const config = {
  PORT: PORT,
  HOST: process.env.HOST,
  URI: URI,
  VERSION: VERSION,
  BASEPATH: BASE_PATH,
  SOURCEPATH: SOURCE_PATH,
};

export default config;
