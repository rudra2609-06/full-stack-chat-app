import express from "express";
import { isAuthenicated } from "../middlewares/auth.middleware.js";
import {
  getStreamToken,
  createSession,
  endSession,
  getActiveSession,
  getPastSession,
  getSessionById,
  joinSession,
} from "../controllers/session.controller.js";

const router = express.Router();

router.get("/token", isAuthenicated, getStreamToken);

router.post("/", isAuthenicated, createSession);
router.get("/:id", isAuthenicated, getActiveSession);
router.get("/my-recent", isAuthenicated, getPastSession);
router.get("/:id", isAuthenicated, getSessionById);
router.post("/:id/join", isAuthenicated, joinSession);
router.post("/:id/end", isAuthenicated, endSession);

export default router;
