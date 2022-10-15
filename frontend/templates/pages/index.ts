import { getBaseTemplate } from "..";
import * as notFound from "./notFound";

export type IPage = "notFound";

const getHtmlPage = (params: { page: IPage }) => {
  const { page } = params;

  let title = "",
    body = "";

  switch (page) {
    case "notFound":
      title = notFound.title;
      body = notFound.body;
      break;

    default:
      // Throwning error here, gets handled in errorHandler middleware
      throw { code: 500 };
  }

  const template = getBaseTemplate({
    title,
    body,
  });

  return template;
};

export default getHtmlPage;
