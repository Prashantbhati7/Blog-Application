import React from 'react'

import PostService from '../../appwrite/config';
import { useSelector } from 'react-redux';
function CommentBox({deleteComment,Comment}) {
    const userid = useSelector((state)=>(state.userdata.$id))
    const handleClick = ()=>{
        PostService.deleteComment(Comment.$id).then((res)=>{
            if (res){
                deleteComment(Comment.$id);
            }
        })
        
    }
  return (
        <div className="box bg-gray-400 rounded-xl px-4 pt-3 w-sm">
            <div className="actul flex gap-10">
                <div className="content">{Comment.content}</div>
                {(userid === Comment.userid) && <button className="delete cursor-pointer bg-blue-100 px-2  text-red-500 rounded-xl transition delay-75 duration-300 ease-in-out active:scale-50 " onClick={handleClick}>Delete </button>}
            </div>
            <div className="by font-stretch-125% text-sm py-2 text-black  italic">By: {Comment.username}</div>
        </div>
  )
}

export default CommentBox
