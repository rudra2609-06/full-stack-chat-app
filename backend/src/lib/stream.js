import { StreamClient } from "@stream-io/node-sdk";
import { config } from "dotenv";

config();

const streamApikey = process.env.STREAM_API_KEY;
const streamApiSecret = process.env.STREAM_API_SECRET;

if (!streamApiSecret || !streamApikey) {
  throw new Error("Required Environment Variables for Streaming Vedio Calls");
}

export const streamClient = new StreamClient(streamApikey, streamApiSecret, {
  timeout: 6000,
});

export const upsertUsers = async (userData) => {
  try {
    await streamClient.upsertUsers([
      {
        id: userData._id,
        role: "user",
        custom: {
          color: "blue",
        },
      },
    ]);
  } catch (error) {
    console.log("error upserting users", error);
    throw error;
  }
};


