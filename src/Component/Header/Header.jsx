import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate,Link} from 'react-router-dom'
import {Container, LogoutBtn} from '../index'
import logo from './../../../assets/pi.png'

function Header() {
    const authstatus = useSelector((state)=>{
        //console.log(state.status);
        return state.status;
    })
    const navigate = useNavigate();
    const navItems = [
        {name:"home",to:"/",active:true},{name:"login",to:"/login",active:!authstatus},{name:"signUp",to:"/signup",active:!authstatus},{name:"All posts",to:'/all-posts',active:authstatus}
        ,{name:'Add post',to:'/add-post',active:authstatus}
    ]
  return (
    <div className='py-3 h-[60px] shadow-lg sticky top-0 w-full bg-[#13322b] shadow-[#143e21]'>
        <Container>
            <nav className='flex h-full'>
                <div className="logo text-shadow-lg"> 
                    <Link className='0 h-full g-3  flex '  to={'/'}> 
                    <span> <img className='object-fill  w-[40px] h-full' src={logo} alt="logo" /> </span>
                    <span className='my-auto transition delay-100 duration-300 text-shadow-sm hover:text-shadow-green-400 '>Feedlyx</span>
                      </Link> 
                </div>
                <ul className='flex justify-evenly ml-auto gap-3'> 
                     { navItems.map((item,idx)=>{
                         if (item.active) {
                            return <li key={idx}><button className='transition delay-75 px-2 cursor-pointer py-1 rounded-lg shadow-sm duration-300 ease-in-out active:scale-90 hover:shadow-red-500/50 'onClick={()=>{navigate(item.to)}} >{item.name}</button> </li>
                         }
                         return null;
                     })}
                     { authstatus? (<li> <LogoutBtn/> </li>) : null}
                </ul>
            </nav>
        </Container>
    </div>
  )
}

export default Header
