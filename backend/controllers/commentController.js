import Commentaire from "../models/commentModel.js";

// Fonction récursive pour récupérer les commentaires et leurs sous-commentaires
async function getCommentairesRecursif(commentaireId) {
  const commentaire = await Commentaire.findById(commentaireId).populate(
    "parent_id"
  );
  if (!commentaire) {
    return null;
  }
  const subComments = await Commentaire.find({
    parent_id: commentaire._id,
  });
  const subCommentsRecursif = await Promise.all(
    subComments.map((sousCommentaire) =>
      getCommentairesRecursif(sousCommentaire._id)
    )
  );
  return {
    ...commentaire.toObject(),
    subComments: subCommentsRecursif,
  };
}

const getAllComment = async (req, res) => {
  try {
    const commentaires = await Commentaire.find({ parent_id: null });
    const commentairesRecursif = await Promise.all(
      commentaires.map((commentaire) =>
        getCommentairesRecursif(commentaire._id)
      )
    );
    res.json(commentairesRecursif);
  } catch (error) {
    console.error("Erreur lors de la récupération des commentaires :", error);
    res
      .status(500)
      .json({ message: "Erreur lors de la récupération des commentaires" });
  }
};

const findComment = async (req, res) => {
  try {
    const commentaires = await Commentaire.find({ _id: req.params.id });
    const commentairesRecursif = await Promise.all(
      commentaires.map((commentaire) =>
        getCommentairesRecursif(commentaire._id)
      )
    );
    res.json(commentairesRecursif);
  } catch (error) {
    console.error("Erreur lors de la récupération des commentaires :", error);
    res
      .status(500)
      .json({ message: "Erreur lors de la récupération des commentaires" });
  }
};

const createComment = async (req, res) => {
  const { content, parent_id } = req.body;

  try {
    const nouveauCommentaire = new Commentaire({
      content,
      parent_id,
    });
    await nouveauCommentaire.save();
    res.json(nouveauCommentaire);
  } catch (error) {
    console.error("Erreur lors de l'ajout du commentaire :", error);
    res.status(500).json({ message: "Erreur lors de l'ajout du commentaire" });
  }
};

export { getAllComment, findComment, createComment };
