import React,{useCallback, useEffect, useState} from "react";

import {useForm} from 'react-hook-form'

import {Button,Input,Select,RTE} from '../index.js'

import PostService from "../../appwrite/config.js";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { Helix } from "ldrs/react";

function PostForm({post}) {
   
    const {register,handleSubmit,watch,setValue,control,getValues,formState:{errors}} = useForm({defaultValues:{title:post?.title|| '' , slug:post?.slog || '', content:post?.content || '', status: post?.status || 'active'}});
    const userData = useSelector((state)=>{
        
         return state.userdata
        });
    const navigate = useNavigate();
    const [loading , setloading] = useState(false);
    const submit = async (data)=>{
        setloading(true);
        if (post){
            const file = data.image[0]?PostService.uploadFile(data.image[0]):null;
            if (file){
                PostService.deletePost(post.featuredImage);
            }
            const dbpost = await PostService.updatePost(post.$id,{...data,featuredImage:file?file.$id:undefined});
            if (dbpost){
                navigate(`/post/${post.$id}`)
            }
            
        }
        else {        /// if there was not post means uploading not editiong 
            console.log(data);
            const file = await PostService.uploadFile(data?.image?.[0]);
            
            if (file){
               const post = await PostService.createPost({...data,featuredImage:file.$id ,userid:userData.$id});
               if (post){
                navigate(`/post/${post.$id}`)
               }
            }
        }
        setloading(false);
    }

    const slugTransform = useCallback((value)=>{
        if (value && typeof(value)==='string'){
            const slug = value.toLowerCase().replace(/ /g,'-')
            setValue('slug',slug)
            return slug
            // return value.trim().toLowerCase()
            // .replace(/^[a-zA-Z\d]/g,'-')
            // .replace(/\s/g,'-')

            return '';
        }
    })
    useEffect(()=>{
        const subscription = watch((value,{name})=>{
            if (name==='title'){
                setValue('slug',slugTransform(value.title,{shouldValidate:true}));
            }
        })
        return ()=> {
            subscription.unsubscribe();         // for optimization (memory management )
        }
    },[watch,slugTransform,setValue]);
  return loading?<div className=' min-h-screen bg-black text-white text-center text-5xl flex flex-col gap-10 items-center justify-center'> 
        <Helix
            size="100"
            speed="2.5"
            color="white" /> 
            <div>Loading...</div>
  </div>:(
   <form className="flex flex-wrap" onSubmit={handleSubmit(submit)}>
    <div className="w-2/3 px-2">
        <Input label='Title: ' placeholder='Title' className='mb-4' {...register("title",{required:"title is required !"})}></Input>
        {errors.title && <div>{errors.title?.message || "email is invalid check it ! "}</div>}
        <Input label='Slug: ' placeholder='Slug' className='mb-4' {...register("slug",{required:true})} onInput={(e)=>{setValue("slug",slugTransform(e.currentTarget.value),{shouldValidate:true})}}></Input>
        <RTE label="Content: " name="content" control={control} defaltValue={getValues("content")}> </RTE>
    </div>
    <div className="w-1/3 px-2">
        <Input label='Featured Image : ' type = "file" className="mb-4" accept='image/png image/pdf  image/jpg, image/jpeg , image/gif' {...register("image",{required:post?false:"image is required !"})}></Input>
        {errors.image && <div>{errors.image.message || "image is required !"}</div> }
        {post && (<div className="w-full mb-4">
            <img src={PostService.getFilePreview(post.featuredImage)} alt={post.title} className="rounded-lg"/>
        </div>)} 
        <Select options={['active','inactive']} label='Status' className='mb-4' {...register("status",{required:true})} />

        <Button type="submit" bgcolor={post ? 'bg-green-500' : undefined} className="w-full " >{post?'update':'submit'}</Button>
    </div>
   </form>
  )
}

export default PostForm
