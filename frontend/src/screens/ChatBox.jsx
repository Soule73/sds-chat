import {
  Card,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";

import SideBar from "../components/app/chat/SideBar";
import NavBar from "../components/app/chat/NavBar";
import PullToRefresh from 'react-simple-pull-to-refresh';

import SendMessage from "../components/app/forms/SendMessage";
import axios from "axios";
import { useSelector } from "react-redux";
import MessageSection from "../components/app/chat/MessageSection";
import Profile from "../components/app/chat/profile/Profile";


export default function ChatBox() {
  const [openProfileModal, setOpenProfileModal] = useState(false);

  const handleOpenProfileModal = () => setOpenProfileModal(!openProfileModal);

  const [openChat, setOpenChat] = useState(false);

  const { userInfo } = useSelector((state) => state.auth);
  const [userChats, setUserChats] = useState(localStorage.userChats ? JSON.parse(localStorage.userChats) : []);
  const currentId = userInfo._id;
  const { currentChatId } = localStorage
  const [chatId, setChatId] = useState(currentChatId ? JSON.parse(currentChatId) : []);

  useEffect(() => {
    axios.post('/api/chat/userChats', { userId: currentId })
      .then((e) => {
        setUserChats(e.data)
        localStorage.setItem('userChats', JSON.stringify(e.data))
      })
      .catch((e) => console.log(e))

  }, [currentId, setUserChats]);

  const handleOpenChat = () => setOpenChat(!openChat);

  return (
    <PullToRefresh pullingContent={<div className=" w-full text-center font-bold py-1 dark:text-orange-600">{"Tirer pour rafraîchir"}</div>} onRefresh={() => window.location.reload()} className=" min-h-screen max-h-screen">
      <Profile handleOpen={handleOpenProfileModal} open={openProfileModal} />
      <div className=" flex flex-col justify-between items-center lg:flex-row relative w-[99.9%] h-screen rounded shadow-lg shadow-indigo-500/5 ">

        <SideBar
          openChat={openChat}
          handleOpenChat={handleOpenChat}
          setChatId={setChatId}
          userChats={userChats}
          handleOpenProfileModal={handleOpenProfileModal}
        />

        <Card className={` bg-gray-300 bg-transparent !rounded-none relative !shadow-none lg:ml-[20rem] lg:w-[calc(100%-20rem)] w-full lg:absolute rounded-r rounded-l-none h-full top-0 overflow-auto`}>
          <NavBar openChat={openChat} handleOpenChat={handleOpenChat} chatUser={chatId} chatName={chatId?.userId?.name} />

          {chatId.length === 0 && <div className=" w-full h-full flex items-center justify-center">Selectionner une Discussion</div>}
          {chatId.length !== 0 && <MessageSection openChat={openChat} currentChatId={chatId.chatId} />}
          {chatId.length !== 0 && <SendMessage openChat={openChat} chatId={chatId.chatId} placeholder="Votre message" onSucces={() => { }} />}
        </Card>


      </div>

    </PullToRefresh>
  );
}
