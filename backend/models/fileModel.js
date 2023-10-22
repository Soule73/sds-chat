import { Schema, model } from "mongoose";

// Créer un modèle mongoose pour stocker les fichiers base64
const FileSchema = new Schema({
  buffer: Buffer, // Le type de schéma pour le tampon binaire
});
const FileModel = model("File", FileSchema);

export default FileModel;
