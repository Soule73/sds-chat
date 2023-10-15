import { PhoneIcon, UserPlusIcon, VideoCameraIcon } from "@heroicons/react/24/outline";
import { Avatar, IconButton } from "@material-tailwind/react";
import { createElement } from "react";
import PropTypes from "prop-types";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";

import avatar from "../../../img/avatar/avatar.png";

export default function NavBar({ chatUser, handleOpenChat, openChat }) {

    const ICONS = [
        { icon: VideoCameraIcon, title: "Appel videos" },
        { icon: PhoneIcon, title: "Appel" },
        { icon: UserPlusIcon, title: "Ajouter un utilisateur" },
    ]

    return <div className={` overflow-x-hidden py-1 dark:bg-slate-900 px-3 bg-white z-20 lg:pl-5 ${openChat ? "flex" : "hidden lg:flex"} justify-between w-full top-0 `}>
        <div className="flex text-ellipsis justify-start items-center gap-2 ">
            <ArrowLeftIcon
                onClick={handleOpenChat}
                className=" lg:hidden dark:stroke-white w-6 h-6  " />
            {chatUser?.userId &&
                <div className=" text-black flex gap-x-2  items-center dark:text-slate-100 text-sm md:text-lg ">
                    <Avatar
                        className=" bg-white p-[2px] !w-9 !h-9 "
                        src={chatUser?.userId?.pic ? chatUser?.userId?.pic : avatar}
                        alt="profile picture"
                    />
                    <span>{chatUser?.userId?.name}</span>
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
}


NavBar.propTypes = {
    chatUser: PropTypes.object.isRequired,
    handleOpenChat: PropTypes.func.isRequired,
}