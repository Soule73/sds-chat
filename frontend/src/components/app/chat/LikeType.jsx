import { FaceSmileIcon } from "@heroicons/react/24/solid";
import { Menu, MenuHandler, MenuItem, MenuList } from "@material-tailwind/react";
import socket from "../../../socket";
import PropTypes from "prop-types";
import { likeTypeAll } from "../../../utils/constants/contanst";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";

export default function LikeType({ showEmoji, msgId }) {

    const [likeType, setLikeType] = useState([]);
    useEffect(() => {
        axios.post('/api/like/likeType').then((res) => setLikeType(res.data))
    }, [])

    const { userInfo } = useSelector((state) => state.auth);

    const likeForm = async (likeId) => {
        socket.emit('createLikeComment', {
            messageId: msgId,
            likeTypeId: likeId,
            userId: userInfo._id
        });
    }

    return (likeType.length > 0 && showEmoji) &&
        <Menu>
            <MenuHandler>
                <FaceSmileIcon className=" cursor-pointer w-8 h-8" />

            </MenuHandler>
            <MenuList className=' dark:bg-slate-800 border-none max-w-[16rem] flex justify-center p-2 flex-wrap gap-3'>
                {likeType.map(({ type, _id }) =>
                    <MenuItem key={_id}
                        onClick={() => likeForm(_id)}

                        className={` flex flex-col justify-center dark:hover:bg-transparent text-center items-center w-max h-max !p-1`}>

                        <img className=" rounded-full p-1 dark:bg-slate-800 w-10 h-10" src={likeTypeAll[type].emoji} alt="emoji" />
                        <span className=" dark:text-slate-100 text-xs">{likeTypeAll[type].text}</span>
                    </MenuItem>)
                }

            </MenuList>

        </Menu>
}


LikeType.propTypes = {
    showEmoji: PropTypes.bool,
    msgId: PropTypes.string,
}