import Message from "../models/messageModel.js";

const allMsgForUser = async (chatIds) => {
  const messages = await Message.aggregate([
    { $match: { chatId: { $in: chatIds } } },
    {
      $lookup: {
        from: "users",
        localField: "userId",
        foreignField: "_id",
        as: "user",
      },
    },
    { $unwind: "$user" },
    {
      $lookup: {
        from: "likes",
        localField: "_id",
        foreignField: "messageId",
        as: "likes",
      },
    },
    {
      $unwind: {
        path: "$likes",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $lookup: {
        from: "liketypes",
        localField: "likes.likeTypeId",
        foreignField: "_id",
        as: "likeType",
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "likes.userId",
        foreignField: "_id",
        as: "likeUser",
      },
    },

    // Group by message and add likes to an array
    {
      $group: {
        _id: { messageId: "$_id", likeType: "$likeType.type" }, // Group by message id and like type
        chatId: { $first: "$chatId" },
        content: { $first: "$content" },
        typeContent: { $first: "$typeContent" },
        parentId: { $first: "$parentId" },
        deliveredAt: { $first: "$deliveredAt" },
        seenAt: { $first: "$seenAt" },
        sentAt: { $first: "$sentAt" },
        meta: { $first: "$meta" },
        user: { $first: "$user" },

        // Add users to an array for each like type
        usersWhoLiked: {
          $push: {
            _id: { $arrayElemAt: ["$likeUser._id", 0] },
            name: { $arrayElemAt: ["$likeUser.name", 0] },
            email: { $arrayElemAt: ["$likeUser.email", 0] },
            pic: { $arrayElemAt: ["$likeUser.pic", 0] },
          },
        },
      },
    },

    {
      $group: {
        _id: "$_id.messageId", // Group again by message id
        chatId: { $first: "$chatId" },
        content: { $first: "$content" },
        typeContent: { $first: "$typeContent" },
        parentId: { $first: "$parentId" },
        deliveredAt: { $first: "$deliveredAt" },
        seenAt: { $first: "$seenAt" },
        sentAt: { $first: "$sentAt" },
        meta: { $first: "$meta" },
        user: { $first: "$user" },

        // Add likes to an array
        likes: {
          $push: {
            likeType: { $arrayElemAt: ["$_id.likeType", 0] },
            usersWhoLiked: "$usersWhoLiked",
          },
        },
      },
    },
    {
      $addFields: {
        likes: {
          $map: {
            input: "$likes",
            as: "like",
            in: {
              likeType: "$$like.likeType",
              usersWhoLiked: "$$like.usersWhoLiked",
              count: { $size: "$$like.usersWhoLiked" },
            },
          },
        },
      },
    },

    {
      $unwind: "$likes",
    },
    {
      $group: {
        _id: "$_id",
        chatId: { $first: "$chatId" },
        content: { $first: "$content" },
        typeContent: { $first: "$typeContent" },
        parentId: { $first: "$parentId" },
        deliveredAt: { $first: "$deliveredAt" },
        seenAt: { $first: "$seenAt" },
        sentAt: { $first: "$sentAt" },
        meta: { $first: "$meta" },
        user: { $first: "$user" },
        likes: { $push: "$likes" }, // Regroupez à nouveau les likes dans un tableau
      },
    },
    {
      $addFields: {
        totalLikes: { $sum: "$likes.count" }, // Ajoutez le total des likes ici
      },
    },
    {
      $project: {
        _id: 1,
        chatId: 1,
        content: 1,
        typeContent: 1,
        parentId: 1,
        deliveredAt: 1,
        seenAt: 1,
        sentAt: 1,
        meta: 1,
        user: { _id: 1, name: 1, email: 1, pic: 1 },

        // Replace empty likes array with null
        likes: {
          $cond: {
            if: {
              $eq: [
                "$likes",
                [
                  {
                    usersWhoLiked: [{}],
                    count: 1,
                  },
                ],
              ],
            },
            then: [],
            else: "$likes",
          },
        },
        totalLikes: {
          $cond: {
            if: {
              $eq: [
                "$likes",
                [
                  {
                    usersWhoLiked: [{}],
                    count: 1,
                  },
                ],
              ],
            },
            then: 0,
            else: "$totalLikes",
          },
        },
      },
    },
    { $sort: { sentAt: 1 } }, // Tri par ordre décroissant. Utilisez 1 pour un ordre croissant.

    {
      $group: {
        _id: {
          chatId: "$chatId",
          date: {
            $dateToString: { format: "%Y-%m-%d", date: "$sentAt" },
          },
        },
        messages: { $push: "$$ROOT" },
      },
    },

    { $sort: { "_id.date": 1 } },

    // Group by chat and add dates to an array
    {
      $group: {
        _id: "$_id.chatId",
        dates: { $push: { date: "$_id.date", messages: "$messages" } },
      },
    },
  ]);

  return messages;
};

export default allMsgForUser;
