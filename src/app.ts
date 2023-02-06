import express, {Application } from "express";
import errorHandler from "./utilities/errorHandler";
import config from "./config/config";
import connect from "./config/database";
import { Log } from "log-color-console-npm";
import route from "./routes/route";
import httpException from "./exceptions/exception";
import swaggerDoc from "./utilities/swagger";
import cors from "cors";

const app: Application = express();

app.use(cors());
//middlewares
app.use(express.json());
app.use(express.urlencoded());

app.use(`${config.API_PREFIX}/parking`, route);

app.use(errorHandler);
app.use(httpException);

// listening connection
app.listen(config.PORT, async () => {
  await connect();
  Log.success(`server is on port ${config.HOST}:${config.PORT}`);
  swaggerDoc(app, config.PORT);
});
