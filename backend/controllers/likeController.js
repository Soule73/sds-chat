import Like from "../models/likeModel.js";
import LikeType from "../models/likeTypeModel.js";

// Fonction récursive pour récupérer les commentaires et leurs sous-commentaires

const getAllLikeType = async (req, res) => {
  try {
    const liekType = await LikeType.find({});
    return res.status(200).json(liekType);
  } catch (error) {
    console.error("Erreur lors de la récupération des like :", error);
    return res
      .status(200)
      .json({ message: "Erreur lors de la récupération des like" });
  }
};

const createLikeSocket = async (messageId, likeTypeId, userId) => {
  const like = await Like.findOne({ messageId: messageId, userId: userId });
  if (like) {
    if (like.likeTypeId.toString() === likeTypeId) {
      await Like.findByIdAndRemove(like._id);
    } else {
      await Like.findByIdAndUpdate(like._id, { likeTypeId: likeTypeId });
    }
    return;
  } else {
    try {
      const newMessageLike = new Like({
        userId,
        likeTypeId,
        messageId,
      });

      await newMessageLike.save();
      return newMessageLike;
    } catch (error) {
      console.error("Erreur lors de l'ajout du like :", error);
      return { message: "Erreur lors de l'ajout du like" };
    }
  }
};
// const createLikeType = async (req, res) => {
//   try {
//     await LikeType.insertMany([
//       {
//         type: "like",
//       },
//       {
//         type: "adore",
//       },
//       {
//         type: "united",
//       },
//       {
//         type: "haha",
//       },
//       {
//         type: "wow",
//       },
//       {
//         type: "sad",
//       },
//       {
//         type: "angry",
//       },
//     ]);

//     res.json("create all type emoji");
//   } catch (error) {
//     console.error("Erreur lors de l'ajout du like :", error);
//     res.status(500).json({ message: "Erreur lors de l'ajout du like" });
//   }
// };

export { getAllLikeType, createLikeSocket };
