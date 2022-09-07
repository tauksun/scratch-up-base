import Router from "express";
import { userManagement } from "../api";

const router = Router();
router.get("/user-data", userManagement.getUserData);
router.get("/logout", userManagement.logout);

// Uploads //

export default router;
