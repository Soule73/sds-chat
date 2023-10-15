import { Schema, model } from "mongoose";

const likeSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  likeTypeId: {
    type: Schema.Types.ObjectId,
    ref: "LikeType",
  },
  messageId: {
    type: Schema.Types.ObjectId,
    ref: "Message",
    required: true,
  },
});

const Like = model("Like", likeSchema);

export default Like;
