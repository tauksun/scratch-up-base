import { NextFunction, Request, Response } from "express";
import { constants, errorResponse, getUserToken } from "../../helpers";
import validateSession from "./db-session-checker";

/**
 * @description
 * Fetches (user authentication Id)cookie from request \
 * Checks with db(eg : redis) for the session of the user
 *
 * Upon failure, responds to client with authentication error \
 * This can be used to redirect un-authenticated users to login/signup page
 *
 */
const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    //////////////////////////////////////////////
    console.log("\n-- Going through authentication middleware --\n");
    //////////////////////////////////////////////

    // Get user token from request //
    const userTokenName = constants.userTokenName;
    const userToken = getUserToken({ req, userTokenName });

    if (!userToken) {
      throw `No ${userTokenName} found`;
    }

    // Check session in db //
    const isSession = await validateSession({ userToken });

    if (!isSession) {
      throw "Not a valid session";
    }

    next();
  } catch (error) {
    // Responding with a bad request
    // user can be redirected here to the login page //
    console.log("\n Error occured while authenticating user : ", error);
    errorResponse({ req, res, code: 400, error: "Not Authenticated" });
  }
};

export default authenticate;
