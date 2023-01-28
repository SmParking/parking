import express, {Request, Response, NextFunction, Application} from "express";
import errorHandler from './utilities/errorHandler';
import config from './config/config'
import { Server } from 'http';
import createHttpError from "http-errors";
const app: Application = express();

// api routes
app.get('/', (req: Request, res: Response, next: NextFunction) => {
    res.send('hello world!');
})

// Error handler 
app.use((req: Request, res: Response, next: NextFunction)=> {
    next(new createHttpError.NotFound())
})

// app use statements 
app.use(errorHandler);

const server: Server = app.listen(config.PORT, () => { console.log(`server is on port ${config.HOST}:${config.PORT}`)});