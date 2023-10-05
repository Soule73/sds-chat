import { Schema, model } from "mongoose";

const likeTypeSchema = new Schema({
  type: {
    type: String,
    required: true,
  },
});

const LikeType = model("LikeType", likeTypeSchema);

export default LikeType;
