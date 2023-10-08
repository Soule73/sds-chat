/* eslint-disable react/prop-types */
import { PaperAirplaneIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import { useSelector } from "react-redux";
import { socket } from "../../socket";

export default function Create({ parentId, onSucces = () => { }, placeholder = "Écrivez un commentaire" }) {
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

        const newComment = { ...form, user_id: userInfo._id, parent_id: parentId || null };
        socket.emit('createComment', newComment);
        socket.on('commentSucces', onSucces);

        setForm({ content: "", parent_id: null });

    }

    return (
        <div className=" md:px-3 bg-white h-min fixed w-full md:w-[37rem] lg:w-[43rem] z-10 px-2 pb-2 pt-1 bottom-0">

            <form onSubmit={onSubmit} className=" py-1 w-full  bg-gray-100 rounded-3xl px-4 flex gap-x-1">
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
