import { Request, Response } from "express";
import { getHtmlPage, IPage } from "../../templates";

// Function Maker for different pages //
const servePage = (params: { page: IPage }) => {
  const { page } = params;
  return (req: Request, res: Response) => {
    const template = getHtmlPage({
      page,
    });
    res.setHeader("content-type", "text/html");
    res.send(template).end();
  };
};

////////////
// Pages //
///////////
const badRequest = servePage({ page: "badRequest" });
const internalServerError = servePage({ page: "internalServerError" });
const notFound = servePage({ page: "notFound" });
// Add your page request handler //

export { notFound, badRequest, internalServerError };
