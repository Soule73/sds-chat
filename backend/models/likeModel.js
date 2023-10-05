import { Schema, model } from "mongoose";

const likeSchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  like_id: {
    type: Schema.Types.ObjectId,
    ref: "LikeType",
  },
  ref_id: {
    type: Schema.Types.ObjectId,
    required: true,
  },
});

const Like = model("Like", likeSchema);

export default Like;
