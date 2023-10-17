import PropTypes from "prop-types";
import { IconButton } from "@material-tailwind/react";
import { createElement } from "react";

export default function ChatBoxSideIcon({ name, icon, active, title, onClick = () => { } }) {
    return (
        <div onClick={onClick} className={`${active ? "border-orange-800 text-orange-800 border-b-2" : "dark:text-slate-300 dark:border-gray-700/30 border-b"}  text-xs  cursor-pointer flex justify-center !bg-transparent flex-col items-center `}>
            <IconButton
                title={title}
                variant="text"
                className=" !py-0 !bg-transparent "
            >
                {createElement(icon, {
                    className: `w-6 h-6 stroke-2 ${active
                        ? " fill-orange-800 "
                        : " dark:fill-slate-100"
                        } `,
                })}
            </IconButton>
            {name}
        </div>
    );
}

ChatBoxSideIcon.propTypes = {
    name: PropTypes.string.isRequired,
    icon: PropTypes.object.isRequired,
    active: PropTypes.bool.isRequired,
    onClick: PropTypes.func,
    title: PropTypes.string
}