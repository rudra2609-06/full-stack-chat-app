import express from "express";
import { isAuthenicated } from "../middlewares/auth.middleware.js";
import { getUserForSideBar, getMessages, sendMessages } from "../controllers/message.controller.js";

const router = express.Router();

router.get("/user", isAuthenicated, getUserForSideBar);

router.get("/:id",isAuthenicated,getMessages);

router.post("/send/:id",isAuthenicated,sendMessages);

export default router;
