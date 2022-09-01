import { Request, Response } from "express";
// import { errorResponse } from "../../helpers";

const getUserData = async (req: Request, res: Response) => {
  console.log("<<< Hit on user Data >>>");
  //   return errorResponse({ req, res, code: 400 });
  res.json({
    data: {
      name: "demo",
      work: "demo",
    },
  });
};

export default getUserData;
