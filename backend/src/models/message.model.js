import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema(
  {
    senderId: {
      type: mongoose.Schema.ObjectId,
      ref: "UserModel",
      required: true,
    },
    receiverId: {
      type: mongoose.Schema.ObjectId,
      ref: "UserModel",
      required: true,
    },
    text: {
      type: String,
      default: "",
    },
    image: {
      type: String,
    },
  },
  { timestamps: true },
);

const MessageModel =
  mongoose.models.messagetbl || mongoose.model("messagetbl", MessageSchema);

export default MessageModel;
