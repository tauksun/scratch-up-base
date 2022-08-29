import { Request, Response } from "express";

interface Isuccess {
  code: Number;
  message?: String;
  data?: any;
  req: Request;
  res: Response;
}

interface Ierror {
  code: Number;
  message?: String;
  error: any;
  req: Request;
  res: Response;
}

/**
 *
 * @param params
 * @description
 * Send successful response
 * @example
 * successResponse({
 * req,
 * res,
 * code:200,
 * message:"Successfully queued the pic conversion",
 * data:{
 * queueId:"1234-5678-abcd-efgh"
 * }
 * })
 */
function successResponse(params: Isuccess) {
  const { req, res, code, message = null, data = null } = params;

  // Send Response
  res.json({ code, message, data });
}

/**
 *
 * @param params
 * @description
 * Send Error in response
 * @example
 * errorResponse({
 * req,
 * res,
 * code:500,
 * error:"descriptive error",
 * message:"descriptive message"
 * })
 *
 */
function errorResponse(params: Ierror) {
  const { req, res, code, error, message = null } = params;

  // Send Response
  res.json({ code, error, message });
}

export { successResponse, errorResponse };
