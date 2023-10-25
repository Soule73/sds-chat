import PropTypes from "prop-types";
import { useState } from "react";

import dateFormateHour from "../../../utils/chatLogique";

import LikeList from "./LikeList";
import LikeType from "./LikeType";
import ChatImage from "./ChatImage";
import ChatDocument from "./ChatDocument";

export default function ChatYou({ msg }) {

    const [showEmoji, setShowEmoji] = useState(false);

    return (
        <div onMouseLeave={() => setShowEmoji(false)} onMouseEnter={() => setShowEmoji(true)} className=" items-center w-full h-auto gap-2 py-1 flex justify-end">

            <LikeType showEmoji={showEmoji} msgId={msg._id} />

            <div className=" flex flex-col gap-y-1">
                <div className="after:shadow-[0_-15px_0_0] after:shadow-orange-900 text-slate-900 after:content-[''] after:-right-2 after:absolute after:top-[15px] after:h-[10px] after:w-[50px]  after:bg-transparent after:rounded-br-[25px] relative bg-orange-900 w-auto max-w-max flex flex-col text-start justify-start items-start px-2 py-3 md:px-2 rounded-lg ">

                    {msg.typeContent === "text" ? <p>{msg.content}</p>
                        :
                        msg.meta[0]?.type?.startsWith("image/") ?
                            <ChatImage caption={msg.meta[0]?.caption} content={msg.content} name={msg.meta[0]?.name} />
                            :
                            msg.meta[0]?.type?.startsWith("application/") ?
                                <ChatDocument caption={msg.meta[0]?.caption} content={msg.content} name={msg.meta[0]?.name} />
                                : console.log(msg)
                    }
                    <div className="   text-xs flex justify-end items-end">
                        <span>{dateFormateHour(msg.sentAt)}</span>
                    </div>
                </div>
                <LikeList msg={msg} />
            </div>
        </div>
    );
}

ChatYou.propTypes = {
    msg: PropTypes.object.isRequired,
}