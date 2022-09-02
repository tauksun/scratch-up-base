import { Request } from "express";
import { cookieFetcher } from "..";
import { constants } from "..";

/**
 *
 * @description
 * Extracts cookie from request & returns the user-token or empty string \
 * Set user-token name in the constants or pass it as parameter \
 * _user-token name defaults to "userId"_
 *
 */
const getUserToken = (params: {
  req: Request;
  userTokenName?: string;
}): string => {
  try {
    const req = params.req;
    const userTokenName = params.userTokenName;
    const defaultUserTokenName = constants.userTokenName;

    const userToken = userTokenName || defaultUserTokenName;

    const userTokenValue = cookieFetcher({ req, cookie: userToken });
    return userTokenValue;
  } catch (error) {
    console.log("\n Error occured while fetching user token : ", error);
    return "";
  }
};

export default getUserToken;
