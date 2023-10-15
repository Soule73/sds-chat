import mongoose, { Schema, model } from "mongoose";

const MessageSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    require: true,
  },
  chatId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Chat",
    default: null,
  },
  groupId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Group",
    default: null,
  },
  content: { type: String, require: true },
  typeContent: { type: String, require: true, default: "text" },
  parentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Message",
    default: null,
  },
  sentAt: {
    type: mongoose.Schema.Types.Date,
    default: Date.now,
  },
  deliveredAt: {
    type: mongoose.Schema.Types.Date,
    default: null,
  },
  seenAt: {
    type: mongoose.Schema.Types.Date,
    default: null,
  },
});

const Message = model("Message", MessageSchema);

export default Message;
