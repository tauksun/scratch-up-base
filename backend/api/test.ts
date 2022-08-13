import { Request, Response, NextFunction } from "express";

const testRoute = (req: Request, res: Response) => {
  console.log("\n\n### Hit on test route ### \n\n");
  res.json("From test route");
};

export default testRoute;