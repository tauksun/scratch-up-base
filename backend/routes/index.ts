import { Router } from "express";
import { pages } from "../api";
import apiRouter from "./api-routes";

const router = Router();

/////////////////
// API Routes //
///////////////

router.use("/api", apiRouter);

// Unknown routes ->  Not Found //
router.all("/*", pages.notFound);

export default router;
