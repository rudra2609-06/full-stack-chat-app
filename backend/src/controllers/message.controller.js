import MessageModel from "../models/message.model.js";
import UserModel from "../models/user.model.js";
import cloudinary from "../lib/cloudinary.js";
import { getReceiverSocketId, io } from "../lib/socket.js";

export const getUserForSideBar = async (req, res) => {
  try {
    const { user } = req;
    const usersForSidebar = await UserModel.find({ _id: { $ne: user._id } });
    return res
      .status(200)
      .json({ message: "Users For Side Bar Fetched", data: usersForSidebar });
  } catch (error) {
    console.log("get user for side bar error", error.message || error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getMessages = async (req, res) => {
  try {
    const { id: userToChat } = req.params; //renamed the incoming param
    const myId = req.user._id;
    if (!userToChat) {
      return res.status(400).json({ message: "Required User Id" });
    }
    const messages = await MessageModel.find({
      $or: [
        //let's suppose rudra is sender and ansh is receiver
        { senderId: myId, receiverId: userToChat },
        //let's suppose rudra is receiver and ansh is sender
        { receiverId: myId, senderId: userToChat },
      ],
    });
    console.log(messages);
    res.status(200).json({ message: "Messages Fetched", data: messages });
  } catch (error) {
    console.log("getMessages controller error", error.message || error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const sendMessages = async (req, res) => {
  try {
    const { id: receiverId } = req.params;
    if (Object.keys(req.body).length === 0) {
      return res.status(400).json({ message: "Cannot Send Empty Message" });
    }
    if (!receiverId) {
      return res
        .status(400)
        .json({ message: "Required Receiver Id To Send Message" });
    }
    const { text, image } = req.body;
    const senderId = req.user._id;
    let imgUrl;
    if (image) {
      const uploadResponse = await cloudinary.uploader.upload(image);
      imgUrl = uploadResponse.secure_url;
    }
    const newMessage = await MessageModel.create({
      senderId,
      receiverId,
      text,
      image: imgUrl,
    });
    const receiverSocketId = getReceiverSocketId(receiverId);
    if(receiverSocketId){
      io.to(receiverSocketId).emit("newMessage",newMessage);
    }
    
    return res
      .status(201)
      .json({ message: "Message Created Successfully", data: newMessage });
  } catch (error) {
    console.log("sendMessages controller error", error.message || error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
