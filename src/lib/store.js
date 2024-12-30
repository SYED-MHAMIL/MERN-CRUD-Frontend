import { configureStore } from '@reduxjs/toolkit'
import  userReducer from "@/lib/feature/userSlice.js"
import   taskReducer from "@/lib/feature/taskSlice"
export const makeStore = () => {
  return configureStore({
    reducer: {
               user : userReducer,
               task :  taskReducer
    }
  })
}

