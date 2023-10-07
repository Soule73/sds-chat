/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import Comments from "./Comments";
import Create from "./create";
import ModalComments from "./ModalComments";
import axios from "axios";
// import { useNavigate } from "react-router-dom";

export default function CommentsList() {

    const [allComments, setAllComments] = useState([]);
    const [show, setShow] = useState(false);
    const [parentId, setParentId] = useState("")
    const [comments, setComments] = useState([]);
    const [likeType, setLikeType] = useState([])

    async function getAllComments() {
        await axios.post(`/api/comment`,
            {
                withCredentials: true,
            }
        ).then((res) => {
            setAllComments(res.data)
            return;
        }).catch((e) => {
            const message = `Une erreur se produit: ${e.message}`;
            window.alert(message);
            return;
        });
    }

    // const navigate = useNavigate();

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.post('/api/comment', {
                    withCredentials: true,
                });
                setAllComments(response.data);
            } catch (e) {
                const message = `Une erreur se produit: ${e.message}`;
                console.log(message);
            }
        }

        async function fetchLikeType() {
            try {
                const response = await axios.post('/api/like/type/all', {
                    withCredentials: true,
                });
                setLikeType(response.data);
                console.log(response.data);
            } catch (e) {

                const message = `Une erreur se produit: ${e.message}`;
                console.log(message);
            }
        }

        fetchData();
        fetchLikeType();
    }, []);

    return (
        <div className=" pt-6 bg-white md:bg-gray-100 flex justify-center items-center min-h-screen selection:bg-red-500 selection:text-white">
            <div className='overflow-y-auto custome-scroll-bar pb-12 min-h-[98dvh] max-h-[98dvh] relative w-full md:w-[37rem] lg:w-[43rem] pt-6 bg-white'>
                <ModalComments likeType={likeType} onClose={() => getAllComments()} parentId={parentId} setParentId={setParentId} comments={comments} setComments={setComments} show={show} setShow={setShow} />

                {
                    !show &&
                    <>
                        <Comments likeType={likeType} setParentId={setParentId} setComments={setComments} setShow={setShow} comments={allComments} />
                        <Create onSucces={() => getAllComments} />
                    </>
                }

                <style>
                    {`
                    .custome-scroll-bar::-webkit-scrollbar {
                        width: 0px;
                        height: 0px;

                    }`}
                </style>
            </div>
        </div>
    );
}