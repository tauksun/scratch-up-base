import { NextFunction, Request, Response } from "express";

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

    // TODO :
    // Fetch the userId using function from helpers > get user token
    //      if not present throw error
    // Hit Redis to check for valid user session
    //      If not present > throw error
    // otherwise > call next



    // Fetch user auth id from cookies

    

    // Validate session with db 




    ////////////// for now ///////////////////
    console.log("\n-- Going through authentication middleware --\n");
    next();
  } catch (error) {
    console.log("\n Error occured while authenticating user : ", error);
    // To respond or not to
  }
};

export default authenticate;
