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
router.all("/*", pages.notFound);

export default router;
