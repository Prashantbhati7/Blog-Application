import React, { useState } from 'react'
import authServie from '../appwrite/auth'
import { login as authlogin,logout } from '../store/authSlice'
import {Button,Input,Select} from '../Component'
import { useDispatch } from 'react-redux';
import {useForm} from 'react-hook-form';
import { useNavigate ,Link} from 'react-router-dom';
function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {register,handleSubmit} = useForm();
    const [error,setError] = useState("");

    const login = async(data)=>{
        setError("");
        try {
            const session = await authServie.login(data);
            if (session){
                const userData = await authServie.getCurrentUser();
                if (userData){
                    dispatch(authlogin(userData));
                    navigate('/');
                }
            
            }
           
        } catch (error) {
            setError(error.message);
        }
    }


  return (
    <div className='flex h-full py-8 justify-center mt-5 items-center w-full'>
        <div className='mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10 '>
        <div className="mb-2 flex justify-center">
            <span className='inline-block w-full text-[#003d24] font-bold max-w-[100px] '>  VoidNotes </span>
        </div>
        <h2 className='text-center text-[#183a1d] font-bold text-2xl leading-tight'>Sign in to your account </h2>
        <p className='mt-2 text-center text-base text-[#183a1d] '>
        Don&apos;t have any account ?&nbsp; 
        <Link className='font-medium text-primary transition-all duration-200 hover:underline ' to='/signup'> sign Up  </Link> 
        </p>

        {error &&  <p className='text-center text-red-500  mt-8 '>{error}</p> }

        <form onSubmit={handleSubmit(login) } className='mt-8'>
            <div className="space-y-5">
                 <Input label='Email : ' placeholder="enter Your Email  " {...register("email",{required:true,validate:{matchPattern:(value)=>  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ||
                                                            "email must be valid"}})} />
                 
                    <Input label='password : ' placeholder="enter Your password  " {...register("password",{required:true})} />
                <Button type='submit' bgcolor='bg-blue-600' textcolor='text-black' className='transiton w-full delay-100 duration-200 ease-in-out active:scale-75 ' >Login</Button>
            </div>
        </form>

        </div>
    </div>
  )
}

export default Login
