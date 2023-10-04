/* eslint-disable react/prop-types */
import { UserCircleIcon } from '@heroicons/react/24/solid'
import moment from "moment/moment";
import "moment/locale/fr";
const Comment = ({ comment, setShow, setComments, parent, setParentId }) => {
    const commentResponse = (comment) => {
        setComments([comment])
        setParentId(comment._id)
        setShow(true)

    }
    return (
        <div className=' md:w-[36rem] lg:w-[42rem]'>
            <div className={` flex gap-1`} >
                <div>
                    <UserCircleIcon className={`${parent || !comment.parent_id ? " w-10 h-10" : " w-8 h-8"} rounded-full`} />
                </div>
                <div className='mt-1'>
                    <div className='  bg-gray-200 px-4 py-2 rounded-2xl'>
                        <span className=' font-bold text-xs'>
                            SDS,{moment(comment.created_at)
                                .locale("fr")
                                .fromNow()}
                        </span>
                        <p className=' text-base'>{comment.content}</p>
                    </div>
                    <div className=' mt-1 px-3 font-bold text-xs flex gap-2'>
                        <span onClick={() => commentResponse(comment)} className=' cursor-pointer'>
                            Répondre
                        </span>
                        <span className=' cursor-pointer '>
                            J&apos;aime
                        </span>

                    </div>
                </div>
            </div>
            <div className=' mt-2 ml-10'>
                {parent && comment.subComments &&
                    comment.subComments.map((subComment) => (
                        <Comment setParentId={setParentId} setComments={setComments} setShow={setShow} key={subComment._id} comment={subComment} />
                    ))
                }
                {!parent && comment.subComments.length > 0 && (
                    <button onClick={() => commentResponse(comment)} className=' text-xs font-bold'>
                        {'Afficher les réponses'}
                    </button>
                )}

            </div>
        </div>
    );
};

const Comments = ({ comments, setShow, setComments, parent, setParentId }) => {
    return (
        <div className=' px-2 pt-2  md:min-w-[30rem]'>
            {comments.map((comment) => (
                <Comment setParentId={setParentId} parent={parent} setComments={setComments} setShow={setShow} key={comment._id} comment={comment} />
            ))}
        </div>
    );
};

export default Comments;
