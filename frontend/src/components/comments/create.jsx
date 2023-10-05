/* eslint-disable react/prop-types */
import { PaperAirplaneIcon } from "@heroicons/react/24/solid";
import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";

export default function Create({ parentId, onSucces = () => { }, placeholder = "Écrivez un commentaire" }) {
    const { userInfo } = useSelector((state) => state.auth);

    const [form, setForm] = useState({
        content: "",
        user_id: userInfo._id
    });

    // These methods will update the state properties.
    function updateForm(value) {
        return setForm((prev) => {
            return { ...prev, ...value };
        });
    }

    const onSubmit = async (e) => {
        e.preventDefault();

        const newComment = { ...form, parent_id: parentId || null };
        await axios.post(
            `/api/comment/create`,
            JSON.stringify(newComment),
            {
                headers: { "Content-Type": "application/json", }, "Access-Control-Allow-Origin": import.meta.env.VITE_FRONTEND_URL,
            }
        )
            .catch(error => {
                window.alert(error);
                return;
            });
        onSucces();
        setForm({ content: "", parent_id: null });

    }

    return (
        <div className=" md:pl-3 bg-white h-min fixed w-full md:w-[36rem] lg:w-[42rem] pr-2 md:pr-0 pb-2 pt-1 bottom-0">

            <form onSubmit={onSubmit} className=" py-1  bg-gray-100 rounded-3xl px-4 flex gap-x-1">
                <input
                    type="text"
                    className=" py-1 bg-transparent focus:outline-0 w-full "
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
