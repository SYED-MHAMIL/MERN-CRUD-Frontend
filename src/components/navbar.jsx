"use client"
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logOutUser } from '../lib/feature/userSlice'
import { setCookie } from 'cookies-next'
import { useRouter } from 'next/navigation'


const NavBar = () => {

  const router=useRouter()


const logOut=()=>{
   useDispatch(logOutUser())
   setCookie('token',null)
   router.push('/')
}


  return (
    <nav className="bg-white border-gray-200 ">
    <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
    <h1 className="mb-4 text-xl font-extrabold text-gray-900 lg:text-3xl">
    <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400 block lg:inline">
      Saylani 
    </span>{" "}
    beneficiary system
  </h1>
      <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
        <button
          type="button"
          className="text-white bg-red-500 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2 text-center"
        onClick={logOut}>
         Log out  
        </button>
      </div>
   
    </div>
  </nav>
  
  )
}

export default NavBar