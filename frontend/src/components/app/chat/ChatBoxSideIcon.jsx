import PropTypes from "prop-types";
import { IconButton } from "@material-tailwind/react";
import { createElement } from "react";

export default function ChatBoxSideIcon({ name, icon, active, onClick = () => { } }) {
    return (
        <div onClick={onClick} className=" cursor-pointer flex justify-center !bg-transparent flex-col gap-y-1 items-center ">
            <IconButton
                variant="text"
                color="blue-gray"
                className=" !bg-transparent h-6 "
            >
                {createElement(icon, {
                    className: `w-6 h-6 stroke-2 ${active
                        ? " stroke-blue-500 "
                        : "stroke-gray-800 dark:stroke-slate-100"
                        } `,
                })}
            </IconButton>
            <span
                className={` text-xs ${active ? " text-blue-500" : "text-gray-800 dark:text-slate-300"
                    } `}
            >
                {name}
            </span>
        </div>
    );
}

ChatBoxSideIcon.propTypes = {
    name: PropTypes.string.isRequired,
    icon: PropTypes.object.isRequired,
    active: PropTypes.bool.isRequired,
    onClick: PropTypes.func,
}