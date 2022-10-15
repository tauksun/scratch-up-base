import { Router, Request, Response } from "express";
import webCentricRoutes from "./web-centric-routes";
import { getHtmlPage } from "../templates";

const router = Router();

// Routes that are used to require files used by web technoligies eg : manifest, robots, logo, favicon
router.use(webCentricRoutes);

// Unknown routes
router.all("/*", (req: Request, res: Response) => {
  const notFoundTemplate = getHtmlPage({
    page: "notFound",
  });
  res.setHeader("content-type", "text/html");
  res.send(notFoundTemplate).end();
});

export default router;
