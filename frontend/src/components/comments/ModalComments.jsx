/* eslint-disable react/prop-types */
import { ArrowLongLeftIcon } from "@heroicons/react/24/solid";
import Create from "./create";
import Comments from "./Comments";
import { socket } from "../../socket";
import { useEffect, useRef } from "react";

export default function ModalComments({ show, setShow, comments, setComments, parentId, setParentId, onClose = () => { }, likeType }) {

    async function getThisComments() {
        socket.emit('getFindComment', { id: parentId });
        socket.on('findComment', (message) => {
            setComments(message);
        });
    }
    const onclose = () => {
        onClose()
        setShow(false)
    }

    const messagesColumnRef = useRef(null); // Add this


    useEffect(() => {
        messagesColumnRef.current.scrollTop =
            messagesColumnRef.current.scrollHeight;
    }, [comments, setComments]);
    return (
        <div ref={messagesColumnRef} className={`${!show && "hidden"} fixed mx-auto w-full md:w-[37rem] lg:w-[43rem] overflow-y-auto custome-scroll-bar z-40 pb-14 h-screen  top-0 rounded-2xl bg-white `}>

            <div className=" sticky top-0 z-10 border-x py-2 bg-white px-2 border-gray-200/70 border-b">
                <ArrowLongLeftIcon onClick={onclose} className=" w-8 h-auto cursor-pointer" />
            </div>

            <Comments onSucces={getThisComments} likeType={likeType} parent setParentId={setParentId} setShow={setShow} comments={comments} setComments={setComments} />
            <Create placeholder="Répondez" parentId={parentId} onSucces={getThisComments} />
        </div>)
}