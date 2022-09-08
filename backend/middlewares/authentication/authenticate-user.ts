import { Request, Response, NextFunction } from "express";
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
    const sessionId = getUserToken({ req, userTokenName });

    if (!sessionId) {
      throw `No ${userTokenName} found in request`;
    }

    // Check session in db //
    const result = await validateSession({ sessionId });

    if (!result) {
      throw "Not a valid session";
    }

    const session = result.session;
    // Store session data in response.locals //
    // The variables set on res.locals are available within a single request-response cycle,
    // and will not be shared between requests.
    res.locals.session = { sessionId, ...session };

    next();
  } catch (error) {
    // Responding with a bad request
    // user can be redirected here to the login page //
    console.log("\n Error occured while authenticating user : ", error);
    errorResponse({ req, res, code: 400, error: "Not Authenticated" });
  }
};

export default authenticate;
