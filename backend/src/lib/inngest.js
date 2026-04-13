import { Inngest } from "inngest";
import dbConnect from "../lib/db.js";
import { upsertUsers } from "./stream.js";

export const inngest = new Inngest({
  id: "chat_app",
});

export const syncUsersToStream = inngest.createFunction(
  {
    id: "syncUsers",
    triggers: [{ event: "chatApp/user.created" }],
  },
  async ({ event, step }) => {
    try {
      await dbConnect();
      const { _id: id } = event.data;
      await upsertUsers({ _id });
    } catch (error) {
      console.log("syncing user error: ", error);
      throw error;
    }
  },
);
