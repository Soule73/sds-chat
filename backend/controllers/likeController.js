import Commentaire from "../models/commentModel.js";
import Like from "../models/likeModel.js";
import LikeType from "../models/likeTypeModel.js";

// Fonction récursive pour récupérer les commentaires et leurs sous-commentaires

const getAllLikeType = async (req, res) => {
  try {
    const liekType = await LikeType.find({});
    res.json(liekType);
  } catch (error) {
    console.error("Erreur lors de la récupération des like :", error);
    res
      .status(500)
      .json({ message: "Erreur lors de la récupération des like" });
  }
};

const createLike = async (req, res) => {
  const { user_id, like_id, ref_id } = req.body;
  const like = await Like.findOne({ ref_id: ref_id, user_id: user_id });
  if (like) {
    if (like.like_id.toString() === like_id) {
      await Like.findByIdAndRemove(like._id);
    } else {
      await Like.findByIdAndUpdate(like._id, { like_id: like_id });
    }
    // console.log(user_id, like_id, ref_id);
    res.json("ok");
  } else {
    try {
      const nouveauCommentaire = new Like({
        user_id,
        like_id,
        ref_id,
      });

      await nouveauCommentaire.save();
      res.json(nouveauCommentaire);
    } catch (error) {
      console.error("Erreur lors de l'ajout du like :", error);
      res.status(500).json({ message: "Erreur lors de l'ajout du like" });
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

export { getAllLikeType, createLike, createLikeType };
