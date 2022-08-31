import Router from "express";
import { userManagement, pages, tests } from "../api";

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
router.get("/logout", userManagement.logout);

//////////////////////
// Protected Routes //
//////////////////////

router.get("/is-session", userManagement.isSession);
router.get("/user-data", userManagement.getUserData);

// Uploads //

// Not Found //
router.all("/*", pages.notFound);

export default router;
