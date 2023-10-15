import mongoose, { Schema, model } from "mongoose";

const ChatSchema = new Schema({
  messageId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Message",
    default: null,
  },
});

const Chat = model("Chat", ChatSchema);

export default Chat;
