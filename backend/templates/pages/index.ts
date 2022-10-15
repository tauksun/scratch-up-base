import { getBaseTemplate } from "..";
import * as badRequest from "./badRequest";
import * as internalServerError from "./internalServerError";
import * as notFound from "./notFound";

export type IPage = "badRequest" | "internalServerError" | "notFound";

const getHtmlPage = (params: { page: IPage }) => {
  const { page } = params;

  let title = "",
    body = "";

  switch (page) {
    case "badRequest":
      title = badRequest.title;
      body = badRequest.body;
      break;

    case "internalServerError":
      title = internalServerError.title;
      body = internalServerError.body;
      break;

    case "notFound":
      title = notFound.title;
      body = notFound.body;
      break;

    default:
      title = internalServerError.title;
      body = internalServerError.body;
      break;
  }

  const template = getBaseTemplate({
    title,
    body,
  });

  return template;
};

export default getHtmlPage;
