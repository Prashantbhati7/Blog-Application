import React, { useEffect, useState } from 'react'
import {Header,Footer} from '../Component/index.js'
import {useDispatch} from 'react-redux'
import {Outlet} from 'react-router-dom'
import authServie from '../appwrite/auth.js'
import { Helix } from 'ldrs/react'
import 'ldrs/react/Helix.css'
import {login,logout} from '../store/authSlice.js'


function HomeLayout() {
    const [loading,setloading] = useState(true);
    const dispatch = useDispatch();
    useEffect(()=>{
        console.log("loading = true");
        authServie.getCurrentUser().then((userdata)=>{
            if (userdata){
                console.log("got userdata as ",userdata);
                dispatch(login(userdata));
            }else {
                console.log("didn't got any user ");
                dispatch(logout());
            }
        }).finally(()=>{
            setloading(false);
        })
    },[])
  return !loading? (<div className='min-h-screen text-white bg-[#000000]'>
        <Header></Header>
        <Outlet/>
        <Footer/>
        
    </div>):(<div className=' min-h-screen bg-black text-white text-center text-5xl flex flex-col gap-10 items-center justify-center'> 
        <Helix
  size="100"
  speed="2.5"
  color="white" /> 
  <div>Loading...</div>
  </div>)
}

export default HomeLayout
