import PropTypes from "prop-types";

import { Avatar, Badge, Typography } from "@material-tailwind/react";

export default function RecentChat({ color, photo, message, name, time }) {
    return (
        <div className=" cursor-pointer px-2 dark:hover:bg-slate-800 hover:bg-blue-gray-50/80 !rounded-none h-16 focus:!h-16 flex gap-x-2 justify-start items-center ">
            <Badge
                color={color || "red"}
                overlap={"circular"}
                placement={"bottom-end"}
            >
                <Avatar
                    size="sm"
                    src={photo}
                    className=" bg-white p-[2px]"
                    alt="profile picture"
                />
            </Badge>
            <div className=" w-5/6 items-center flex justify-between">
                <div className=" pl-2  ">
                    <Typography
                        variant="h6"
                        className=" dark:text-slate-50"
                    >
                        {name}
                    </Typography>
                    <Typography
                        variant="small"
                        className="font-normal text-slate-600 dark:text-slate-400"
                    >
                        {message.substring(0, 20) + "..."}
                    </Typography>
                </div>
                <Typography
                    variant="small"
                    className="font-normal text-slate-600 dark:text-slate-400 text-xs "
                >
                    {time}
                </Typography>
            </div>
        </div>
    );
}

RecentChat.propTypes = {

    message: PropTypes.string,
    photo: PropTypes.string,
    color: PropTypes.string,
    name: PropTypes.string.isRequired,
    time: PropTypes.string,

}