import { Request, Response } from "express";
import { successResponse, errorResponse } from "../../helpers";

const signUp = async (req: Request, res: Response) => {
  try {
    const params = req.body;

    const email = params.email;
    const password = params.password;

    // Validations here...

    // Check for already registered

    // Hash Password

    // Store to DB
    res.send("signed -- up");
  } catch (error) {
    console.log("\nError occured during sign up : ", error);
    // errorResponse(////////////////////////)
  }
};

export default signUp;
