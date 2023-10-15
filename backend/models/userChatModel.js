import mongoose, { Schema, model } from "mongoose";

const UserChatSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    require: true,
  },
  chatId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Chat",
    require: true,
  },
});

const UserChat = model("UserChat", UserChatSchema);

export default UserChat;
