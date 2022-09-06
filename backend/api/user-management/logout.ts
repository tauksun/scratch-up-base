import { Request, Response } from "express";
import { errorResponse } from "../../helpers";

const logout = async (req: Request, res: Response) => {
  try {
    //
  } catch (error) {
    console.log("\n Error occured while logging out : ", error);
    // Pass error or messasge below as needed
    return errorResponse({
      req,
      res,
      code: 500,
    });
  }
};

export default logout;
