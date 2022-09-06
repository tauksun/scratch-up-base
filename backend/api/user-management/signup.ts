import { Request, Response } from "express";
import { sessionFunctions, users } from "../../services";
import uuid from "uuid";
import { successResponse, errorResponse, generateHash } from "../../helpers";

const signUp = async (req: Request, res: Response) => {
  try {
    const params = req.body;

    const email = params.email;
    const password = params.password;

    // Validations here...
    ///////////////////////////////////////////////////
    /////////// ToDO /////////////////////////////////////
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

    // Store to DB
    const v4 = uuid.v4;
    const userId = v4();
    const {} = await users.create({
      id: userId,
      email,
      password: hashedPassword,
    });

    // Create Session
    const { session } = await sessionFunctions.createSession({ userId });

    const sessionId = session.id;

    // Return
    return successResponse({
      req,
      res,
      code: 200,
      message: "User created successfully",
      data: {
        session: {
          id: sessionId,
        },
      },
    });
  } catch (error) {
    console.log("\nError occured during sign up : ", error);
    return errorResponse({
      req,
      res,
      code: 500,
      error: "failed to create user",
    });
  }
};

export default signUp;
