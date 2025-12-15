import React, { useState } from 'react'

import authServie from '../appwrite/auth'
import { useDispatch } from 'react-redux'
import { login } from '../store/authSlice'
import { useForm } from 'react-hook-form'
import { useNavigate,Link } from 'react-router-dom'
import { Input,Button } from '../Component'

function SignUp() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error,setError] = useState("");
  const {register,handleSubmit} = useForm();


  const signup = async(data)=>{
    setError("");
    try{
      const session = await authServie.createAccount(data);
      if (session){
          const userData = await authServie.getCurrentUser();
          if (userData){
            dispatch(login(userData));
             navigate('/');
          }
      }
    }catch(error){
       console.log("error in sign up : " , error);
       setError(error.message);
    }
  }
  return (
    <div className='flex py-8 justify-center mt-5 items-center'>
        <div className='mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10 '> 
            <div className='mb-2 flex justify-center'> 
              <span className='inline-block text-[#003d24] w-full max-w-[100px]'>VoidNotes </span>
            </div>
            <h2 className='text-center text-[#183a1d] font-bold text-2xl leading-tight'> Create New Account </h2>
            <p className='mt-2 text-center text-base text-[#183a1d] '>
            Already have an account ?&nbsp; 
            <Link className='font-medium text-primary transition-all duration-200 hover:underline ' to='/login'>  Log In </Link> 
            </p>

            {error &&  <p className='text-center text-red-500  mt-8 '>{error}</p> }

            <form onSubmit={handleSubmit(signup)} className='mt-8'>
              <div className='space-y-5'>
                  <Input label='Name: ' placeholder="enter Your Name " {...register("name",{required:true})} />
                
                  <Input label='Email : ' placeholder="enter Your Email  " {...register("email",{required:true,validate:{matchPattern:(value)=>  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ||
                                           "email must be valid"}})} />

                   <Input label='password : ' placeholder="enter Your password  " {...register("password",{required:true})} />

                    <div className='flex justify-center '>
                    <Button type='submit' bgcolor='bg-blue-600' textcolor='text-black' className='transiton delay-100 duration-200 ease-in-out active:scale-75 ' >Sign Up</Button>
                    </div>
              </div>
            </form>



        </div>
    </div>
  )
}

export default SignUp
