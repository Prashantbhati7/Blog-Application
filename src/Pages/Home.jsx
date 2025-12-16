import React, { useEffect, useState } from 'react'
import PostCard from '../Component/PostCard'
import { useSelector,useDispatch } from 'react-redux'
import PostService from '../appwrite/config'
import { Container} from '../Component'
import { Helix } from 'ldrs/react'
function Home() {
  const [posts, setposts] = useState([]);
  const [loading , setloading] = useState(true);
  useEffect(()=>{
    PostService.getAllPost().then((data)=>{
       if (data) {
        
        setposts(data.rows);
        
       }
    })
    setloading(false);
  },[])
  if (posts.length === 0 ){
    return (
      <div className='w-full py-8 mt-4 text-center'>
        <Container >
          <div className='flex flex-wrap '>
            <div className='p-2 w-full'>
              <h1 className='text-2xl text-amber-50 hover:text-green-500 font-bold'>No Posts ! </h1>
            </div>
          </div>
        </Container>
      </div>
    )
  }
  return loading?<div className=' min-h-screen bg-black text-white text-center text-5xl flex flex-col gap-10 items-center justify-center'> 
        <Helix
            size="100"
            speed="2.5"
            color="white" /> 
            <div>Loading...</div>
  </div> :(
    <div className='w-full py-8 '> 
      <Container>
         <div className='flex flex-wrap'>
           {posts.map((post,id)=>(
            <div key={id} className='p-2 w-1/4 '>
              {console.log(post)}
              <PostCard {...post}></PostCard>
            </div>)
           )}
         </div>
      </Container>
    </div>
  )
}

export default Home
