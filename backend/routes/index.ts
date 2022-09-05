import Router from "express";
import { pages, tests } from "../api";
import { authenticate } from "../middlewares";
import openRouter from "./open-routes";
import protectedRouter from "./protected-routes";

const router = Router();

/////////////
// Testing //
/////////////
router.get("/redis-test", tests.redisInsertTest);
router.get("/test/:email/:id", tests.getUserDetails);
router.get("/test/:email/:user_id", tests.insertDetailsTest);

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
 * All unknown routes fall under authentication
 * ie., only authenticated users will be able to navigate to some random route \
 * all other visitors, when navigating to unkown routes will be blocked by authentication middleware
 */
router.all("/*", pages.notFound);

export default router;
