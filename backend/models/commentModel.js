import mongoose, { Schema, model } from "mongoose";

const CommentaireSchema = new Schema(
  {
    content: String,
    parent_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Commentaire",
      default: null,
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const Commentaire = model("Commentaire", CommentaireSchema);

export default Commentaire;
