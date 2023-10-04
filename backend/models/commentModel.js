import mongoose, { Schema, model } from "mongoose";

const CommentaireSchema = new Schema({
  content: String,
  parent_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Commentaire",
    default: null,
  },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

const Commentaire = model("Commentaire", CommentaireSchema);

export default Commentaire;
