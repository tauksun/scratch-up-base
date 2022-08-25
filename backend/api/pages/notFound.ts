import { Request, Response } from "express";
import path from "path";

const notFound = async (req: Request, res: Response) => {
  const filePath = path.join(__dirname, "../../templates/notFound.html");
  res.sendFile(filePath);
};

export default notFound;
