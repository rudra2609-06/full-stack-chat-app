import { Server } from "socket.io";
import http from "node:http";
import express from "express";
import { config } from "dotenv";

config();

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: process.env.REACT_FRONTEND_URL,
    methods: ["GET", "POST", "PATCH", "DELETE"],
    credentials: true,
  },
});

export const getReceiverSocketId = (userId) => {
    return userSocketMap[userId];
}

//use to store online users
const userSocketMap = {}; //{userId : socketId}

io.on("connection", (socket) => {
  console.log("User connected", socket.id);

  const userId = socket.handshake.query.userId;
  if (userId) userSocketMap[userId] = socket.id;

  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  socket.on("disconnect", () => {
    console.log("User disconnected", socket.id);
    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

export { io, app, server };

//NOTE:Simple Rule — Express handles your normal API. HTTP server is the bridge. Socket.IO rides on top of that bridge for real-time communication.

//Browser
//    |
//    |--- HTTP Request  (normal API calls) ----→ |
//    |--- WebSocket Upgrade Request ----------→  | ← needs ONE server handling both
//                                                |
//                                           HTTP Server
//                                           /          \
//                                     Express          Socket.IO
//                                    (REST API)      (Real-time)

// WebSocket connection doesn't start fresh — it starts as HTTP then upgrades:
// Client → "hey I want to connect via WebSocket"
//          (sends HTTP request with header: "Upgrade: websocket") ---> this upgrade is done only by the http server not by the express

// Server → "ok upgrading..."
//        → connection is now WebSocket ✅
// This upgrade only works at the HTTP server level — Express alone can't handle it.
