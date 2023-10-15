import mongoose, { Schema, model } from "mongoose";

const GroupSchema = new Schema({
  messageId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Message",
    require: true,
  },
  groupAdmin: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const Group = model("Group", GroupSchema);

export default Group;
