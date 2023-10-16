import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { Menu, MenuHandler, MenuItem, MenuList } from "@material-tailwind/react";
import avatar from "../../../img/avatar/avatar.png";
import RecentChat from "./RecentChat";
import PropTypes from "prop-types";


const CONST_RECENTS_CHAT = [
    {
        id: 1,
        name: "Ralph L. Alva",
        message: "All the Lorem Ipsum generators",
        time: "15 sec ago",
        photo: avatar,
        color: "green",
    },
    {
        id: 2,
        name: "Ralph L. Alva",
        message: "If you are going to use a passage",
        time: "55 sec ago",
        photo: avatar,
    },
    {
        id: 3,
        name: "John B. Roman",
        message: "The standard chunk of lorem",
        time: "5 min ago",
        photo: avatar,
        color: "green",
    },
    {
        id: 4,
        name: "John B. Roman",
        message: "Many desktop publishing packages",
        time: "21 min ago",
        photo: avatar,
        color: "green",
    },
    {
        id: 5,
        name: "John B. Roman",
        message: "Various versions have evolved over",
        time: "1 hrs ago",
        photo: avatar,
        color: "red",
    },
    {
        id: 6,
        name: "Ralph L. Alva",
        message: "Making this the first true generator",
        time: "5 hrs ago",
        photo: avatar,
        color: "green",
    },
    {
        id: 7,
        name: "David O. Buckley",
        message: "Duis aute irure dolor in reprehenderit",
        time: "5 hrs ago",
        photo: avatar,
        color: "red",
    },
    {
        id: 8,
        name: "Ralph L. Alva",
        message: "The passage is attributed to an unknown",
        time: "5 hrs ago",
        photo: avatar,
        color: "green",
    },
    {
        id: 9,
        name: "John B. Roman",
        message: "The point of using Lorem",
        time: "5 hrs ago",
        photo: avatar,
        color: "green",
    },
    {
        id: 10,
        name: "Pauline I. Bird",
        message: "It was popularised in the 1960s",
        time: "5 hrs ago",
        photo: avatar,
        color: "green",
    },
];
export default function ListRecentChat({ activeSection }) {
    return <div className={`${activeSection !== 1 && "hidden"} w-full h-[calc(100%-15rem)] custome-scroll-bar max-h-[calc(100%-15rem)] overflow-auto xl:overflow-hidden xl:hover:overflow-y-auto `}>
        <Menu>
            <MenuHandler>
                <div className="sticky top-0 bg-white dark:bg-slate-900 w-full z-[2] cursor-pointer max-w-max px-3 pt-3 flex justify-start items-center ">
                    <span className=" dark:text-slate-100 text-sm capitalize flex justify-center items-center ">
                        RECENT CHATS
                    </span>
                    <ChevronDownIcon className=" dark:stroke-slate-100 w-5 h-5 " />
                </div>
            </MenuHandler>
            <MenuList className=" dark:bg-slate-800 dark:text-slate-100 dark:!border-gray-600/30">
                <div className=" dark:border-gray-600/30 border-b border-gray-200 pb-1 ">
                    {[{ name: "Recent Chat" }, { name: "Hidden Chat" }].map(
                        ({ name }, i) => {
                            return (
                                <MenuItem
                                    key={"recent_chat_" + i}
                                    className=" dark:hover:!bg-slate-900 dark:hover:text-slate-100"
                                >
                                    {name}
                                </MenuItem>
                            );
                        }
                    )}
                </div>
                <div className=" dark:border-gray-600/30 border-b border-gray-200 pb-1 ">
                    {[{ name: "Sort by time" }, { name: "Sort by unread" }].map(
                        ({ name }, i) => {
                            return (
                                <MenuItem
                                    key={"recent_chat1_" + i}
                                    className=" dark:hover:!bg-slate-900 dark:hover:text-slate-100"
                                >
                                    {name}
                                </MenuItem>
                            );
                        }
                    )}
                </div>
                <MenuItem className=" dark:hover:!bg-slate-900 dark:hover:text-slate-100">
                    Show Favorites
                </MenuItem>
            </MenuList>
        </Menu>
        {CONST_RECENTS_CHAT.map(
            ({ message, photo, name, time, color }, id) => (
                <RecentChat
                    key={id}
                    message={message}
                    name={name}
                    photo={photo}
                    time={time}
                    color={color}
                />
            )
        )}
    </div>
}

ListRecentChat.propTypes = {
    activeSection: PropTypes.number.isRequired,
}