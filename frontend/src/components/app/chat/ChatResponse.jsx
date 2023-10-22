import { Avatar, Menu, MenuHandler, MenuItem, MenuList } from "@material-tailwind/react";
import PropTypes from "prop-types";

import avatar from "../../../img/avatar/avatar.png";
import dateFormateHour from "../../../utils/chatLogique";
import { ArrowDownCircleIcon, DocumentTextIcon, FaceSmileIcon } from "@heroicons/react/24/solid";
import socket from "../../../socket";
import { useSelector } from "react-redux";
import { useState } from "react";
import { likeTypeAll } from "../../../utils/constants/contanst";

// eslint-disable-next-line react/prop-types
const Image = ({ content, name, caption }) => {
    const [show, setShow] = useState(false);
    const download = () => {
        const downladLink = document.createElement('a');
        downladLink.href = content;
        downladLink.download = name;

        downladLink.click();
    }
    return <div onMouseLeave={() => setShow(false)} onMouseEnter={() => setShow(true)}>
        {(show) && <ArrowDownCircleIcon onClick={download} className=" top-0 right-2 absolute w-8 h-8 dark:fill-slate-300 cursor-pointer" title="Enregistré" />}
        <img loading="lazy" onContextMenu={(e) => e.preventDefault()} src={content} className=" my-2 max-w-full md:max-w-sm rounded-xl" alt={name} />
        {caption && <figcaption className=" border-t mt-1 border-t-gray-700/30">{caption} </figcaption>}

    </div>
}
// eslint-disable-next-line react/prop-types
const Document = ({ content, name, caption }) => {
    const download = () => {
        const downladLink = document.createElement('a');
        downladLink.href = content;
        downladLink.download = name;

        downladLink.click();
    }
    return <div>
        <div onContextMenu={(e) => e.preventDefault()} className=" min-w-max flex gap-2 justify-between items-center">
            <div className=" flex items-center gap-2">
                <DocumentTextIcon className=" w-10 h-10" />
                <span>
                    {name}
                </span>

            </div>
            <ArrowDownCircleIcon onClick={download} className=" w-10 h-10 dark:fill-slate-300 cursor-pointer" title="Enregistré" />
        </div>
        {caption && <div className=" border-t mt-1 border-t-gray-700/30">
            {caption}
        </div>}
    </div>
}
export default function ChatResponse({ msg, likeType }) {

    const { userInfo } = useSelector((state) => state.auth);
    const [showEmoji, setShowEmoji] = useState(false);

    const likeForm = async (likeId) => {

        socket.emit('createLikeComment', {
            messageId: msg._id,
            likeTypeId: likeId,
            userId: userInfo._id
        });
    }

    return (
        <div className=" w-full gap-x-3 h-auto py-2 flex">
            <Avatar withBorder={false} className=" -top-1 bg-white p-[2px]" src={msg.photo || avatar} alt="avatar" size="sm" />
            <div onMouseLeave={() => setShowEmoji(false)} onMouseEnter={() => setShowEmoji(true)} className=" w-[80%] flex gap-2 items-center ">
                <div className=" flex flex-col gap-y-1">
                    <div
                        className=" before:shadow-[0_-25px_0_0_#fff] before:dark:shadow-[0_-25px_0_0_rgb(15,23,42)] before:content-[''] before:-left-2  before:absolute before:top-[25px] before:h-[15px] before:w-[50px] before:bg-transparent before:rounded-bl-[25px] relative w-auto max-w-max dark:bg-slate-900 dark:text-slate-300 bg-white flex flex-col text-start justify-start items-start px-2 pt-3 pb-1 md:px-2 rounded-lg ">
                        <div>
                            {msg.typeContent === "text" ? <p>{msg.content}</p>
                                :
                                msg.meta[0]?.type?.startsWith("image/") ?
                                    <Image caption={msg.meta[0]?.caption} content={msg.content} name={msg.meta[0]?.name} /> :
                                    msg.meta[0]?.type?.startsWith("application/") ?
                                        <Document caption={msg.meta[0]?.caption} content={msg.content} name={msg.meta[0]?.name} />
                                        : console.log(msg)
                            }
                            <p className=" w-full  text-xs flex justify-end items-end ">
                                <span>{dateFormateHour(msg.sentAt)}</span>
                            </p>
                        </div>
                    </div>
                    <div className="w-full flex items-center justify-end">
                        {msg.likes.length > 0 &&
                            <Menu>
                                <MenuHandler>
                                    <div className=" p-1 rounded-lg flex items-center gap-1 dark:bg-slate-900 dark:text-slate-300 bg-white w-max cursor-pointer ">
                                        <span className=" text-xs">{Number(msg.totalLikes) > 0 && msg.totalLikes} </span>
                                        <div className=" flex">
                                            {msg.likes.length > 0 && msg.likes.map(({ likeType }, i) => (
                                                <img style={{ zIndex: 6 - i, marginLeft: i !== 0 && "-5px" }} key={i} className={` rounded-full p-[1px] dark:bg-slate-800 w-5`} src={likeTypeAll[likeType].emoji} alt="emoji" />
                                            ))}
                                        </div>
                                    </div>
                                </MenuHandler>
                                <MenuList className="max-w-full md:max-w-sm min-w-max  !p-1 dark:border-none dark:bg-slate-800 dark:text-slate-300">
                                    {msg.likes.length > 0 && msg.likes.map(({ likeType, usersWhoLiked }) => (
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
                        }

                    </div>
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
    msg: PropTypes.object.isRequired,
    likeType: PropTypes.array.isRequired,
}