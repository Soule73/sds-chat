/* eslint-disable react/prop-types */
import { ArrowLongLeftIcon } from "@heroicons/react/24/solid";
import Create from "./create";
import Comments from "./Comments";
import axios from "axios";

export default function ModalComments({ show, setShow, comments, setComments, parentId, setParentId, onClose = () => { }, likeType }) {

    async function getThisComments() {
        await axios.post(`/api/comment/find/${parentId}`).then((res) => {
            setComments(res.data)
        }).catch((e) => {
            console.log(e)
            const message = `Une erreur se produit: ${e.message}`;
            window.alert(message);
            return;
        });
    }
    const onclose = () => {
        onClose()
        setShow(false)
    }
    return (<div className={`${!show && "hidden"} w-full h-full top-0 left-0 rounded-2xl bg-white `}>
        <div className=" sticky top-0 z-10 bg-white px-2 border-gray-200/70 border-b">
            <ArrowLongLeftIcon onClick={onclose} className=" w-8 h-auto cursor-pointer" />
        </div>
        <Comments onSucces={getThisComments} likeType={likeType} parent setParentId={setParentId} setShow={setShow} comments={comments} setComments={setComments} />
        <Create placeholder="Répondez" parentId={parentId} onSucces={getThisComments} />
    </div>)
}