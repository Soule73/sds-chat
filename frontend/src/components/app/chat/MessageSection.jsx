
import ChatYou from "./ChatYou";
import ChatResponsee from "./ChatResponse"
import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import socket from "../../../socket";
import { useSelector } from "react-redux";
import { dateFormateDay } from "../../../utils/chatLogique";

const ShowMsg = ({ message, currentUserId }) => (

    message.map((msg) => (
        (msg.user._id === currentUserId) ?
            <ChatYou key={msg._id} msg={msg} /> :
            <ChatResponsee key={msg._id} msg={msg} />
    ))
)

const SendAndReceivedMsg = ({ dates, currentUserId }) => (
    dates.map(({ date, messages }) => (
        <div key={date}>
            <div className=" my-3 sticky top-2 z-10 flex w-full h-auto justify-center items-center">
                <span className=" bg-gray-600/30 px-2 py-1 text-xs font-medium rounded-md dark:text-white">{dateFormateDay(date)} </span>
            </div>
            <ShowMsg message={messages} currentUserId={currentUserId} />
        </div>
    ))
)
export default function MessageSection({ currentChatId, openChat }) {
    const { userInfo } = useSelector((state) => state.auth);
    const currentUserId = userInfo._id;
    const messagesColumnRef = useRef(null);
    const [allMessge, setAllMessge] = useState(localStorage.allMessge ? JSON.parse(localStorage.allMessge) : []);

    const handleMessage = (msg) => {
        setAllMessge(msg)
        localStorage.setItem("allMessge", JSON.stringify(msg))
    };


    useEffect(() => {
        const allMsg = async () => {
            socket.emit('getUserAllMessage', { userId: currentUserId });
        }
        allMsg()
    }, [currentUserId]);

    useEffect(() => {
        const receivedMsg = async () => socket.on('userAllMessage', handleMessage);
        receivedMsg()
    }, []);

    return <div ref={messagesColumnRef} className={`${openChat ? "block" : "hidden lg:block"} chat-bg bg-gray-800/10 dark:bg-slate-800/60 md:px-5  custome-scroll-bar px-3 md:pt-2 pb-16 overflow-auto xl:overflow-hidden xl:hover:overflow-y-auto w-full h-full  `}>
        {currentChatId && allMessge.map(({ _id, dates }) => {
            return (currentChatId === _id) &&
                <SendAndReceivedMsg key={_id} currentUserId={currentUserId} dates={dates} />
        })}
    </div>
}

MessageSection.propTypes = {
    currentChatId: PropTypes.string,
    openChat: PropTypes.bool.isRequired


}