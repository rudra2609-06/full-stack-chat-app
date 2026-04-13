import { streamClient } from "../lib/stream.js";
import SessionModel from "../models/session.model.js";

export const getStreamToken =  (req, res) => {
  const user = req.user;
  const token = streamClient.generateUserToken({ user_id: user._id.toString() });
  return res.status(201).json({message : "Stream Token Generated",token});
};

export const createSession = async (req, res) => {
  try {
    const id = req.user._id;
    const callId = `session_${crypto.randomUUID()}`;
    const call = streamClient.video.call("default", callId);
    await call.getOrCreate({
      data: {
        members: [{user_id : id.toString()}],
        custom: {
          color: blue,
        },
      },
      notify: true,
      ring: true,
    });
    const session = await SessionModel.create({
      host: id,
      status: "active",
      callId,
    });
    return res
      .status(201)
      .json({ message: "Session Created Successfully", session });
  } catch (error) {
    console.log("create session controller error: ", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getActiveSession = async (req, res) => {
  try {
    const userId = req.user._id;
    const sessions = await SessionModel.find({
      status: "active",
      $or: [{ host: userId }, { participants: userId }],
    })
      .populate("host", "name profilePic")
      .populate("participant", "name profilePic")
      .sort({ createdAt: -1 })
      .limit(20);

    return res
      .status(200)
      .json({ message: "Active Session Fetched...", sessions });
  } catch (error) {
    console.log("get active sessions controller error: ", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getPastSession = async (req, res) => {
  try {
    const userId = req.user._id;
    const sessions = await SessionModel.find({
      status: "completed",
      $or: [{ host: userId }, { participants: userId }],
    })
      .populate("host", "name profilePic")
      .populate("participant", "name profilePic")
      .sort({ createdAt: -1 })
      .limit(20);

    return res
      .status(200)
      .json({ message: "Past Session Fetched...", sessions });
  } catch (error) {
    console.log("get past sessions controller error: ", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getSessionById = async (req, res) => {
  try {
    const { id } = req.params;
    const session = await SessionModel.findById(id);
    if (!session)
      return res.status(404).json({ message: "No Such Session Exists" });
    return res.status(200).json({ message: "Session Found", session });
  } catch (error) {
    console.log("get session by id controller error: ", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const joinSession = async (req, res) => {
  try {
    const { id } = req.params;
    const session = await SessionModel.findById(id);

    //if session not found
    if (!session)
      return res.status(404).json({ message: "No Such Session Exists" });

    //if session already completed
    //TODO: implement restart call feature
    if (session.status === "completed")
      return res.status(404).json({ message: "Session Already Completed" });

    //check wheather host is trying to rejoin or not
    if (session.host.toString() === req.user._id.toString()) {
      return res
        .status(409)
        .json({ message: "Host Cannot join as participant" });
    }

    //if the person is not host, and already a participant
    const alreadyJoined = session.participants.some(
      (p) => p.toString() === req.user._id.toString(),
    );
    if (alreadyJoined)
      return res.status(409).json({ message: "User Already Joined " });

    session.participants.push(req.user._id);
    await session.save();
    return res
      .status(200)
      .json({ message: `${req.user.name} Joined To Session` });
  } catch (error) {
    console.log("join session controller error: ", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const endSession = async (req, res) => {
  try {
    const { id } = req.params;
    const session = await SessionModel.findById(id);

    //if session not found
    if (!session)
      return res.status(404).json({ message: "No Such Session Exists" });

    //if session already end
    //TODO: implement restart call feature
    if (session.status === "completed")
      return res.status(404).json({ message: "Session Already Completed" });

    const call = streamClient.video.call("default", session.callId);

    //if host is ending session: delete whole session
    if (session.host.toString() === req.user._id.toString()) {
      await call.end();
      session.status = "completed";
      await SessionModel.save();
      return res.status(200).json({ message: "Call Ended Successfully" });
    }

    const isParticipant = session.participants.find(
      (p) => p.toString() === req.user._id.toString(),
    );
    if (!isParticipant)
      return res
        .status(409)
        .json({ message: "You have already left this session" });

    //if participant is ending session: remove only that participant i.e. update
    await call.kickUser({ user_id: req.user._id });

    session.participants = session.participants.filter(
      (p) => p.toString() !== req.user._id,
    );

    await session.save();

    return res
      .status(200)
      .json({ message: `${req.user.name} removed successfully` });
  } catch (error) {
    console.log("end session controller error: ", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
