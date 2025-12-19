import conf from "../conf/conf";

import { Client,TablesDB,Storage,Query, ID } from "appwrite";


export class Service{
    client= new Client();
    tableDB;
    bucket;
    constructor(){
        this.client.setEndpoint(conf.appwriteUrl).setProject(conf.appwriteProjectId);
        this.tableDB = new TablesDB(this.client);
        this.bucket = new Storage(this.client);
    }

    async createPost({title,slug,content,featuredImage,status,userid,username}){
        try{
           
            return await this.tableDB.createRow(conf.appwriteDBid,conf.appwriteCollectionId,slug,  // i am taking slug as rowid 
                {title,content,featuredImage,status,userid,username});
        }catch(error){
            console.log('error: ',error);
        }
    }
     async createComment({slug,username,userid,content}){
        try{
            
            return await this.tableDB.createRow(conf.appwriteDBid,conf.appwriteCommenttable,ID.unique(),{postid:slug,username:username,userid:userid,content:content})
        }catch(error){
            console.log("error in comment creation ",error)
            return false
        }
    }
    async updatePost(slug,{title,content,featuredImage,status}){    // No need of userid as will give option of update to owner only 
        try{
            
            return await this.tableDB.updateRow(conf.appwriteDBid,conf.appwriteCollectionId,slug,{title,content,featuredImage,status});
        }catch(error){
            console.log("error",error);
        }
    }
     async deleteComment(commentid){
        try{
            await this.tableDB.deleteRow(conf.appwriteDBid,conf.appwriteCommenttable,commentid);
            return true;
        }catch(error){
            console.log("error : ",error);
            return false;
        }
    }
     async getPostComment(slug){
        try{
             const allcomment =  await this.tableDB.listRows(conf.appwriteDBid,conf.appwriteCommenttable);
             
             const postcomment = Array.from(allcomment.rows).filter((comment)=>(comment.postid==slug));
             
             return postcomment;

        }catch(error){
            console.log("error",error);
            return false
        }
    }
    async deletePost(slug){
        try{    
            this.tableDB.deleteRow(conf.appwriteDBid,conf.appwriteCollectionId,slug);
            return true;
        }catch(error){
            console.log("error : ",error);
            return false;
        }
    }
    async getPost(slug){
        try{
            return await this.tableDB.getRow(conf.appwriteDBid,conf.appwriteCollectionId,slug);
        }catch(error){
            console.log("error ",error);
            return false;
        }
    }
    async getAllPost(queries = [Query.equal('status','active')]){
        try{
            
            return await this.tableDB.listRows(conf.appwriteDBid,conf.appwriteCollectionId,queries);   // i want post whose status is active 
        }
        catch(error){
            console.log("error in getting posts : ",error);
            return false;
        }
    }
    async uploadFile(file){
        try{
            return await this.bucket.createFile(conf.appwriteBucketId,ID.unique(),file);
        }catch(error){
            console.log("error " , error);
            return false;
        }
    }
    async deleteFile(fileid){
        try{
            return await this.bucket.deleteFile(conf.appwriteBucketId,fileid);
        }catch(error){
            console.log("error : ",error);
            return false;   
        }
    }
    getFilePreview(fileId){
       
        return this.bucket.getFileView(conf.appwriteBucketId,fileId)
    }
};



const PostService = new Service();
export default PostService;