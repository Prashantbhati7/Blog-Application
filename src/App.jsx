import { BrowserRouter,Routes,Route } from "react-router-dom"

import { Home,Login,SignUp,AllPosts,Post } from "./Pages"


import {HomeLayout,AuthLayout} from './Layouts'
import PostForm from './Component/PostForm/PostForm.jsx'
import EditPost from "./Pages/EditPost.jsx"

function App() {

   
  return (
    <>
      <BrowserRouter>
      <Routes>
       
        <Route element={<HomeLayout/>}>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/addpost" element={<PostForm/>}></Route>
        </Route>
        <Route  element={<AuthLayout authentication={false}/>}>
         <Route path="/login" element={<Login/>}> </Route>
         <Route path="/signup" element={<SignUp/>} />
         </Route>
         <Route authentication={true} element={<AuthLayout/>}> 
          <Route path="/all-posts" element={<AllPosts/>}> </Route>
          <Route path="/add-post" element={<PostForm/>} />
          <Route path="/edit-post/:slug" element={<EditPost/>}></Route>
          <Route path="/post/:slug" element={<Post/>} />
         </Route>
      </Routes>
      </BrowserRouter>
    </>
  ) 
}

export default App
