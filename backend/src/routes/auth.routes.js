import express from "express";
import { login, logout, signup,updateUserProfile, checkAuth } from "../controllers/auth.controller.js";
import { isAuthenicated } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/signup", signup);

router.post("/login", login); 

router.post("/logout", isAuthenicated ,logout);

router.patch("/update-profile", isAuthenicated, updateUserProfile);

router.get("/check",isAuthenicated, checkAuth);


export default router;
