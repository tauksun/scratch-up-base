import { Request, Response } from "express";
import { errorResponse, successResponse } from "../../helpers";
import { sessionFunctions } from "../../services";

const logout = async (req: Request, res: Response) => {
  try {
    // Extract sessionId after authentication middleware from res.locals.session
    const locals = res.locals;
    const session = locals.session;
    const sessionId = session.sessionId;

    // Remove session from db
    const { result } = await sessionFunctions.deleteSession({ sessionId });

    if (!result) {
      throw "failed to delete session";
    }

    return successResponse({
      req,
      res,
      code: 200,
    });
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
