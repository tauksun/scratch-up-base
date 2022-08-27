import Router from "express";
import { userManagement, pages, tests } from "../api";

const router = Router();

// Testing //
router.get("/test/:email", tests.insertTest);
router.get("/get-postgres-data", tests.getPostgresData);

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
