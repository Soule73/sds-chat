import PropTypes from "prop-types";
import { useState } from "react";
import { Avatar, Menu, MenuHandler, MenuItem, MenuList } from "@material-tailwind/react";
import { FaceSmileIcon } from "@heroicons/react/24/solid";
import { useSelector } from "react-redux";

import { socket } from "../../../socket";
import dateFormateHour from "../../../utils/chatLogique";

import avatar from "../../../img/avatar/avatar.png";
import love from "../../../img/emoji/love.gif";
import like from "../../../img/emoji/like.gif";
import wow from "../../../img/emoji/wow.gif";
import sad from "../../../img/emoji/sad.gif";
import angry from "../../../img/emoji/angry.gif";
import haha from "../../../img/emoji/haha.gif";
import yay from "../../../img/emoji/yay.gif";

export default function ChatYou({ hour, message, msgId, likeType, likes, totalLikes, setAllMessge }) {
    const { userInfo } = useSelector((state) => state.auth);

    const likeTypeAll = {
        "like": { text: "J'aime", color: "text-blue-600", emoji: like },
        "love": { text: "J'adore", color: "text-red-400", emoji: love },
        "yay": { text: "Yay", color: "text-amber-600", emoji: yay },
        "haha": { text: "Haha", color: "text-blue-600", emoji: haha },
        "wow": { text: "Waouh", color: "text-blue-600", emoji: wow },
        "sad": { text: "Triste", color: "text-blue-600", emoji: sad },
        "angry": { text: "En colére", color: "text-red-800", emoji: angry },
    }

    const [showEmoji, setShowEmoji] = useState(false);
    const likeForm = async (likeId) => {
        socket.emit('createLikeComment', {
            messageId: msgId,
            likeTypeId: likeId,
            userId: userInfo._id
        });

        socket.on('likeComment', (e) => setAllMessge(e))
    }


    return (
        <div onMouseLeave={() => setShowEmoji(false)} onMouseEnter={() => setShowEmoji(true)} className=" items-center w-full h-auto gap-2 py-1 flex justify-end">
            <div>
                {(likeType.length > 0 && showEmoji) &&
                    <Menu>
                        <MenuHandler>
                            <FaceSmileIcon className=" cursor-pointer w-8 h-8" />

                        </MenuHandler>
                        <MenuList className=' dark:bg-slate-800 dark:border-none max-w-[20rem] flex justify-center p-2 flex-wrap gap-3'>
                            {likeType.map(({ type, _id }) =>
                                <MenuItem key={_id}
                                    onClick={() => likeForm(_id)}

                                    className={` flex flex-col justify-center dark:hover:bg-transparent dark:hover:text-slate-300 text-center items-center w-max h-max !p-1`}>

                                    <img className=" rounded-full p-1 dark:bg-slate-800 w-14" src={likeTypeAll[type].emoji} alt="emoji" />
                                    <span className=" text-xs">{likeTypeAll[type].text}</span>
                                </MenuItem>)
                            }

                        </MenuList>

                    </Menu>
                }
            </div>
            <div className=" flex flex-col gap-y-1">
                <div className="after:shadow-[0_-25px_0_0_rgb(21,101,192)]  after:content-[''] after:-right-2 after:absolute after:top-[25px] after:h-[15px] after:w-[50px]  after:bg-transparent after:rounded-br-[25px] relative bg-blue-800 text-slate-50 w-auto max-w-max flex flex-col text-start justify-start items-start px-2 pt-3 pb-1 md:px-2 rounded-lg ">
                    <div className=" ">{message}</div>
                    <div className="   text-xs flex justify-end items-end">
                        <span>{dateFormateHour(hour)}</span>
                    </div>
                </div>
                {likes.length > 0 && <div className="w-full flex items-center justify-start">
                    <Menu>
                        <MenuHandler>
                            <div className="p-1 rounded-lg flex items-center gap-1 w-max dark:bg-slate-900 dark:text-slate-300 bg-white cursor-pointer  justify-start">
                                <span className=" text-xs">{Number(totalLikes) > 0 && totalLikes} </span>
                                <div className=" flex">
                                    {likes.length > 0 && likes.map(({ likeType }, i) => (
                                        <img style={{ zIndex: 6 - i, marginLeft: i !== 0 && "-5px" }} key={i} className={` rounded-full p-[1px] bg-slate-100 w-5`} src={likeTypeAll[likeType].emoji} alt="emoji" />
                                    ))}
                                </div>
                            </div>
                        </MenuHandler>
                        <MenuList className=" max-w-full md:max-w-sm min-w-max !p-1 dark:border-none dark:bg-slate-800 dark:text-slate-300">
                            {likes.length > 0 && likes.map(({ likeType, usersWhoLiked }) => (
                                usersWhoLiked.map(({ name, email, pic }, i) => {
                                    return <MenuItem key={i} className=" justify-between dark:hover:bg-slate-900/50 dark:hover:text-slate-300 items-center flex gap-2">
                                        <div className=" flex justify-start items-center gap-3">
                                            <Avatar withBorder={false} className="  bg-white p-[2px]" src={pic || avatar} alt="avatar" size="sm" />
                                            <span>
                                                {name}({email})
                                            </span>
                                        </div>
                                        <img className={` rounded-full p-[1px] dark:bg-slate-800 w-8 `} src={likeTypeAll[likeType].emoji} alt="emoji" />
                                    </MenuItem>
                                })
                            ))}
                        </MenuList>
                    </Menu>
                </div>
                }
            </div>
        </div>
    );
}

ChatYou.propTypes = {
    hour: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
    msgId: PropTypes.string,
    likeType: PropTypes.array.isRequired,
    likes: PropTypes.array,
    totalLikes: PropTypes.number,
    setAllMessge: PropTypes.func,

}