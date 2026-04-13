import mongoose from "mongoose";

const SessionSchema = mongoose.Schema({
  host: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "usertbl",
  },
  participants: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "usertbl",
    },
  ],
  status: {
    type: String,
    enum: ["active", "completed"],
  },
  callId: {
    type: String,
    default: "",
  },
});

const SessionModel =
  mongoose.models.sessiontbl || mongoose.model("sessiontbl", SessionSchema);

export default SessionModel;
