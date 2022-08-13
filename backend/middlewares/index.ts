import { NextFunction, Request, Response } from "express";
import corsHandler from "./corsHandler";
import { headersHandler } from "./headersHandler";

// TODO: Experimental >> Execute middlewares one by one in this fashion
// const middlewares = (req: Request, res: Response, next: NextFunction) => {
//   headersHandler(req, res, next);
//   corsHandler(req, res, next);
// };

export { corsHandler, headersHandler };
