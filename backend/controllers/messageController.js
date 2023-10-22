import Message from "../models/messageModel.js";
import UserChat from "../models/userChatModel.js";
import allMsgForUser from "./allMsgController.js";

const createMessageSocket = async (
  parentId,
  userId,
  chatId,
  content,
  type = "text"
) => {
  try {
    const nouveauMessge = new Message({
      userId: userId,
      chatId: chatId,
      content: content,
      parentId: parentId,
      typeContent: type,
    });
    await nouveauMessge.save();
    return nouveauMessge;
  } catch (error) {
    console.error("Erreur lors de l'ajout du Messge :", error);
    return { message: "Erreur lors de l'ajout du Messge" };
  }
};
const createMessageFileSocket = async (files) => {
  try {
    await Message.insertMany(files);
    return;
  } catch (error) {
    console.error("Erreur lors de l'ajout du Messge :", error);
    return { message: "Erreur lors de l'ajout du Messge" };
  }
};

const getAllMessageSocket = async (userId) => {
  // await Message.updateMany(
  //   {},
  //   { $set: { meta: null } },
  //   { multi: true }
  // ).exec();

  const userChats = await UserChat.find({ userId });
  const chatIds = userChats.map((userChat) => userChat.chatId);
  try {
    const messages = await allMsgForUser(chatIds);
    return messages;
  } catch (e) {
    console.log(e);
  }
};

export { createMessageSocket, createMessageFileSocket, getAllMessageSocket };
