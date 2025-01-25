"use client"
import axios from "axios";
import { ApiRoutes } from "../constant/url";
import { useState } from "react";
import { setCookie } from "cookies-next";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { loginUser } from "@/lib/feature/userSlice";
import Link from "next/link";






export default function Home() {
  const [loding,setLoading]=useState(false);
  const [msg,setMsg]=useState('');
  const [error,setError]=useState("");
  const dispatch = useDispatch();
  const router = useRouter()

  const signup=async(e)=>{
    e.preventDefault()
    
        const obj={
             name: e.target[0].value,
             email : e.target[1].value,
             password : e.target[2].value
        }
       setLoading(true)
      await  axios.post(ApiRoutes.signup, obj).then((res) => {
          console.log("res.data=>", res.data)
          console.log("token=>", res.data?.data?.token)
          setCookie('token', res?.data?.data?.token)
          dispatch(loginUser(res.data?.data?.user))
          setLoading(false)
          setMsg(res?.data?.msg)
          // router.push("/task")
        })
          .catch((err) => {

            setLoading(false)
            
            setError(err.response?.data?.msg)
     
    
          })
  
      
     
  }



  return (
     
     <>
  <section className="bg-gray-50 min-h-screen flex items-center justify-center">
  <div className="px-6 py-8 w-full max-w-md bg-white rounded-lg shadow-md border border-gray-200">
  
   

    {/* Form Container */}
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800 text-center">
        Welcome Back
      </h1>
      <p className="text-gray-600 text-center">
        Sign up to your account to continue
      </p>

      <form className="space-y-4" action="#" onSubmit={signup}>
        {/* Email Input */}
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
           Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            className="block w-full p-3 border border-gray-300 rounded-lg bg-gray-100 text-gray-800 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Name"
            required
          />
        </div>
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Email Address
          </label>
          <input
            type="email"
            name="email"
            id="email"
            className="block w-full p-3 border border-gray-300 rounded-lg bg-gray-100 text-gray-800 focus:ring-blue-500 focus:border-blue-500"
            placeholder="name@example.com"
            required
          />
        </div>

        {/* Password Input */}
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            className="block w-full p-3 border border-gray-300 rounded-lg bg-gray-100 text-gray-800 focus:ring-blue-500 focus:border-blue-500"
            placeholder="••••••••"
            required
          />
        </div>

        {/* Remember Me and Forgot Password */}
        <div className="flex items-center justify-between">
          <label className="flex items-center">
            <input
              type="checkbox"
              id="remember"
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <span className="ml-2 text-sm text-gray-700">Remember me</span>
          </label>
          <a
            href="#"
            className="text-sm text-blue-600 hover:underline"
          >
            Forgot password?
          </a>
        </div>

        {/* Login Button */}
        {error && <p className="text-red-500 text-center">{error}</p>}
        {msg && <p className="text-green-5  00 text-center">{msg}</p>}
        <button
          type="submit"
          className="w-full py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 transition"
        >
          {loding ? "Loading..." : "Sign up"}
        </button>
      </form>

      {/* Footer Section */}
      <p className="text-center text-sm text-gray-600">
        Don’t have an account yet?{" "}
        <Link
          href="/"
          className="text-blue-600 font-medium hover:underline"
        >
          Sign in
        </Link>
      </p>
    </div>
  </div>
</section>


     
     </>


  )
}
