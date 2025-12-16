import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import PostService from '../appwrite/config';
import { Container ,Button} from '../Component';
import parse from 'html-react-parser'
import { Helix } from "ldrs/react";
function Post() {
    const [post,setpost] = useState(null);
    const {slug} = useParams();
    const navigate = useNavigate();
    const userData = useSelector((state)=>state.userdata);
    const isAuthor = post && userData ? post.userid === userData.$id : false ;
    const [loading , setloading] = useState(true);
    useEffect(()=>{
        if (slug){
            PostService.getPost(slug).then((post)=>{
                if (post) {
                    setpost(post);
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
    return loading? <div className=' min-h-screen bg-black text-white text-center text-5xl flex flex-col gap-10 items-center justify-center'> 
        <Helix
        size="100"
        speed="2.5"
        color="white" /> 
        <div>Loading...</div>
  </div>:post ? (<div className='py-8'>
        <Container>
            <div className='w-full flex justify-center mb-4 relative border rounded-xl p-2 '>
                {console.log("file id sent is ",post.featuredImage)}
                <img src={PostService.getFilePreview(post.featuredImage)} alt={post.title} className='rounded-xl' />
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
        </Container>
    </div>): (<div className='bg-black text-white text-center text-5xl'>Not Post Found.... </div>)
}

export default Post
