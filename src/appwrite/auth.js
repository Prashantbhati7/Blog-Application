import conf from "../conf/conf";

import { Client, Account, ID } from "appwrite";

export class AuthService{              // from documentation + some optimizations created class because we want to create user and use methods and not manual one user only 
    client = new Client();              // now even if you want to shift from appwite just modify this class function skeleton remain same 
    account;
    constructor(){                     // if i use manual account.create then 
        this.client.setEndpoint(conf.appwriteUrl).setProject(conf.appwriteProjectId);
        this.account = new Account(this.client);
        
    }
    async createAccount({email,password,name}){
        try{
            const userAccount = await this.account.create(ID.unique(),email,password,name);
            if (userAccount){
                // if account create make login 
                return this.login({email,password});
            }
            else return userAccount;
        }catch(err){
            console.log("error : ",err);
            throw err;
        }
    }
    async login({email,password}){
        try{
            const loginuser = await this.account.createEmailPasswordSession({
                email:email,password:password
            })
            return loginuser;
        }catch(error){
            throw error;
        }
    }
    async getCurrentUser(){
        try{
            // console.log("getting account from appwrite ");
            return await this.account.get();
        }catch(error){
            
            throw error;
        }
    }
    async logoutUser (){
        try{
            await this.account.deleteSessions();
        }catch(error){
            throw error;
        }
    }
}


const authServie = new AuthService();


export default authServie;
