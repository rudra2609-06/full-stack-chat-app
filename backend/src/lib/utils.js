import jwt from "jsonwebtoken";
import { config } from "dotenv";
config();

export const generateToken = async (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
  res.cookie("jwt", token, {
    maxAge: 604800000,
    httpOnly: true, //prevents XSS attacks
    sameSite: "strict", //prevents XSS attacks
    secure: process.env.NODE_ENV !== "development",
  });

  return token;
};
