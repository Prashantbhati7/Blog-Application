import React, { useState } from 'react'
import { logout } from '../../store/authSlice'
import { useDispatch } from 'react-redux'
import authServie from '../../appwrite/auth'
function LogoutBtn() {
  const [loading,setloading] = useState(false);
  const dispatch = useDispatch();
  const handlelogout = ()=>{
      setloading(true);
      authServie.logoutUser().then(()=>{
            dispatch(logout());
      })  
      setloading(false);
  }
  return loading?<div className=' min-h-screen bg-black text-white text-center text-5xl flex flex-col gap-10 items-center justify-center'> 
        <Helix
            size="100"
            speed="2.5"
            color="white" /> 
            <div>Loading...</div>
  </div>:(
    <div>
      <button onClick={handlelogout} className='bg-[#08003a] py-1 cursor-pointer  text-shadow-red-400  shadow-sm rounded-lg px-4 transition delay-100 duration-300 ease-in-out active:scale-50 hover:shadow-red-500/50 ' >Logout</button>
    </div>
  )
}

export default LogoutBtn
