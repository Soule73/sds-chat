import Commentaire from "../models/commentModel.js";
import Like from "../models/likeModel.js";

// Fonction récursive pour récupérer les commentaires et leurs sous-commentaires
async function getCommentairesRecursif(commentaireId) {
  const commentaire = await Commentaire.findById(commentaireId)
    .populate("parent_id")
    .populate("user_id", "name email");
  if (!commentaire) {
    return null;
  }
  const subComments = await Commentaire.find({
    parent_id: commentaire._id,
  });
  const likes = await Like.find({
    ref_id: commentaire._id,
  }).populate("like_id");
  const subCommentsRecursif = await Promise.all(
    subComments.map((sousCommentaire) =>
      getCommentairesRecursif(sousCommentaire._id)
    )
  );
  return {
    ...commentaire.toObject(),
    subComments: subCommentsRecursif,
    likes: likes,
    likesCount: likes.length,
  };
}

const getAllCommentSocket = async () => {
  try {
    const commentaires = await Commentaire.find({ parent_id: null }).populate(
      "user_id",
      "name email"
    );
    const commentairesRecursif = await Promise.all(
      commentaires.map((commentaire) =>
        getCommentairesRecursif(commentaire._id)
      )
    );
    return commentairesRecursif;
  } catch (error) {
    console.error("Erreur lors de la récupération des commentaires :", error);
    return {
      message: "Erreur lors de la récupération des commentaires",
    };
  }
};

const getFindCommentSocket = async (id) => {
  try {
    const commentaires = await Commentaire.find({
      _id: id,
    }).populate("user_id", "name email");
    const commentairesRecursif = await Promise.all(
      commentaires.map((commentaire) =>
        getCommentairesRecursif(commentaire._id)
      )
    );
    return commentairesRecursif;
  } catch (error) {
    console.error("Erreur lors de la récupération des commentaires :", error);
    return { message: "Erreur lors de la récupération des commentaires" };
  }
};

const createCommentSocket = async (parent_id, user_id, content) => {
  try {
    const nouveauCommentaire = new Commentaire({
      content,
      parent_id,
      user_id,
    });
    await nouveauCommentaire.save();
    return nouveauCommentaire;
  } catch (error) {
    console.error("Erreur lors de l'ajout du commentaire :", error);
    return { message: "Erreur lors de l'ajout du commentaire" };
  }
};

export { getAllCommentSocket, getFindCommentSocket, createCommentSocket };
