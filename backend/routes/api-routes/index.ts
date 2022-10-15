import { Router } from "express";
import { authenticate } from "../../middlewares";
import { pages } from "../../api";
import openRouter from "./open-routes";
import protectedRouter from "./protected-routes";

const router = Router();

/////////////////
// Open Routes //
/////////////////

router.use(openRouter);

//////////////////////
// Protected Routes //
//////////////////////

// Authentication Middleware //
router.use(authenticate);

router.use(protectedRouter);

// Not Found //
/**
 * @description
 * All unknown api routes fall under authentication
 * ie., only authenticated users will be able to navigate to some random route \
 * all other visitors, when navigating to unknown routes will be blocked by authentication middleware
 */
router.all("/*", pages.notFound);

export default router;
