import { configureStore } from '@reduxjs/toolkit'
import  userReducer from "@/lib/feature/userSlice.js"

export const makeStore = () => {
  return configureStore({
    reducer: {
               user : userReducer,
    }
  })
}

