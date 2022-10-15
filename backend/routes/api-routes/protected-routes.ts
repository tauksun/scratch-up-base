import { Router } from "express";
import { userManagement } from "../../api";

const router = Router();

// user-data //

router.get("/user-data", userManagement.getUserData);
router.get("/logout", userManagement.logout);

// uploads //

export default router;
