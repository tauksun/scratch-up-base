import helmet from "helmet";
import { Request, Response, NextFunction } from "express";

const headersHandler = (req: Request, res: Response, next: NextFunction) => {
  console.log("In http headers handler");
  console.log("Url is > ", req.url);
  next();
};

export default headersHandler ;
