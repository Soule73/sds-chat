import PropTypes from "prop-types";
import { Avatar, Typography } from "@material-tailwind/react";
import avatar from "../../../img/avatar/avatar.png";

function ContactChat({ user, setChatId, handleOpenChat }) {
    const getCurrentChatId = localStorage.currentChatId && JSON.parse(localStorage.currentChatId)?.chatId;

    const saveCurrentChat = () => {
        setChatId(user);
        handleOpenChat()
        localStorage.setItem('currentChatId', JSON.stringify(user));
    }

    return (
        <div onClick={saveCurrentChat} className={`${getCurrentChatId === user.chatId ? "lg:bg-orange-600 lg:font-medium hover:text-black lg:text-white " : ""} dark:hover:bg-slate-800  hover:bg-blue-gray-50/80 cursor-pointer p-2 flex gap-x-2 justify-start items-center `}>
            <Avatar
                size="sm"
                className=" bg-white p-[2px] "
                src={user.userId.pic ? user.userId.pic : avatar}
                alt="profile picture"
            />
            <Typography
                variant="small"
                className=" dark:text-slate-100"
            >
                {user.userId.name}({user.userId.email})
            </Typography>
        </div>);
}
export default function ListUserChat({ userChats, setChatId, handleOpenChat }) {

    return <div>
        {userChats && userChats.map(
            (user, id) => (
                <ContactChat
                    handleOpenChat={handleOpenChat}
                    user={user}
                    setChatId={setChatId}
                    key={id} />
            ))}
    </div>
}

ContactChat.propTypes = {
    user: PropTypes.object,
    setChatId: PropTypes.func,
    handleOpenChat: PropTypes.func.isRequired,
}

ListUserChat.propTypes = {
    userChats: PropTypes.array,
    setChatId: PropTypes.func,
    handleOpenChat: PropTypes.func.isRequired,

}