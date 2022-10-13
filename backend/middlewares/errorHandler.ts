import { NextFunction, Request, Response } from "express";
import { pages } from "../api";
import { errorResponse, log } from "../helpers";

/**
 *
 * @description
 * Catches error thrown by middlewares or uncaught error in code, & responds to client with a generic or defined error
 *
 * By throwing error with new Error("error value"), further logic can be written in errorHandler to respond accordingly
 *
 * To respond / send pre-built error page for 400(badRequest), 500(internal server error), \
 * 404(not found) throw error with the code \
 * eg : throw({code:400}) \
 *
 * @example
 * // To respond with a pre-built error page
 * throw({code:400})
 */
const errorHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  log.info({
    prefix: "ErrorHandler",
    message: {
      data: "Error caught in errorHandler",
      error: error?.stack || error,
    },
  });

  // Logic for custom error thrown with code //
  // Check the code to respond with appropiate error message //

  let code = error?.code || null;
  const jsonResponse = error?.jsonResponse || false;

  // If error is thrown using : new Error("<error value here>")
  // then error (<error value here>) will be available in message below
  // which can be used to respond differently or change the flow further

  // With this approach error thrown anywhere in the code
  // can be collected here & further logic can be written per error basis
  const message = error?.message || null;

  switch (message) {
    case "Not allowed by CORS":
      code = 400;
      break;

    default:
      break;
  }

  // If code is not found : set default to 500
  if (!code) {
    code = 500;
  }

  // Respond with pre-built error pages //

  switch (code) {
    case 400:
      return jsonResponse
        ? errorResponse({ req, res, code, error: "Bad Request" })
        : pages.badRequest(req, res);
    case 500:
      return jsonResponse
        ? errorResponse({ req, res, code, error: "Internal Server Error" })
        : pages.internalServerError(req, res);
    case 404:
      return jsonResponse
        ? errorResponse({ req, res, code, error: "Not Found" })
        : pages.notFound(req, res);
  }

  return;
};

export default errorHandler;
