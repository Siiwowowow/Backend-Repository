/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import status from "http-status";
import z from "zod";
import { envVars } from "../config/env";
import { TErrorResponse, TErrorSources } from "../app/interfaceses/error.interface";
import AppError from "../app/errorHelpers/AppError";
import { handleZodError } from "../app/errorHelpers/HandelZodError";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const globalErrorHandler = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {

  // 🔴 VERY IMPORTANT FIX
  if (res.headersSent) {
    return next(err);
  }

  if (envVars.NODE_ENV === "development") {
    console.log("Error from Global Error Handler", err);
  }

  let errorSources: TErrorSources[] = [];
  let statusCode: number = status.INTERNAL_SERVER_ERROR;
  let message: string = "Internal Server Error";
  let stack: string | undefined = undefined;

  // Zod Error
  if (err instanceof z.ZodError) {
    const simplifiedError = handleZodError(err);

    statusCode = simplifiedError.statusCode as number;
    message = simplifiedError.message;
    errorSources = [...(simplifiedError.errorSource as TErrorSources[])];
    stack = err.stack;

  } 
  // Custom App Error
  else if (err instanceof AppError) {
    statusCode = err.statusCode;
    message = err.message;
    stack = err.stack;

    errorSources = [
      {
        path: "",
        message: err.message,
      },
    ];
  } 
  // Default Error
  else if (err instanceof Error) {
    message = err.message;
    stack = err.stack;

    errorSources = [
      {
        path: "",
        message: err.message,
      },
    ];
  }

  const errorResponse: TErrorResponse = {
    success: false,
    message,
    error: envVars.NODE_ENV === "development" ? err : undefined,
    stack: envVars.NODE_ENV === "development" ? stack : undefined,
    statusCode,
    errorSource: errorSources,
  };

  res.status(statusCode).json(errorResponse);
};