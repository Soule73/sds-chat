
import ChatYou from "./ChatYou";
import ChatResponsee from "./ChatResponse"
import PropTypes from "prop-types";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { socket } from "../../../socket";
import { useSelector } from "react-redux";
import { dateFormateDay } from "../../../utils/chatLogique";

const ShowMsg = ({ message, currentUserId, likeType, setAllMessge }) => {

    return message.map(({ _id, user, content, sentAt, likes, totalLikes }) =>
    (
        (user._id === currentUserId) ?
            <ChatYou
                likeType={likeType}
                key={_id}
                hour={sentAt}
                msgId={_id}
                likes={likes}
                totalLikes={totalLikes}
                message={content}
                setAllMessge={setAllMessge}
            />
            :
            <ChatResponsee
                likes={likes}
                msgId={_id}
                likeType={likeType}
                key={_id}
                totalLikes={totalLikes}
                photo={user.photo}
                hour={sentAt}
                message={content}
                setAllMessge={setAllMessge}
            />
    ))

}

const SendAndReceivedMsg = ({ dates, currentUserId, likeType, setAllMessge }) => {
    return dates.map(({ date, messages }) => (

        <div key={date}>
            <div className=" my-3 sticky top-2 z-10 flex w-full h-auto justify-center items-center">
                <span className=" bg-gray-600/30 px-2 py-1 text-xs font-medium rounded-md dark:text-white">{dateFormateDay(date)} </span>
            </div>
            <ShowMsg setAllMessge={setAllMessge} likeType={likeType} message={messages} currentUserId={currentUserId} />
        </div>
    ))
}
export default function MessageSection({ currentChatId }) {
    const { userInfo } = useSelector((state) => state.auth);
    const currentUserId = userInfo._id;
    const messagesColumnRef = useRef(null); // Add this
    const [allMessge, setAllMessge] = useState([]);
    const [likeType, setLikeType] = useState([]);

    useEffect(() => {
        axios.post('/api/like/likeType').then((res) => setLikeType(res.data))
    }, [])

    useEffect(() => {
        const allMsg = async () => {
            socket.emit('getUserAllMessage', { userId: currentUserId });
            socket.on('userAllMessage', (msg) => setAllMessge(msg));
        }


        allMsg()

    }, [currentUserId]);

    useEffect(() => {
        socket.on('sendSucces', (msg) => setAllMessge(msg));
        messagesColumnRef.current.scrollTop =
            messagesColumnRef.current.scrollHeight;

    }, []);

    return <div ref={messagesColumnRef} className="chat-bg bg-gray-800/10 dark:bg-slate-800/60 md:px-5  custome-scroll-bar px-3 md:pt-2 pb-16 overflow-auto xl:overflow-hidden xl:hover:overflow-y-auto w-full h-full  ">
        {currentChatId && allMessge.map(({ _id, dates }) => {
            return (currentChatId === _id) &&
                <SendAndReceivedMsg setAllMessge={setAllMessge} likeType={likeType} key={_id} currentUserId={currentUserId} dates={dates} />
        })}
    </div>
}

MessageSection.propTypes = {
    currentChatId: PropTypes.string

}