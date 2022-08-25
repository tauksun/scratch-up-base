import { Request, Response } from "express";

const signIn = async (req: Request, res: Response) => {
  console.log(" \n\n ### User signing in ### \n\n");
  res.json("Signed in");
};

export default signIn;
