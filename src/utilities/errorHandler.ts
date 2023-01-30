import { ErrorRequestHandler } from "express";

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  console.log("i am in middleware!");
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "something went wrong!";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
};

export default errorHandler;
