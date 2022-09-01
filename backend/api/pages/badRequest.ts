import { Request, Response } from "express";
import path from "path";

const badRequest = async (req: Request, res: Response) => {
  const filePath = path.join(__dirname, "../../templates/badRequest.html");
  res.sendFile(filePath);
};

export default badRequest;
