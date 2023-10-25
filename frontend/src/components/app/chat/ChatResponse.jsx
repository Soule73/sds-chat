import { Avatar } from "@material-tailwind/react";
import PropTypes from "prop-types";

import avatar from "../../../img/avatar/avatar.png";
import dateFormateHour from "../../../utils/chatLogique";
import { useState } from "react";
import LikeList from "./LikeList";
import LikeType from "./LikeType";
import ChatImage from "./ChatImage";
import ChatDocument from "./ChatDocument";

export default function ChatResponse({ msg }) {

    const [showEmoji, setShowEmoji] = useState(false);


    return (
        <div className=" w-full gap-x-2 h-auto py-2 flex">
            <Avatar withBorder={false} className=" -top-1 bg-white p-[2px]" src={msg.photo || avatar} alt="avatar" size="sm" />
            <div onMouseLeave={() => setShowEmoji(false)} onMouseEnter={() => setShowEmoji(true)} className=" w-[90%] flex gap-2 items-center ">
                <div className=" flex flex-col gap-y-1">
                    <div
                        className="dark:text-slate-100 before:shadow-[0_-15px_0_0] before:shadow-white dark:before:shadow-slate-900 before:content-[''] before:-left-2  before:absolute before:top-[15px] before:h-[10px] before:w-[50px] before:bg-transparent before:rounded-bl-[25px] relative w-auto max-w-max dark:bg-slate-900 00 bg-white shadow flex flex-col text-start justify-start items-start px-2 py-3 md:px-2 rounded-lg ">
                        {msg.typeContent === "text" ? <p>{msg.content}</p>
                            :
                            msg.meta[0]?.type?.startsWith("image/") ?
                                <ChatImage caption={msg.meta[0]?.caption} content={msg.content} name={msg.meta[0]?.name} /> :
                                msg.meta[0]?.type?.startsWith("application/") ?
                                    <ChatDocument caption={msg.meta[0]?.caption} content={msg.content} name={msg.meta[0]?.name} />
                                    : console.log(msg)
                        }
                        <p className=" w-full  text-xs flex justify-end items-end ">
                            <span>{dateFormateHour(msg.sentAt)}</span>
                        </p>
                    </div>
                    <LikeList msg={msg} right />
                </div>

                <LikeType showEmoji={showEmoji} msgId={msg._id} />
            </div>
        </div>
    );
}

ChatResponse.propTypes = {
    msg: PropTypes.object.isRequired,
}