import { createSlice } from '@reduxjs/toolkit'
  
   const initialState={
       isLogin : false ,
       user : null
   }

 const  userSlice =  createSlice({
   name : "user" ,
   initialState,
   reducers : {
    logOutUser:(state,payload)=>{
        state.isLogin = false;
        state.user  = null

    },
    loginUser:(state,payload)=>{
          state.isLogin= true ;
          state.user= payload.action;   
    }
   } 
   
   

 })

export const {loginUser,logOutUser}   = userSlice.actions
export default userSlice.reducer   


