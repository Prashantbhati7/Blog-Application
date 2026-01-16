import React, { useEffect, useState } from 'react'

import PostService from '../appwrite/config';

import { Link,useNavigate } from 'react-router-dom';



function PostCard({$id,title,featuredImage,username}) {
    // useEffect(()=>{
    //     PostService.getAllPost().then((posts)=>{
    //         console.log(posts)
    //     }).finally(()=>{
    //         setloading(false);
    //     })
    // },[])
  return (
    <Link to={`/post/${$id}`}>
        <div className="w-full bg-gray-100 h-100 rounded-xl p-4 ">
            <div className='w-full justify-center mb-4'>
              
               <img src={`${PostService.getFilePreview(featuredImage)}`}  alt={title}  className='rounded-xl h-70 mx-auto  object-cover w-80'/> 

            </div>
            <h2 className='text-green-800 text-xl font-bold line-clamp-1'>{title}</h2>
            <div className="by text-black italic text-sm  text-right relative top-5">author:-{username}</div>
        </div>
    </Link>
  )
}

export default PostCard;
