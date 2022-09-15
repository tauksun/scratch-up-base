import Router, { NextFunction, Request, Response } from "express";
import path from "path";
import { constants } from "../helpers";

const router = Router();

router.get("/*", (req: Request, res: Response, next: NextFunction) => {
  const url = req.url;
  const fileRequired = url.slice(1);

  const webFiles = constants.webFiles;
  const isValidFile = webFiles.includes(fileRequired);

  if (!isValidFile) {
    return next();
  }

  res.sendFile(path.join(__dirname, `../../build/${fileRequired}`));
});

export default router;
