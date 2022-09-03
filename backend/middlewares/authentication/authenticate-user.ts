import { NextFunction, Request, Response } from "express";
import { constants, errorResponse, getUserToken } from "../../helpers";

/**
 * @description
 * Fetches (user authentication Id)cookie from request \
 * Checks with db(eg : redis) for the session of the user
 *
 * Upon failure, responds to client with authentication error
 *
 */
const authenticate = (req: Request, res: Response, next: NextFunction) => {
  try {
    //////////////////////////////////////////////
    console.log("\n-- Going through authentication middleware --\n");

    // Get user token from request //
    const userTokenName = constants.userTokenName;
    const userToken = getUserToken({ req, userTokenName });

    if (!userToken) {
      throw `No ${userTokenName} found`;
    }

    // TODO :
    // Fetch the userId using function from helpers > get user token
    //      if not present throw error
    // Hit Redis to check for valid user session
    //      If not present > throw error
    // otherwise > call next

    // Fetch user auth id from cookies

    // Validate session with db

    ////////////// for now ///////////////////
    next();
  } catch (error) {
    // Responding with a bad request
    // user can be redirected here to the login page //
    console.log("\n Error occured while authenticating user : ", error);
    errorResponse({ req, res, code: 400, error: "Not Authenticated" });
  }
};

export default authenticate;
