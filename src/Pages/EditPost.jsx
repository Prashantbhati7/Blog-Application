import React,{useEffect,useState} from 'react'
import PostService from '../appwrite/config'
import PostForm from '../Component/PostForm/PostForm';
import { Helix } from "ldrs/react";
import { Container } from '../Component';
import { useNavigate, useParams } from 'react-router-dom';


function EditPost() {
    const [post,setpost] = useState([]);
    const {slug} = useParams();
    const navigate = useNavigate();
    const [load , setload] = useState(true);
    useEffect(()=>{
        if (slug){
            PostService.getPost(slug).then((post)=>{
                    //console.log("post is ",post);
                    setpost(post);
                    setload(false);
            })
        } else {
            navigate('/')

        }
    },[slug,navigate]);

  return <>
  { load? <div className=' min-h-screen bg-black text-white text-center text-5xl flex flex-col gap-10 items-center justify-center'> 
        <Helix
            size="100"
            speed="2.5"
            color="white" /> 
            <div>Loading...</div>
  </div> : post?(<div className='py-8'>
    {/* <Container>
      
     <PostForm post={{...post}} ></PostForm> 
    </Container> */}
    
    <PostForm post={{...post}} />
  </div>):(<div className='text-white bg-black text-center text-5xl'> No Posts Available ... </div>) }
  </>
}

export default EditPost
