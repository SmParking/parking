import { ErrorRequestHandler } from "express";

const errorHandler: ErrorRequestHandler = (err, req, res, next) => { 
    res.status(err.status || 500)
    res.send({
        status: err.status || 500,
        message: err.message
    })
};

export default errorHandler;