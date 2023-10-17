import { useSelector } from "react-redux";
import Switcher from "../../../../theme/Switcher";
import Modal from "../../../Modal";
import PropTypes from "prop-types";
import { Avatar, IconButton, Typography } from "@material-tailwind/react";
import avatar from "../../../../img/avatar/avatar.png";
import { EnvelopeIcon, LockClosedIcon, PencilIcon, UserIcon } from "@heroicons/react/24/solid";
import { createElement, useState } from "react";
import { UpdateProfileInfo } from "./UpdateProfileInfo";


const SettingItem = ({ name, icon, action }) => {

    return <div className=" py-2 flex items-center justify-between">
        <div className=" flex gap-2 md:gap-4 items-center">
            {createElement(icon, {
                className: "w-6 h-6 dark:fill-slate-100"
            })}
            <Typography className=" text-slate-900 dark:text-slate-300">
                {name}
            </Typography>
        </div>
        <IconButton onClick={action} variant="text" className=" dark:hover:bg-slate-700/40" >
            <PencilIcon title="Modifer" className=" cursor-pointer w-5 h-5 fill-orange-600" />
        </IconButton>
    </div>
}


export default function Profile({ handleOpen, open, }) {

    const { userInfo } = useSelector((state) => state.auth);
    const [updateValue, setUpdateValue] = useState('');

    const [showUpdateProfileInfo, setShowUpdateProfileInfo] = useState(false);
    const handleShowUpdateProfileInfo = () => setShowUpdateProfileInfo(!showUpdateProfileInfo);
    const actionUpdate = (action) => {
        setUpdateValue(action)
        handleShowUpdateProfileInfo()
    }
    const userProfile = [
        { name: userInfo?.name, icon: UserIcon, action: () => actionUpdate("name") },
        { name: userInfo?.email, icon: EnvelopeIcon, action: () => actionUpdate("email") },
        { name: "Modifier votre mot de passe", icon: LockClosedIcon, action: () => actionUpdate("password") },
    ]

    return <Modal title={"Paramétres"} handleOpen={handleOpen} open={open}>
        <UpdateProfileInfo updateValue={updateValue} open={showUpdateProfileInfo} handleOpen={handleShowUpdateProfileInfo} />
        <div className=" gap-2 flex flex-col">
            <div className=" pt-4 border-b dark:border-gray-700/30">
                <div className="  justify-center items-center flex flex-col">
                    <Avatar size="xxl" className=" bg-white p-[2px]" src={userInfo?.pic ? userInfo?.pic : avatar} alt="profile picture" />
                </div>
                <div className=" divide-y flex flex-col dark:divide-gray-700/30 ">
                    {userProfile.map(({ name, icon, action }, i) => (
                        <SettingItem key={i} name={name} icon={icon} action={action} />
                    ))}
                </div>
            </div>
            <Switcher />
        </div>
    </Modal>
}


Profile.propTypes = {
    open: PropTypes.bool,
    handleOpen: PropTypes.func.isRequired,

}
SettingItem.propTypes = {
    icon: PropTypes.object,
    name: PropTypes.string.isRequired,
    action: PropTypes.func.isRequired,

}