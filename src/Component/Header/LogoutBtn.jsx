import React from 'react'
import { logout } from '../../store/authSlice'
import { useDispatch } from 'react-redux'
import authServie from '../../appwrite/auth'
function LogoutBtn() {
    const dispatch = useDispatch();
    const handlelogout = ()=>{
        authServie.logoutUser().then(()=>{
            dispatch(logout());
        })  
    }
  return (
    <div>
      <button onClick={handlelogout} className='bg-[#08003a] py-1  text-shadow-red-400  shadow-sm rounded-lg px-4 transition delay-100 duration-300 ease-in-out active:scale-50 hover:shadow-red-500/50 ' >Logout</button>
    </div>
  )
}

export default LogoutBtn
