import Modal from "../../../Modal";
import PropTypes from "prop-types";
import { Avatar, Typography } from "@material-tailwind/react";
import avatar from "../../../../img/avatar/avatar.png";
import { EnvelopeIcon, UserIcon } from "@heroicons/react/24/solid";
import { createElement } from "react";

const SettingItem = ({ name, icon }) => {

    return <div className=" py-2 space-x-3 flex items-center">
        {createElement(icon, {
            className: "w-6 h-6 dark:fill-slate-100"
        })}
        <Typography className=" dark:text-slate-300">
            {name}
        </Typography>
    </div>
}


export default function CurrentChatInfo({ handleOpen, open, currentChat }) {



    const userProfile = [
        { name: currentChat?.name, icon: UserIcon },
        { name: currentChat?.email, icon: EnvelopeIcon },
    ]

    return <Modal title={"Info"} handleOpen={handleOpen} open={open}>
        <div className=" gap-2 flex flex-col">
            <div className=" pt-4 border-b dark:border-gray-700/30">
                <div className="  justify-center items-center flex flex-col">
                    <Avatar size="xxl" className=" bg-white p-[2px]" src={currentChat?.pic ? currentChat?.pic : avatar} alt="profile picture" />
                </div>
                <div className=" divide-y flex flex-col dark:divide-gray-700/30 ">
                    {userProfile.map(({ name, icon }, i) => (
                        <SettingItem key={i} name={name} icon={icon} />
                    ))}
                </div>
            </div>
        </div>
    </Modal>
}


CurrentChatInfo.propTypes = {
    open: PropTypes.bool,
    handleOpen: PropTypes.func.isRequired,
    currentChat: PropTypes.object

}
SettingItem.propTypes = {
    icon: PropTypes.object,
    name: PropTypes.string.isRequired,

}