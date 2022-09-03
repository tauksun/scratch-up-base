import Router from "express";
import { userManagement, pages, tests } from "../api";
import { authenticate } from "../middlewares";

const router = Router();

// Testing //
router.get("/test/:email/:id", tests.getUserDetails);
router.get("/test/:email/:user_id", tests.insertDetailsTest);

/////////////////
// Open Routes //
/////////////////

// User-Management //
router.post("/sign-up", userManagement.signUp);
router.post("/sign-in", userManagement.signIn);

//////////////////////
// Protected Routes //
//////////////////////

// Authentication Middleware //
router.use(authenticate);

router.get("/is-session", userManagement.isSession);
router.get("/user-data", userManagement.getUserData);
router.get("/logout", userManagement.logout);

// Uploads //

// Not Found //
/**
 * @description
 * All unknown routes fall under authentication
 * ie., only authenticated users will be able to navigate to some random route \
 * all other visitors, when navigating to unkown routes will be blocked by authentication middleware
 */
router.all("/*", pages.notFound);

export default router;
