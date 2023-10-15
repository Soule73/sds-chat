/* eslint-disable react/prop-types */
import { PaperAirplaneIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import { useSelector } from "react-redux";
// eslint-disable-next-line no-unused-vars
import { socket } from "../../../socket";

// eslint-disable-next-line no-unused-vars
export default function SendMessage({ chatId, parentId = null, onSucces = () => { }, placeholder = "Écrivez un commentaire" }) {
    const { userInfo } = useSelector((state) => state.auth);

    const [form, setForm] = useState({
        content: "",
    });

    // These methods will update the state properties.
    function updateForm(value) {
        return setForm((prev) => {
            return { ...prev, ...value };
        });
    }

    const onSubmit = async (e) => {
        e.preventDefault();

        const newComment = { ...form, userId: userInfo._id, parentId: parentId, chatId: chatId };
        // console.log(newComment)
        socket.emit('sendMessage', newComment);

        setForm({ content: "" });

    }

    return (
        <div className=" md:px-3 border-t border-gray-300 dark:border-gray-700/30 bg-white dark:bg-slate-800/80 h-min fixed w-full  xl:w-[calc(100%-20rem)] z-10 px-2 pb-2 pt-1 bottom-0">

            <form onSubmit={onSubmit} className=" py-1 w-full  bg-gray-100 dark:bg-slate-700 dark:text-slate-50 rounded-3xl px-4 flex gap-x-1">
                <input
                    type="text"
                    className=" py-1 bg-transparent focus:outline-0 w-[96%] "
                    id="content"
                    value={form.content}
                    placeholder={placeholder}
                    onChange={(e) => updateForm({ content: e.target.value })}
                />

                <button id="submit" type="submit" title="Commenté">
                    <PaperAirplaneIcon className=" w-8 h-8 fill-blue-600 " />
                </button>
            </form>
        </div>
    );
}
