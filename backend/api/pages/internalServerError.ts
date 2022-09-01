import { Request, Response } from "express";
import path from "path";

const internalServerError = async (req: Request, res: Response) => {
  const filePath = path.join(
    __dirname,
    "../../templates/internalServerError.html"
  );
  res.sendFile(filePath);
};

export default internalServerError;
