import { Request, Response } from "express";
import { errorResponse, successResponse } from "../../helpers";
import { userDetails } from "../../services";

const getUserData = async (req: Request, res: Response) => {
  try {
    // Extract userId from locals after passing through Authentication Middleware
    const locals = res.locals;
    const session = locals.session;
    const userId = session.userId;

    // Fetch user-data
    const { data } = await userDetails.fetch({
      user_id: userId,
      columns: ["username", "phone_number", "profile_photo"],
    });

    const { username, phone_number, profile_photo } = data;

    return successResponse({
      req,
      res,
      code: 200,
      data: {
        username,
        phoneNumber: phone_number,
        profilePhoto: profile_photo,
      },
    });
  } catch (error) {
    console.log("\n Error occured while getting user data : ", error);
    errorResponse({
      req,
      res,
      code: 500,
      error: "failed to get user data",
    });
  }
};

export default getUserData;
