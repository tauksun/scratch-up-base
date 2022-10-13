import { Request, Response } from "express";
import {
  compareHash,
  constants,
  errorResponse,
  setCookie,
  successResponse,
  log,
} from "../../helpers";
import { sessionFunctions, users } from "../../services";
import validate from "../../validations";

const signIn = async (req: Request, res: Response) => {
  try {
    const params = req.body;
    const email = params.email;
    const password = params.password;
    const username = params.username;

    // Validations
    validate({
      data: {
        email,
        password,
        username,
      },
      schema: "signIn",
    });

    // Fetch user details from db
    const { data: userData } = await users.fetch({
      email,
      columns: ["id", "password"],
    });

    const userId = userData?.id || null;

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
    const userTokenName = constants.userTokenName;
    setCookie({
      res,
      cookies: [
        {
          cookieName: userTokenName,
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
  } catch (error: any) {
    log.error({
      prefix: "Sign In",
      message: { error },
    });
    // Check for validationError flag, otherwise send a default error
    error = error.validationError
      ? error.validationMessage
      : "failed to sign in";
    errorResponse({
      req,
      res,
      code: 500,
      error,
    });
  }
};

export default signIn;
