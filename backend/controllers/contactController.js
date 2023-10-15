import Chat from "../models/chatModel.js";
import Message from "../models/messageModel.js";
import UserChat from "../models/userChatModel.js";
import allMsgForUser from "./allMsgController.js";

const getAllUserChats = async (req, res) => {
  const userId = req.body.userId;
  if (!userId) {
    return res.status(400).send({ message: "Please Fill all the feilds" });
  }

  UserChat.find({ userId }).then((userChats) => {
    const chatIds = userChats.map((userChat) => userChat.chatId);
    UserChat.find({ chatId: { $in: chatIds }, userId: { $ne: userId } })
      .populate("userId", "-password -__v")
      .then((chats) => {
        res.status(200).json(chats);
      });
  });
};

// const getAllMessage = async (req, res) => {
//   const userId = req.body.userId;

//   if (!userId) {
//     return res.status(400).send({ message: "Please Fill all the feilds" });
//   }

//   const userChats = await UserChat.find({ userId });
//   const chatIds = userChats.map((userChat) => userChat.chatId);

//   try {
//     const messages = await Message.aggregate([
//       { $match: { chatId: { $in: chatIds } } },
//       {
//         $lookup: {
//           from: "users",
//           localField: "userId",
//           foreignField: "_id",
//           as: "user",
//         },
//       },
//       { $unwind: "$user" },
//       {
//         $project: {
//           _id: 1,
//           chatId: 1,
//           content: 1,
//           typeContent: 1,
//           parentId: 1,
//           deliveredAt: 1,
//           seenAt: 1,
//           sentAt: 1,
//           user: { _id: 1, name: 1, email: 1, pic: 1 },
//         },
//       },
//       {
//         $lookup: {
//           from: "likes",
//           localField: "_id",
//           foreignField: "messageId",
//           as: "likes",
//         },
//       },
//       {
//         $unwind: {
//           path: "$likes",
//           preserveNullAndEmptyArrays: true,
//         },
//       },
//       {
//         $lookup: {
//           from: "liketypes",
//           localField: "likes.likeTypeId",
//           foreignField: "_id",
//           as: "likeType",
//         },
//       },
//       {
//         $lookup: {
//           from: "users",
//           localField: "likes.userId",
//           foreignField: "_id",
//           as: "likeUser",
//         },
//       },

//       {
//         $group: {
//           _id: {
//             chatId: "$chatId",
//             date: {
//               $dateToString: {
//                 format: "%Y-%m-%d",
//                 date: "$sentAt",
//               },
//             },
//           },
//           messages: {
//             $push: {
//               _id: "$_id",
//               chatId: "$chatId",
//               content: "$content",
//               typeContent: "$typeContent",
//               parentId: "$parentId",
//               deliveredAt: "$deliveredAt",
//               seenAt: "$seenAt",
//               sentAt: "$sentAt",
//               user: "$user",
//               likes: {
//                 _id: "$likes._id",
//                 messageId: "$likes.messageId",
//                 likeType: { $arrayElemAt: ["$likeType", 0] },
//                 likeUser: {
//                   _id: { $arrayElemAt: ["$likeUser._id", 0] },
//                   name: { $arrayElemAt: ["$likeUser.name", 0] },
//                   email: { $arrayElemAt: ["$likeUser.email", 0] },
//                   pic: { $arrayElemAt: ["$likeUser.pic", 0] },
//                 },
//               },
//             },
//           },
//         },
//       },
//       { $sort: { "_id.date": -1, "_id.messages.sentAt": -1 } },

//       {
//         $group: {
//           _id: "$_id.chatId",
//           dates: { $push: { date: "$_id.date", messages: "$messages" } },
//         },
//       },
//     ]);

//     res.status(200).json(messages);
//   } catch (e) {
//     console.log(e);
//   }
// };
const getAllMessage = async (req, res) => {
  const userId = req.body.userId;

  if (!userId) {
    return res.status(400).send({ message: "Please Fill all the feilds" });
  }

  const userChats = await UserChat.find({ userId });
  const chatIds = userChats.map((userChat) => userChat.chatId);

  try {
    const messages = await allMsgForUser(chatIds);

    res.status(200).json(messages);
  } catch (e) {
    console.log(e);
  }
};
const createNewChat = async (req, res) => {
  const userId = req.body.userId;
  const fromUserId = req.body.fromUserId;

  if (!(userId && fromUserId)) {
    return res
      .status(400)
      .send({ message: "Erreur se produit veullez ressayer" });
  }

  const newChat = new Chat();
  await newChat.save();

  await UserChat.insertMany([
    {
      userId: userId,
      chatId: newChat._id,
    },
    {
      userId: fromUserId,
      chatId: newChat._id,
    },
  ])
    .then(async () => {
      const userChats = await UserChat.find({ userId: userId }).populate(
        "chatId"
      );

      res.status(200).json(userChats);
    })
    .catch((error) => {
      console.error("Erreur se produit veullez ressayer :", error);
      return {
        message: "Erreur se produit veullez ressayer",
      };
    });
};

export { getAllUserChats, createNewChat, getAllMessage };
