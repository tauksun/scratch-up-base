import { NextFunction, Request, Response } from "express";

/**
 * @description
 * Fetches (user authentication Id)cookie from request \
 * Checks with db(eg : redis) for the session of the user
 *
 * Upon failure, responds to client with authetication error
 *
 */
const authenticate = (req: Request, res: Response, next: NextFunction) => {
  try {
    /////////////////////////////////////////////////////////////

    //      Make it such that both options are available
    //       1) session based
    //       2) JWT based
    //       & can be switched easily with just a function call or parameter passed

    //      By default go with > session based //

    /////////////////////////////////////////////////////////////

    // TODO :
    // Fetch the userId using function from helpers > get user token
    //      if not present throw error
    // Hit Redis to check for valid user session
    //      If not present > throw error
    // otherwise > call next

    ////////////// for now ///////////////////
    console.log("\n-- Going through authentication middleware --\n");
    next();
  } catch (error) {
    console.log("\n Error occured while authenticating user : ", error);
    // To respond or not to
  }
};

export default authenticate;
