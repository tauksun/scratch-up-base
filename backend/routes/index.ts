import Router, { Request, Response } from "express";
import { userManagement } from "../api";

const router = Router();

// User-Management //
router.post("/sign-up", userManagement.signUp);
router.post("/sign-in", userManagement.signIn);
router.get("/logout", userManagement.logout);
router.get("/is-session", userManagement.isSession);
router.get("/user-data", userManagement.getUserData);

// Uploads //

// Not Found //
// TODO : correct this implementation >> move out ######################
router.all("/*",(req:Request,res:Response)=>res.send("Not Found : "+req.url))

export default router;
