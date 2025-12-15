import React from 'react'
import { Controller } from 'react-hook-form';
import {Editor} from '@tinymce/tinymce-react';
function RTE({name,control,label,defaltValue=""}) {
  return (
    <div className='w-full '>
        {label && <label className='mb-1 pl-1 inline-block '>{label} </label>}
        <Controller name={name || "content"} control={control} 
        render={({field:{onChange}})=>
            (<Editor 
                init={{branding:false , 
                height:500 , 
                menubar:true ,
                 plugings:["image","advlist","autolink","list","link","image","charmap","preview","anchor","searchreplace","visualbloack","code","fullscreen","insertdatetime","media","table","help","wordcount","anchor"],
                toolbar:'undo redo | formatselect | bold italic backcolor | alignleft aligncenter alignright alignjustify | \
                bullist numlist outdent indent | removeformat | help',
                content_style:"body {font-family:Helvetica,Arial,sans-sarif;font-size:14px}"
                }} 
                initialValue='Enter Your Text here.... ' onEditorChange={onChange}/>
                )} /> 
    </div>
  )
}

export default RTE
