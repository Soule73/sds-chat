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
    if (process.env.NODE_ENV !== "production") console.log(e);
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
