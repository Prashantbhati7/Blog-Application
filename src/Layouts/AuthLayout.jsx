import React, { useEffect, useState } from 'react'
import { Header } from '../Component'
import { Outlet, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

function AuthLayout({children,authentication = true}) {
  const [loader , setloader] = useState(false);
  const authStatus = useSelector((state)=>state.status);
  const navigate = useNavigate();
  useEffect(()=>{
    if (authentication && authStatus!==authentication ){
      navigate('/login') 
    }
    else if (!authentication && authStatus!==authentication){
      navigate('/');
    }
    setloader(false);
  },[authStatus,authentication,navigate]);
  return (
    <>
    {!loader?
     <div className=' min-h-screen bg-black text-white'>
        <Header/>
         <Outlet/>
    </div>:(<div className='min-h-screen bg-black text-white text-5xl text-center'>Loading...</div>)
    }
    </>
  )
}

export default AuthLayout
