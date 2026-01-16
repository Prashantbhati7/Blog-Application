import PostService from "../appwrite/config";
import { PostCard ,Container} from "../Component";
import React, { useEffect, useState } from 'react'
import { Helix } from "ldrs/react";

function AllPosts() {
    const [loading , setloading] = useState(true);
    const [allposts, setallposts] = useState([]);
    useEffect(()=>{
        PostService.getAllPost().then((data)=>{
            
            setallposts(data.rows);
            
        }).finally(()=>{
           
            setloading(false);
        })
    },[]);
  return !loading?(
    <div className="w-full py-8 ">
        <Container>
            <div className="flex flex-wrap ">
            {allposts.map(p=>
                (<div className="p-2 w-1/1 sm:w-1/2 md:w-1/2 lg:w-1/4" key={p.$id}>
                    
                    <PostCard {...p} />
                </div>
                )
            )}
            </div>
        </Container>
    </div>
  ):(<div className=' min-h-screen bg-black text-white text-center text-5xl flex flex-col gap-10 items-center justify-center'> 
        <Helix
  size="100"
  speed="2.5"
  color="white" /> 
  <div>Loading...</div>
  </div>)
}

export default AllPosts
