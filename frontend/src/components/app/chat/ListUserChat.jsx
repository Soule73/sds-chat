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
        <div onClick={saveCurrentChat} className={`${getCurrentChatId === user.chatId ? "lg:bg-orange-800 lg:font-medium hover:text-black lg:text-white " : ""} dark:hover:bg-slate-800  hover:bg-orange-gray-50/80 cursor-pointer   !rounded-none p-2 flex gap-x-2 justify-start items-center `}>
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
        </div>
    );
}
export default function ListUserChat({ activeSection, userChats, setChatId, handleOpenChat }) {

    return <div className={`${activeSection !== 3 && "hidden"} w-full h-[calc(100%-10rem)] custome-scroll-bar max-h-[calc(100%-10rem)] overflow-auto xl:overflow-hidden xl:hover:overflow-y-auto `}>

        {userChats && userChats.map(
            (user, id) => (
                <ContactChat
                    handleOpenChat={handleOpenChat}
                    user={user}
                    setChatId={setChatId}
                    key={id}
                />
            )
        )}
    </div>
}

ContactChat.propTypes = {
    user: PropTypes.object,
    setChatId: PropTypes.func,
    handleOpenChat: PropTypes.func.isRequired,


}
ListUserChat.propTypes = {
    activeSection: PropTypes.number,
    userChats: PropTypes.array,
    setChatId: PropTypes.func,
    handleOpenChat: PropTypes.func.isRequired,

}