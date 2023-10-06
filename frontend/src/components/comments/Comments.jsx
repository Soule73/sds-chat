/* eslint-disable react/prop-types */
import { HandThumbUpIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import moment from "moment/moment";
import "moment/locale/fr";
import { Menu, MenuHandler, MenuItem, MenuList, Typography } from '@material-tailwind/react';
import axios from 'axios';
import { useSelector } from 'react-redux';
const LastSubComment = ({ last }) => {
    return <p className=' max-h-full text-sm cursor-pointer'>
        <span className=' font-bold'>{last.user_id.name} </span> {last.content.substring(0, 40) + (last.content.length > 40 && "...")}
    </p>
}
const Comment = ({ comment, setShow, setComments, parent, setParentId, likeType, onSucces }) => {
    const commentResponse = (comment) => {
        setComments([comment])
        setParentId(comment._id)
        setShow(true)

    }
    const { userInfo } = useSelector((state) => state.auth);

    const likeForm = (ref_id, like_id) => {
        axios.post('/api/like/create', {
            ref_id: ref_id,
            like_id: like_id,
            user_id: userInfo._id
        }).catch((e) => {
            const message = `Une erreur se produit: ${e.message}`;
            window.alert(message);
            return;
        });
        onSucces();
    }
    const likeTypeAll = {
        "like": { text: "J'aime", color: "text-blue-600", emoji: <HandThumbUpIcon className=' rounded-full p-[3px] bg-blue-600 fill-white w-5 h-5 stroke-white ' /> },
        "adore": { text: "J'adore", color: "text-red-400", emoji: "❤️" },
        "united": { text: "Solidaire", color: "text-amber-600", emoji: "🤗" },
        "haha": { text: "Haha", color: "text-blue-600", emoji: "🤣" },
        "wow": { text: "Waouh", color: "text-blue-600", emoji: "😨" },
        "sad": { text: "Triste", color: "text-blue-600", emoji: "😭" },
        "angry": { text: "En colére", color: "text-red-800", emoji: "😠" },
    }
    const currentLike = (id) => comment.likes.filter((el) => { return el.like_id._id === id && el.user_id === userInfo._id })
    const userIsLike = () => comment.likes.filter((el) => { return el.user_id === userInfo._id })
    const commentLikeType = () => comment.likes.filter((el) => { return el.ref_id === comment._id })

    const commentLikeTypeFilter = () => {
        const array = []
        commentLikeType().map((el) => array.indexOf(el.like_id.type) < 0 && array.push(el.like_id.type))
        return array;
    }
    return (
        <div className=' md:w-[36rem] lg:w-[42rem]'>
            <div className={` flex gap-1`} >
                <div>
                    <UserCircleIcon className={`${parent || !comment.parent_id ? "  w-10 h-10" : " w-8 h-8"} rounded-full`} />
                </div>
                <div className='mt-1'>
                    <div className='  bg-gray-200 px-4 py-2 rounded-2xl'>
                        <p className='text-xs'>
                            <span className=' font-bold'>{comment.user_id.name}</span>, {moment(comment.createdAt)
                                .locale("fr")
                                .fromNow()}
                        </p>
                        <p className=' text-base'>{comment.content}</p>
                    </div>
                    <div className=' items-center mt-1 px-3 font-bold text-xs flex gap-2'>
                        <span onClick={() => commentResponse(comment)} className=' cursor-pointer'>
                            Répondre
                        </span>
                        <Menu>
                            <MenuHandler>
                                <span className={`${userIsLike().length > 0 && likeTypeAll[userIsLike()[0].like_id.type].color} cursor-pointer `}>

                                    {userIsLike().length > 0 ? likeTypeAll[userIsLike()[0].like_id.type].text : "J'aime"}
                                </span>
                            </MenuHandler>
                            <MenuList className=' max-w-[16rem] flex justify-center p-2 flex-wrap gap-3'>
                                {likeType.map(({ type, _id }) =>
                                    <MenuItem key={type} onClick={() => likeForm(comment._id, _id)} className={`${currentLike(_id).length > 0 && "bg-blue-50"} !p-1 w-max text-3xl`}>{likeTypeAll[type].emoji}</MenuItem>)}
                            </MenuList>

                        </Menu>
                        <p className=' items-center flex text-lg cursor-pointer'>
                            {commentLikeType().length > 0 &&
                                commentLikeTypeFilter().map((emoji, i) =>
                                    <span style={{ zIndex: commentLikeTypeFilter().length - i }} key={i} className={`${i > 0 && "-ml-2"} `}>
                                        {likeTypeAll[emoji].emoji}
                                    </span>)
                            }
                        </p>
                        <span>
                            {comment.likesCount > 0 && comment.likesCount}
                        </span>
                    </div>

                </div>
            </div>
            <div className=' overflow-hidden text-ellipsis max-w-full mt-2 ml-10'>
                {parent && comment.subComments &&
                    comment.subComments.map((subComment) => (
                        <Comment onSucces={onSucces} likeType={likeType} setParentId={setParentId} setComments={setComments} setShow={setShow} key={subComment._id} comment={subComment} />
                    ))
                }
                {!parent && comment.subComments.length > 0 && (
                    <>

                        <Typography as={'span'} onClick={() => commentResponse(comment)} className={` ${comment.subComments.length > 1 ? " mb-1 cursor-pointer text-xs font-bold" : "hidden"}`}>
                            {(comment.subComments.length > 1 && comment.subComments.length != 2) &&
                                `Voir les ${comment.subComments.length - 1} réponses précédentes`
                            }

                            {comment.subComments.length === 2 &&
                                `Afficher une réponse précédente`
                            }
                        </Typography>
                        <div onClick={() => commentResponse(comment)} className=' cursor-pointer hover:bg-gray-100 w-max px-2 flex gap-2 items-center'>
                            <UserCircleIcon className=' w-6 h-6' />
                            <LastSubComment last={comment.subComments[comment.subComments.length - 1]} />
                        </div>
                    </>
                )}

            </div>
        </div>
    );
};

const Comments = ({ comments, setShow, setComments, parent, setParentId, likeType, onSucces = () => { } }) => {
    return (
        <div className=' px-2 pt-2  md:min-w-[30rem]'>
            {comments.map((comment) => (
                <Comment onSucces={onSucces} likeType={likeType} setParentId={setParentId} parent={parent} setComments={setComments} setShow={setShow} key={comment._id} comment={comment} />
            ))}
        </div>
    );
};

export default Comments;
