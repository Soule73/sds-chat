import Like from "../models/likeModel.js";
import LikeType from "../models/likeTypeModel.js";

// Fonction récursive pour récupérer les commentaires et leurs sous-commentaires

const getAllLikeTypeSocket = async () => {
  try {
    const liekType = await LikeType.find({});
    return liekType;
  } catch (error) {
    console.error("Erreur lors de la récupération des like :", error);
    return { message: "Erreur lors de la récupération des like" };
  }
};

const createLikeSocket = async (ref_id, like_id, user_id) => {
  const like = await Like.findOne({ ref_id: ref_id, user_id: user_id });
  if (like) {
    if (like.like_id.toString() === like_id) {
      await Like.findByIdAndRemove(like._id);
    } else {
      await Like.findByIdAndUpdate(like._id, { like_id: like_id });
    }
    return;
  } else {
    try {
      const nouveauCommentaire = new Like({
        user_id,
        like_id,
        ref_id,
      });

      await nouveauCommentaire.save();
      return nouveauCommentaire;
    } catch (error) {
      console.error("Erreur lors de l'ajout du like :", error);
      return { message: "Erreur lors de l'ajout du like" };
    }
  }
};
const createLikeType = async (req, res) => {
  try {
    await LikeType.insertMany([
      {
        type: "like",
      },
      {
        type: "adore",
      },
      {
        type: "united",
      },
      {
        type: "haha",
      },
      {
        type: "wow",
      },
      {
        type: "sad",
      },
      {
        type: "angry",
      },
    ]);

    res.json("create all type emoji");
  } catch (error) {
    console.error("Erreur lors de l'ajout du like :", error);
    res.status(500).json({ message: "Erreur lors de l'ajout du like" });
  }
};

export { getAllLikeTypeSocket, createLikeSocket, createLikeType };
