import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import PostService from '../appwrite/config';
import { Container ,Button} from '../Component';
import CommentBox from '../Component/CommentBox/CommentBox';
import parse from 'html-react-parser'
import { Helix } from "ldrs/react";
import { configureStore } from '@reduxjs/toolkit';
function Post() {
    const [post,setpost] = useState(null);
    const {slug} = useParams();
    const navigate = useNavigate();
    const userData = useSelector((state)=>state.userdata);
    const isAuthor = post && userData ? post.userid === userData.$id : false ;
    const [loading , setloading] = useState(true);
    const [comments,setcomments] = useState([]);
    const [inputcomment,setinputcomment] = useState("");
    useEffect(()=>{
        if (slug){
            PostService.getPost(slug).then((post)=>{
                if (post) {
                    setpost(post);
                    PostService.getPostComment(slug).then((comments)=>{
                        console.log("comments for this posts are ",comments);
                        if (comments) setcomments(comments);
                    })
                    setloading(false);
                }
                else {
                    navigate('/')
                    setloading(false);
                }

            })
        }else navigate('/')
    },[slug,navigate])
    
    const deletePost = ()=>{
        PostService.deletePost(post.$id).then((status)=>{
            
            if (status){
                PostService.deleteFile(post.featuredImage);
                navigate('/')
            }
        })
    }
    const addcomment = ()=>{
        PostService.createComment({slug:post.$id,username:userData.name,userid:userData.$id,content:inputcomment}).then((comment)=>{
            setcomments((prev)=>{

                return [...prev,comment];
            })
            setinputcomment("");
        })
    }
    const deleteComment = (commentid)=>{
        const newcomments = Array.from(comments).filter((comment)=>(comment.$id!=commentid));
        setcomments(newcomments);
    }
    return loading? <div className=' min-h-screen bg-black text-white text-center text-5xl flex flex-col gap-10 items-center justify-center'> 
        <Helix
        size="100"
        speed="2.5"
        color="white" /> 
        <div>Loading...</div>
  </div>:post ? (<div className='py-8'>
        <Container>
            <div className='w-100 mx-auto flex justify-center mb-4 h-100  relative border rounded-xl p-2 '>
               
                <img src={PostService.getFilePreview(post.featuredImage)}  alt={post.title} className='rounded-xl object-contain' />
                {isAuthor && ( 
                    <div className='absolute right-6 top-6'>
                        
                            <Button bgcolor='bg-green-500' onClick={(e)=> {
                                navigate(`/edit-post/${post.$id}`)
                            }} className='mr-3'>Edit</Button>
                        
                        <Button bgcolor='bg-red-500' onClick={deletePost}>Delete </Button>
                     </div>
                )}
            </div>
            <div className='w-full mb-6'>
                <h1 className='text-2xl font-bold'>{post.title}</h1>
            </div>
            <div className='browser-css'>{parse(post.content)}</div>
            <div className="author text-right italic ">author:{post.username}</div>
             <div className='py-12 flex justify-start gap-5'>
               
                <label htmlFor="comment">comment </label>
                <input type="text" id='comment' value={inputcomment} onChange={(e)=>(setinputcomment(e.target.value))} className='bg-white text-black px-4 placeholder:text-black rounded-xl outline-1  placeholder:px-4 outline-gray-600' placeholder='add a comment ' />
                <button  className='bg-blue-400 outline-1 cursor-pointer outline-gray-500 px-2 py-1 rounded-xl' onClick={addcomment} >Add</button>
            </div>
            <div className="comments grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                
                {Array.from(comments).map((comment,idx)=>{
                    
                    return <CommentBox key={idx} deleteComment={deleteComment} Comment={comment}/>
                })}
               
            </div>
        </Container>
    </div>): (<div className='bg-black text-white text-center text-5xl'>Not Post Found.... </div>)
}

export default Post
