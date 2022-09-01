import { Request, Response } from "express";
import { pages } from "../api";

/**
 *
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
function successResponse(params: {
  code: Number;
  message?: String;
  data?: any;
  req: Request;
  res: Response;
}) {
  const { req, res, code, message = null, data = null } = params;

  // Send Response
  res.json({ code, message, data });
}

/**
 *
 * @description
 * Send Error in response \
 * To send page for an error instead of json, set httpResponse to true
 *
 * @example
 * // To send json response
 * errorResponse({
 * req,
 * res,
 * code:500,
 * httpResponse: false;
 * error:"descriptive error",
 * message:"descriptive message"
 * })
 *
 * // To send http response for 400
 * errorResponse({
 * req,
 * res,
 * code:400,
 * httpResponse: true;
 * })
 */
function errorResponse(params: {
  req: Request;
  res: Response;
  code: number;
  httpResponse?: boolean;
  message?: string;
  error?: any;
}) {
  let {
    req,
    res,
    code,
    httpResponse = false,
    error = null,
    message = null,
  } = params;

  // Send Json Response
  if (!httpResponse) {
    return res.json({ code, error, message });
  }

  // Send Http Response
  switch (code) {
    case 400:
      return pages.badRequest(req, res);

    case 404:
      return pages.notFound(req, res);

    case 500:
      return pages.internalServerError(req, res);

    default:
      return pages.internalServerError(req, res);
  }
}

export { successResponse, errorResponse };
