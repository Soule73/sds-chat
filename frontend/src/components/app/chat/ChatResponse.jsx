import { Avatar, Menu, MenuHandler, MenuItem, MenuList } from "@material-tailwind/react";
import PropTypes from "prop-types";

import avatar from "../../../img/avatar/avatar.png";
import dateFormateHour from "../../../utils/chatLogique";
import { FaceSmileIcon } from "@heroicons/react/24/solid";

import love from "../../../img/emoji/love.gif";
import like from "../../../img/emoji/like.gif";
import wow from "../../../img/emoji/wow.gif";
import sad from "../../../img/emoji/sad.gif";
import angry from "../../../img/emoji/angry.gif";
import haha from "../../../img/emoji/haha.gif";
import yay from "../../../img/emoji/yay.gif";
import { socket } from "../../../socket";
import { useSelector } from "react-redux";
import { useState } from "react";

export default function ChatResponse({ hour, message, photo, likeType, msgId, likes, totalLikes, setAllMessge }) {

    const { userInfo } = useSelector((state) => state.auth);
    const [showEmoji, setShowEmoji] = useState(false);
    const likeTypeAll = {
        "like": { text: "J'aime", color: "text-blue-600", emoji: like },
        "love": { text: "J'adore", color: "text-red-400", emoji: love },
        "yay": { text: "Yay", color: "text-amber-600", emoji: yay },
        "haha": { text: "Haha", color: "text-blue-600", emoji: haha },
        "wow": { text: "Waouh", color: "text-blue-600", emoji: wow },
        "sad": { text: "Triste", color: "text-blue-600", emoji: sad },
        "angry": { text: "En colére", color: "text-red-800", emoji: angry },
    }
    const likeForm = async (likeId) => {

        socket.emit('createLikeComment', {
            messageId: msgId,
            likeTypeId: likeId,
            userId: userInfo._id
        });

        socket.on('likeComment', (e) => setAllMessge(e))
    }



    return (
        <div className=" w-full gap-x-3 h-auto py-2 flex">
            <Avatar withBorder={false} className=" -top-1 bg-white p-[2px]" src={photo || avatar} alt="avatar" size="sm" />
            <div onMouseLeave={() => setShowEmoji(false)} onMouseEnter={() => setShowEmoji(true)} className=" w-[80%] flex gap-2 items-center ">
                <div className=" flex flex-col gap-y-1">
                    <div
                        // onContextMenu={(e) => { e.preventDefault(); console.log(e) }}
                        className=" before:shadow-[0_-25px_0_0_#fff] before:dark:shadow-[0_-25px_0_0_rgb(15,23,42)] before:content-[''] before:-left-2  before:absolute before:top-[25px] before:h-[15px] before:w-[50px] before:bg-transparent before:rounded-bl-[25px] relative w-auto max-w-max dark:bg-slate-900 dark:text-slate-300 bg-white flex flex-col text-start justify-start items-start px-2 pt-3 pb-1 md:px-2 rounded-lg ">
                        <div>
                            <p>{message}</p>
                            <p className=" w-full  text-xs flex justify-end items-end ">
                                <span>{dateFormateHour(hour)}</span>
                            </p>
                        </div>
                    </div>
                    {likes.length > 0 && <div className="w-full flex items-center justify-end">
                        <Menu>
                            <MenuHandler>
                                <div className=" p-1 rounded-lg flex items-center gap-1 dark:bg-slate-900 dark:text-slate-300 bg-white w-max cursor-pointer ">
                                    <span className=" text-xs">{Number(totalLikes) > 0 && totalLikes} </span>
                                    <div className=" flex">
                                        {likes.length > 0 && likes.map(({ likeType }, i) => (
                                            <img style={{ zIndex: 6 - i, marginLeft: i !== 0 && "-5px" }} key={i} className={` rounded-full p-[1px] dark:bg-slate-800 w-5`} src={likeTypeAll[likeType].emoji} alt="emoji" />
                                        ))}
                                    </div>
                                </div>
                            </MenuHandler>
                            <MenuList className="max-w-full md:max-w-sm min-w-max  !p-1 dark:border-none dark:bg-slate-800 dark:text-slate-300">
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
                    </div>}
                </div>
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
            </div>
        </div>
    );
}

ChatResponse.propTypes = {
    hour: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
    photo: PropTypes.string,
    name: PropTypes.string,
    msgId: PropTypes.string,
    likeType: PropTypes.array.isRequired,
    likes: PropTypes.array,
    totalLikes: PropTypes.number,
    setAllMessge: PropTypes.func,
}