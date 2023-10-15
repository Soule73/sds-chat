import mongoose, { Schema, model } from "mongoose";

const UserGroupSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    require: true,
  },
  groupId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Group",
    require: true,
  },
});

const UserGroup = model("UserGroup", UserGroupSchema);

export default UserGroup;
