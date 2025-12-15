import { createSlice } from "@reduxjs/toolkit";


const initial   = {
    allposts:[],
}

const postSlice = createSlice({
    name:"posts",
    initialState,
    reducers:{
        createPost : (state,payload)=>{
            state.allposts = payload;
        },
        updatePost:(state,payload)=>{
           for (let i = 0 ; i < allposts.length ;i++){
                if (allposts[i].$id == payload.$id){
                    allposts[i] = payload;
                }
           }

        },
        deletePost:(state,payload)=>{
            
           
        }

    }
})