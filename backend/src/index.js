import express from "express";
import { config } from "dotenv";
import cors from "cors";
import authRouter from "./routes/auth.routes.js";
import messageRouter from "./routes/message.route.js";
import dbConnect from "./lib/db.js";
import cookieParser from "cookie-parser";
import { app, io, server } from "./lib/socket.js";
import path from "node:path";

config();

const PORT = process.env.PORT || 5001;
const __dirname = path.resolve();
app.use(
  cors({
    methods: ["GET", "POST", "PATCH", "DELETE"],
    origin: process.env.REACT_FRONTEND_URL,
    credentials: true,
  }),
);

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cookieParser());
app.use("/api/auth", authRouter);
app.use("/api/message", messageRouter);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../../frontend/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../../frontend", "dist", "index.html"));
  });
}

server.listen(PORT, (err) => {
  if (err) {
    console.log(err.message);
  } else {
    console.log(`Server Started at http://localhost:${PORT}`);
    dbConnect();
  }
});
