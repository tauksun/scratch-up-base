import Router from "express";
import { userManagement } from "../api";

const router = Router();

// User-Management //
router.post("/sign-up", userManagement.signUp);
router.post("/sign-in", userManagement.signIn);

export default router;
