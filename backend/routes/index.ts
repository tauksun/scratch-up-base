import Router from "express";
import { userManagement, pages } from "../api";

const router = Router();

// User-Management //
router.post("/sign-up", userManagement.signUp);
router.post("/sign-in", userManagement.signIn);
router.get("/logout", userManagement.logout);
router.get("/is-session", userManagement.isSession);
router.get("/user-data", userManagement.getUserData);

// Uploads //


// Not Found //
router.all("/*", pages.notFound);

export default router;
