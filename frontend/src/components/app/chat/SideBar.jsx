import { BellIcon, EllipsisVerticalIcon, ChatBubbleLeftRightIcon, ChevronDownIcon, MagnifyingGlassIcon, PencilSquareIcon, PhoneIcon, UserIcon, VideoCameraIcon } from "@heroicons/react/24/outline";
import { Card, Menu, MenuHandler, MenuItem, MenuList } from "@material-tailwind/react";
import ChatBoxSideIcon from "./ChatBoxSideIcon";

import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../../../slices/usersApiSlice";
import { logout } from "../../../slices/authSlice";
import ListRecentChat from "./ListRecentChat";
import ListUserChat from "./ListUserChat";
import PropTypes from "prop-types";
import { useSwipeable } from "react-swipeable";


const CONST_CHAT_BOX_SIDE_BAR_MENU_ITEM = [
    { id: 1, name: "Discussions", icon: ChatBubbleLeftRightIcon },
    { id: 2, name: "Appels", icon: PhoneIcon },
    { id: 3, name: "Contacts", icon: UserIcon },
    { id: 4, name: "Notifications", icon: BellIcon },
];
export default function SideBar({
    handleOpenChat, handleOpenProfileModal,
    openChat, userChats, setChatId }) {

    const [activeSection, setActiveSection] = useState(Number(localStorage.sideBarActiveSection) ?? 1)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const saveActiveSection = (id) => {
        if (0 < id && id < 5) {
            setActiveSection(id)
            localStorage.setItem("sideBarActiveSection", id)
        }
    }
    const handlers = useSwipeable({
        onSwipedLeft: () => saveActiveSection(activeSection + 1),
        onSwipedRight: () => saveActiveSection(activeSection - 1),
    });

    const [logoutApiCall] = useLogoutMutation();

    const logoutHandler = async () => {
        const { theme } = localStorage;

        try {
            await logoutApiCall().unwrap();
            dispatch(logout());
            localStorage.clear()
            localStorage.setItem('theme', theme)
            navigate('/login');
        } catch (err) {
            console.error(err);
        }
    };


    // setup ref for your usage
    const myRef = useRef();

    const refPassthrough = (el) => {
        // call useSwipeable ref prop with el
        handlers.ref(el);

        // set myRef el so you can access it yourself
        myRef.current = el;
    }

    return <Card
        ref={refPassthrough}
        className={`${!openChat ? "block" : "hidden lg:block"} border-r border-r-gray-200 lg:block z-10 !shadow-none absolute !min-h-full !rounded-l w-full bg-black/10 bg-white dark:bg-slate-900 dark:border-r-gray-600/30 lg:!w-80 !h-full `}
    >
        {/* <div className=" !rounded-l w-full !h-full  "> */}
        <div className=" pt-2 w-full h-40 grid gap-2 ">
            <div className=" px-3 flex justify-between items-center ">

                <div className=" px-3 flex justify-center items-center ">
                    <div className=" flex justify-center dark:border-gray-600/30 w-8 h-8 items-center p-1 rounded-l-lg border border-blue-gray-100 ">
                        <MagnifyingGlassIcon className=" dark:stroke-slate-100 w-4 h-4 " />
                    </div>
                    <div>
                        <input
                            type="search"
                            name="searchChat"
                            id="searchChat"
                            className=" h-8 w-52 dark:text-slate-100 dark:border-gray-600/30 dark:bg-transparent placeholder:text-xs text-sm focus:outline focus:outline-4 focus:outline-blue-600/30 px-1 border-y border-r rounded-r-lg border-y-blue-gray-100 "
                            placeholder="People, Group & Message "
                        />
                    </div>
                </div>
                <Menu>
                    <MenuHandler>
                        <EllipsisVerticalIcon className=" cursor-pointer w-6 h-6 " />
                    </MenuHandler>
                    <MenuList className=" dark:bg-slate-800 dark:!border-gray-600/30">
                        {[
                            { name: "Parametre", onclick: handleOpenProfileModal },
                            { name: "Help & Feedback", onclick: () => { } },
                            { name: "Se déconnecter", onclick: logoutHandler },
                        ].map(({ name, onclick }, i) => {
                            return (
                                <MenuItem
                                    onClick={onclick}
                                    key={"horizontal_menu_" + i}
                                    className=" hover:!bg-blue-gray-50  dark:hover:!bg-slate-900 focus:bg-slate-900 dark:text-slate-50 dark:hover:text-slate-100"
                                >
                                    {name}
                                </MenuItem>

                            );
                        })}

                    </MenuList>
                </Menu>
            </div>

            <div className="border-b border-b-gray-200 dark:border-blue-gray-600/30 grid grid-cols-4 px-3 ">
                {CONST_CHAT_BOX_SIDE_BAR_MENU_ITEM.map(
                    ({ name, icon, id }) =>
                    (
                        <ChatBoxSideIcon
                            key={id}
                            name={name}
                            title={name}
                            icon={icon}
                            onClick={() => saveActiveSection(id)}
                            active={id === activeSection}
                        />
                    )

                )}
            </div>
            <div className=" justify-center items-center px-3 grid grid-cols-2 gap-x-4 ">
                <div className=" cursor-pointer hover:border-gray-600/30 dark:border-gray-600/30 dark:text-slate-300 flex justify-center items-center border border-b-gray-200 h-8 rounded-3xl ">
                    <Menu>
                        <MenuHandler>
                            <div className=" flex items-center justify-center gap-x-2 ">
                                <VideoCameraIcon className=" w-5 h-5 " />
                                <span className=" text-xs ">Meet Now</span>
                                <ChevronDownIcon className=" w-5 h-5 " />
                            </div>
                        </MenuHandler>
                        <MenuList className=" dark:bg-slate-800 dark:text-slate-100 dark:!border-gray-600/30">
                            {[
                                { name: "Host a meeting" },
                                { name: "Join a meeting" },
                            ].map(({ name }, i) => {
                                return (
                                    <MenuItem
                                        key={"meet_now_menu_" + i}
                                        className=" dark:hover:!bg-slate-900 dark:hover:text-slate-100"
                                    >
                                        {name}
                                    </MenuItem>
                                );
                            })}
                        </MenuList>
                    </Menu>
                </div>
                <div className=" cursor-pointer dark:border-gray-600/30 dark:text-slate-100 hover:border-gray-600/30 flex justify-center items-center border border-b-gray-200 h-8 rounded-3xl ">
                    <Menu>
                        <MenuHandler>
                            <div className=" flex items-center justify-center gap-x-2 ">
                                <PencilSquareIcon className=" w-5 h-5 " />
                                <span className=" text-xs ">New Chat</span>
                                <ChevronDownIcon className=" w-5 h-5 " />
                            </div>
                        </MenuHandler>
                        <MenuList className=" dark:bg-slate-800 dark:text-slate-100 dark:!border-gray-600/30">
                            {[
                                { name: "New Group Chat", onclick: () => { } },
                                { name: "New Moderated Chat", onclick: () => { } },
                                { name: "New Chat", onclick: () => { } },
                                { name: "New Private Chat", onclick: () => { } },
                            ].map(({ name, onclick }, i) => {
                                return (
                                    <MenuItem
                                        key={"new_chat_menu_" + i}
                                        onClick={onclick}
                                        className=" dark:hover:!bg-slate-900 dark:hover:text-slate-100"
                                    >
                                        {name}
                                    </MenuItem>
                                );
                            })}
                        </MenuList>
                    </Menu>
                </div>
            </div>

        </div>

        <ListRecentChat activeSection={activeSection} />
        <ListUserChat handleOpenChat={handleOpenChat} setChatId={setChatId} userChats={userChats} activeSection={activeSection} />
        {/* </div> */}
    </Card>
}

SideBar.propTypes = {
    setChatId: PropTypes.func.isRequired,
    userChats: PropTypes.array.isRequired,
    openChat: PropTypes.bool.isRequired,
    handleOpenChat: PropTypes.func.isRequired,
    handleOpenProfileModal: PropTypes.func.isRequired,

}

