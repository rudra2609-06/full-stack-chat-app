import jwt from "jsonwebtoken";
import UserModel from "../models/user.model.js";
import { config } from "dotenv";
config();

export const isAuthenicated = async (req, res, next) => {
  try {
    const token = req.cookies?.jwt;
    if (!token) {
      return res.status(401).json({ message: "UnAuthorized" });
    }
    const decodedToken = await jwt.verify(token, process.env.JWT_SECRET);

    //validation for invalid token
    if (!decodedToken) {
      return res.status(401).json({ message: "UnAuthorized" });
    }

    const user = await UserModel.findById(decodedToken.userId);
    if (!user) {
      return res.status(404).json({ message: "User Not Found" });
    }
    req.user = user;
    return next();
  } catch (error) {
    console.log("auth middleware error", error.message || error);
    return res.status(500).json({ message: "Interal Server Error" });
  }
};
