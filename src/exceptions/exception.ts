import createHttpError from "http-errors";
import { Request, Response, NextFunction } from "express";
// Error handler 

const httpException= (req: Request, res: Response, next: NextFunction)=> {
    next(new createHttpError.NotFound())
};

export default httpException;

