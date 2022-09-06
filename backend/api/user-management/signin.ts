import { Request, Response } from "express";
import {
  compareHash,
  errorResponse,
  setCookie,
  successResponse,
} from "../../helpers";
import { sessionFunctions, users } from "../../services";

const signIn = async (req: Request, res: Response) => {
  try {
    const params = req.body;
    const email = params.email;
    const password = params.password;

    /////////////////////////////
    // Validations ///////////////////////////
    /////////////////////////////

    // Fetch user details from db
    const { data: userData } = await users.fetch({
      email,
      columns: ["id", "password"],
    });

    const userId = userData.id || null;
    if (!userId) {
      return errorResponse({
        req,
        res,
        code: 400,
        error: "email is not registered",
        message: { registered: 0 },
      });
    }

    // Compare password
    const hashedPasswordFromDB = userData.password || null;
    if (!hashedPasswordFromDB) {
      throw "No hashed password found in DB";
    }

    const { result } = await compareHash({
      data: password,
      hash: hashedPasswordFromDB,
    });

    if (!result) {
      return errorResponse({
        req,
        res,
        code: 400,
        error: "wrong credentials",
        message: { wrongCredentials: 1 },
      });
    }

    // create session
    const { session } = await sessionFunctions.createSession({ userId });

    const sessionId = session.id;

    // store sessionId as cookie
    setCookie({
      res,
      cookies: [
        {
          cookieName: "sess",
          cookieValue: sessionId,
          httpOnly: true,
          secure: true,
          SameSite: "Strict",
          path: "/",
        },
      ],
    });

    // Return
    return successResponse({
      req,
      res,
      code: 200,
      data: {},
    });
  } catch (error) {
    console.log("\n Error occured while signing in : ", error);
    errorResponse({
      req,
      res,
      code: 500,
      error: "failed to sign in",
    });
  }
};

export default signIn;
