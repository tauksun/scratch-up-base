import { Request, Response } from "express";

const isSession = async (req: Request, res: Response) => {
  try {
    res.send("Yup session is here .. ");
  } catch (error) {
    res.send("Nope session is in error : " + error);
  }
};

export default isSession;
