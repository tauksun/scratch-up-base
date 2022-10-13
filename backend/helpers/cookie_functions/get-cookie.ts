import { Request } from "express";
import { log } from "..";
/**
 *
 * @description
 * Fetch cookie by name
 *
 * @example
 * cookieFetcher({
 * req:req,
 * cookie:"userId"})
 */
const cookieFetcher = (params: { req: Request; cookie: string }): string => {
  try {
    const req = params.req;
    const cookieToFetch = params.cookie;

    const headers = req.headers || {};
    const cookies = headers?.cookie || "";
    if (!cookies) {
      throw "No cookies found";
    }

    const cookieArray = cookies.split(";");
    const cookieObject: any = {};

    for (let cookieData of cookieArray) {
      let [cookieName, cookieValue] = cookieData.split("=");
      cookieName = cookieName.trim();
      cookieValue = cookieValue.trim();
      cookieObject[cookieName] = cookieValue;
    }

    const cookieToFetchValue = cookieObject[cookieToFetch] || "";

    return cookieToFetchValue;
  } catch (error) {
    log.error({
      prefix: "Fetching Cookie",
      message: { error },
    });
    return "";
  }
};

export default cookieFetcher;
