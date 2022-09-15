import Router, { Request, Response } from "express";
import webCentricRoutes from "./web-centric-routes";

const router = Router();

// Routes that are used to require files used by web technoligies eg : manifest, robots, logo, favicon
router.use(webCentricRoutes);

// Unknown routes
router.all("/*", (req: Request, res: Response) => {
  throw { code: 400 };
});

export default router;
