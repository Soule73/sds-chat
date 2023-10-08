import {
    useEffect,
    useRef,
    useState
} from "react";
import Comments from "./Comments";
import Create from "./create";
import ModalComments from "./ModalComments";
import { socket } from "../../socket";

export default function CommentsList() {

    const [allComments, setAllComments] = useState([]);
    const [show, setShow] = useState(false);
    const [parentId, setParentId] = useState("")
    const [comments, setComments] = useState([]);
    const [likeType, setLikeType] = useState([])

    async function getAllComments() {
        socket.emit('getAllComments');

        socket.on('allComments', (message) => {
            setAllComments(message);
        });
    }

    useEffect(() => {

        async function getAllComments() {
            socket.emit('getLikeType');

            socket.on('likeType', (message) => {
                setLikeType(message);
            });
        }
        async function fetchLikeType() {
            socket.emit('getAllComments');

            socket.on('allComments', (message) => {
                setAllComments(message);
            });
        }
        fetchLikeType();
        getAllComments()
    }, []);

    const messagesColumnRef = useRef(null); // Add this

    // Add this
    // Scroll to the most recent message
    useEffect(() => {
        messagesColumnRef.current.scrollTop =
            messagesColumnRef.current.scrollHeight;
    }, [allComments, setAllComments]);
    return (
        <div className=" pt-6 bg-white md:bg-gray-100 flex justify-center items-center min-h-screen selection:bg-red-500 selection:text-white">
            <div className=" max-h-screen overflow-y-auto custome-scroll-bar relative w-full md:w-[37rem] lg:w-[43rem] min-h-screen bg-white">
                <ModalComments likeType={likeType} onClose={() => getAllComments()} parentId={parentId} setParentId={setParentId} comments={comments} setComments={setComments} show={show} setShow={setShow} />
                <div ref={messagesColumnRef} className=' pb-12   pt-6 bg-white'>

                    {
                        !show &&
                        <>
                            <Comments onSucces={getAllComments} likeType={likeType} setParentId={setParentId} setComments={setComments} setShow={setShow} comments={allComments} />
                            <Create onSucces={getAllComments} />
                        </>
                    }
                </div>

            </div>
        </div>
    );
}