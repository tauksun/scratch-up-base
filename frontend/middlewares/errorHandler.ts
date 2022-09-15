import { NextFunction, Request, Response } from "express";

/**
 * @description
 * Catches unhandled errors or custom errors \
 * responding with code & error message
 *
 * @example
 * // Throw custom error with code & message
 * throw({code:404,message:"Not found, what you are looking for !!!"})
 *
 */
const errorHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("\n Error caught in errorHandler : ", error?.stack || error);

  // check for the code in error, if not found default to 500
  const code = error?.code || 500;

  // check for message in error, if not found : use defaults

  let errorMessage = error?.message || null;

  if (!errorMessage) {
    switch (code) {
      case 400:
        errorMessage = "Bad Request";
        break;

      case 404:
        errorMessage = "Not Found";
        break;

      case 500:
        errorMessage = "Internal Server Error";
        break;
    }
  }

  return res.status(code).json({
    error: errorMessage,
  });
};

export default errorHandler;
