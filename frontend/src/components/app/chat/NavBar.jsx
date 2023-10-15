import { PhoneIcon, UserPlusIcon, VideoCameraIcon } from "@heroicons/react/24/outline";
import { Avatar, IconButton } from "@material-tailwind/react";
import { createElement } from "react";
import PropTypes from "prop-types";


import avatar from "../../../img/avatar/avatar.png";
import { ArrowLongLeftIcon } from "@heroicons/react/24/solid";
export default function NavBar({ chatUser, handleOpenChat, openChat
}) {
    const ICONS = [
        { icon: VideoCameraIcon, title: "Appel videos" },
        { icon: PhoneIcon, title: "Appel" },
        { icon: UserPlusIcon, title: "Ajouter un utilisateur" },
    ]

    return <div className={` min-h-[3.5rem] dark:border-gray-600/30 dark:bg-slate-900 bg-white z-20 gap-y-2 lg:pl-5 ${openChat ? "flex" : "hidden lg:flex"} md:flex-row justify-between w-full h-max border-b border-blue-gray-100 pt-1 top-0 `}>
        <div className=" items-center w-full md:w-auto h-full justify-start flex gap-2 ">
            <ArrowLongLeftIcon
                onClick={handleOpenChat}
                className=" lg:hidden w-8 h-8 p-1  " />
            {chatUser?.userId && <div className=" text-black flex gap-x-2 text-ellipsis items-center dark:text-slate-100 text-sm md:text-lg ">
                <Avatar
                    className=" bg-white p-[2px] !w-9 !h-9 "
                    src={chatUser?.userId?.pic ? chatUser?.userId?.pic : avatar}
                    alt="profile picture"
                />
                <span>{chatUser?.userId?.name}</span>
            </div>}
        </div>
        <div className=" w-max flex justify-center md:justify-end items-center gap-x-4 ">
            {
                chatUser?.userId &&
                ICONS.map(({ icon, title }, i) => {
                    return (
                        <IconButton
                            title={title}
                            key={`icon_top_${i}`}
                            variant="text"
                            className="w-10 p-2 h-10 flex justify-center items-center cursor-pointer dark:hover:bg-gray-900 hover:bg-blue-gray-100/20 rounded-full"
                        >
                            {createElement(icon, {
                                className: ` stroke-slate-900 dark:stroke-slate-300  w-6 h-6  `,
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