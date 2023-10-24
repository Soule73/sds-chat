import { Avatar, Menu, MenuHandler, MenuItem, MenuList } from "@material-tailwind/react"
import avatar from "../../../img/avatar/avatar.png";
import { likeTypeAll } from "../../../utils/constants/contanst";
import PropTypes from "prop-types";

export default function LikeList({ msg, right }) {
    return msg.likes.length > 0 && <div className={`w-full ${right ? "pr-2 justify-end" : "pl-2 justify-start"} flex items-center `}>
        <Menu>
            <MenuHandler>
                <div className={`p-[0.3rem] -mt-3 z-[1] rounded-md flex items-center gap-1 w-max dark:bg-slate-800 00 bg-slate-200 cursor-pointer  justify-start`}>
                    <span className="dark:text-slate-100 text-xs">{Number(msg.totalLikes) > 0 && msg.totalLikes} </span>
                    <div className=" flex">
                        {msg.likes.length > 0 && msg.likes.map(({ likeType }, i) => (
                            <img style={{ zIndex: 6 - i, marginLeft: i !== 0 && "-0.25rem" }} key={i} className={` rounded-full p-[1px] bg-slate-100 w-5 h-5`} src={likeTypeAll[likeType].emoji} alt="emoji" />
                        ))}
                    </div>
                </div>
            </MenuHandler>
            <MenuList className="dark:text-slate-100  max-w-full md:max-w-sm min-w-max !p-1 dark:border-none dark:bg-slate-800 00">
                {msg.likes.length > 0 && msg.likes.map(({ likeType, usersWhoLiked }) => (
                    usersWhoLiked.map(({ name, email, pic }, i) => {
                        return <MenuItem key={i} className="dark:hover:text-slate-100 justify-between dark:hover:bg-slate-900/50 items-center flex gap-2">
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

LikeList.propTypes = {
    msg: PropTypes.object.isRequired,
    right: PropTypes.bool

}