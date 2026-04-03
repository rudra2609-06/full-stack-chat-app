import mongoose from "mongoose";
import { config } from "dotenv";
import path from "path";
import { fileURLToPath } from "url";


const dbConnect = async () => {
  try {
    await mongoose.connect(process.env.DB_URI);
    console.log("Db Connected");
  } catch (error) {
    console.log(error.message);
  }
};


export default dbConnect;
