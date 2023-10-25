import { PhoneIcon, UserPlusIcon, VideoCameraIcon } from "@heroicons/react/24/outline";
import { Avatar, IconButton } from "@material-tailwind/react";
import { createElement, useState } from "react";
import PropTypes from "prop-types";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";

import avatar from "../../../img/avatar/avatar.png";
import CurrentChatInfo from "./profile/CurrentChatInfo";

export default function NavBar({ chatUser, handleOpenChat, openChat }) {


    const { userId } = chatUser;
    // console.log(userId)

    const ICONS = [
        { icon: VideoCameraIcon, title: "Appel videos" },
        { icon: PhoneIcon, title: "Appel" },
        { icon: UserPlusIcon, title: "Ajouter un utilisateur" },
    ]

    const [currentChatInfo, setCurrentChatInfo] = useState(false);

    const handlecurrentChatInfo = () => setCurrentChatInfo(!currentChatInfo);

    return <>
        <CurrentChatInfo handleOpen={handlecurrentChatInfo} open={currentChatInfo} currentChat={userId} />
        <div className={` overflow-x-hidden py-1 dark:bg-slate-900 px-3 bg-white z-20 lg:pl-5 ${openChat ? "flex" : "hidden lg:flex"} lg:shadow lg:min-h-[3.5rem] justify-between w-full top-0 `}>

            <div className="flex text-ellipsis justify-start items-center gap-2 ">
                <ArrowLeftIcon
                    onClick={handleOpenChat}
                    className=" lg:hidden cursor-pointe dark:fill-slate-100 w-6 h-6  " />
                {chatUser?.userId &&
                    <div onClick={handlecurrentChatInfo} className=" cursor-pointer text-black flex gap-x-2  items-center  text-sm md:text-lg ">
                        <Avatar
                            className=" bg-white p-[2px] !w-9 !h-9 "
                            src={chatUser?.userId?.pic ? chatUser?.userId?.pic : avatar}
                            alt="profile picture"
                        />
                        <span className=" dark:text-slate-100">{chatUser?.userId?.name}</span>
                    </div>}
            </div>
            <div className=" w-max flex items-center gap-x-2 ">
                {
                    chatUser?.userId &&
                    ICONS.map(({ icon, title }, i) => {
                        return (
                            <IconButton
                                title={title}
                                key={`icon_top_${i}`}
                                variant="text"
                                className="w-10 p-2 h-10 cursor-pointer dark:hover:bg-gray-900 rounded-full">
                                {createElement(icon, {
                                    className: ` dark:stroke-slate-300  w-6 h-6  `,
                                })}
                            </IconButton>
                        );
                    })
                }
            </div>

        </div>
    </>

}


NavBar.propTypes = {
    chatUser: PropTypes.object.isRequired,
    handleOpenChat: PropTypes.func.isRequired,
    openChat: PropTypes.bool.isRequired
}