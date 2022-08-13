import cors from "cors";
import { constants } from "../helpers";
import { Request, Response, NextFunction } from "express";

const corsHandler = (req: Request, res: Response, next: NextFunction) => {
  const allowedOrigins = constants.allowedOrigins;
  // Cors logic here //
  // Pass control to next if in allowed origins
  // else return with cors error

  // ! for now #testing
  return cors;
};

export default corsHandler;
