import { Request, Response } from "express";
import { sessionFunctions, userDetails, users } from "../../services";
import * as uuid from "uuid";
import {
  successResponse,
  errorResponse,
  generateHash,
  setCookie,
  constants,
} from "../../helpers";

const signUp = async (req: Request, res: Response) => {
  try {
    const params = req.body;

    const email = params.email;
    const password = params.password;
    const username = params.username;
    const phoneNumber = params.phoneNumber || null;

    // Validations here...
    ///////////////////////////////////////////////////
    /////////// ToDO /////////////////////////////////////
    console.log({ params });
    /////////////////////////////////////////////////////

    // Check for already registered
    const { data } = await users.fetch({ email, columns: ["id"] });

    //-------------------------------------------------------//
    console.log({ data });
    //-------------------------------------------------------//

    if (data) {
      // User already exists
      return errorResponse({
        req,
        res,
        code: 400,
        error: { alreadyRegistered: 1 },
      });
    }

    // Hash Password
    const { hash: hashedPassword } = await generateHash({ data: password });

    // Store to DB - create user
    const v4 = uuid.v4;
    const userId = v4();
    await users.create({
      id: userId,
      email,
      password: hashedPassword,
    });

    // create user details
    // For now profile photo is "",
    // this can be replaced with the url of the profile image
    const profilePhoto = "";
    await userDetails.create({
      user_id: userId,
      username,
      phone_number: phoneNumber,
      profile_photo: profilePhoto,
    });

    // Create Session
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
      message: "User created successfully",
      data: {},
    });
  } catch (error) {
    console.log("\nError occured during sign up : ", error);
    return errorResponse({
      req,
      res,
      code: 500,
      error: "failed to signup",
    });
  }
};

export default signUp;
