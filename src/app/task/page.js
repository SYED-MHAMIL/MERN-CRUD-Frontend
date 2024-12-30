"use client"
import { addTask, deleteTask, editTasks, fetchTasks } from '@/lib/feature/taskSlice'
import { logOutUser } from '@/lib/feature/userSlice'
import { setCookie } from 'cookies-next'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import DelButtun from '@/components/buttun'
   
export default function Taskspage() {
  const  [taskState,settaskState]=useState("")
  const  [isEdit,setisEdit]=useState(false);
  const  [isID,setIsID]=useState(null);
     const dispatch =  useDispatch();
     const router= useRouter()
   const  {task,error,loading,status}=useSelector(state=>state.task);

      useEffect(()=>{
           dispatch(fetchTasks())                 
     },[])

     
  return (   
     
  <>
<div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 py-10">
  {/* To-Do App Header */}
  <header className="w-full max-w-2xl bg-white shadow-md rounded-md p-5 mb-8 text-center">
    <h1 className="text-3xl font-bold text-gray-800">To-Do App</h1>
    <p className="text-gray-600">Manage your tasks efficiently</p>
  </header>

  {/* Input Section */}
  <div className="w-full max-w-2xl bg-white shadow-md rounded-md p-6 mb-6">
    <div className="flex flex-col sm:flex-row gap-4">
      <input
        onChange={(e) => settaskState(e.target.value)}
        value={taskState}
        className="flex-1 text-gray-800 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        type="text"
        placeholder="Enter your task"
      />
      <button
        className="bg-blue-600 text-white px-5 py-3 rounded-md hover:bg-blue-500 transition"
        onClick={() => {
          if (taskState.trim() === "") return alert("Task cannot be empty");
          dispatch(addTask(taskState));
          settaskState("");
        }}
      >
        Add Task
      </button>
    </div>
  </div>

  {/* Task List Section */}
  <div className="w-full max-w-2xl bg-white shadow-md rounded-md p-6">
    <h2 className="text-2xl font-semibold text-gray-800 mb-4">Tasks List</h2>
    {error && <p className="text-red-500 mb-3">{error}</p>}

    {loading ? (
      <div className="text-center">
        <h1 className="text-gray-600">Loading...</h1>
      </div>
    ) : task?.data?.length > 0 ? (
      <ul className="space-y-4">
        {task?.data?.map((data, i) => (
          <li
            key={i}
            className="flex justify-between items-center bg-gray-50 shadow-sm p-4 rounded-md"
          >
            <span className="text-gray-700">{data.task}</span>
            <div className="flex space-x-3">
             { isID !== data._id ?
             <button
                className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-400 transition"
                onClick={() => {
                  setIsID(data._id)
                    settaskState(data.task)
                }}
              >
                 edit
                             </button>
             :
              <button
                className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-400 transition"
                onClick={() => {
                  dispatch(editTasks({id : data._id,task: taskState}));
                  setIsID(null)
                settaskState("")
                }}
              >
                save
              </button> 
              } 
<div>

            <DelButtun id={data._id} />
</div>
           
            </div>
          </li>
        ))}
      </ul>
    ) : (
      <div className="text-center">
        <h1 className="text-gray-600">No tasks available!</h1>
      </div>
    )}
  </div>

  {/* Footer Section */}
  <footer className="w-1/4 mt-8 ">
    <button
      className="bg-red-500 text-white px-6 py-3 w-full  rounded-md hover:bg-red-400 transition"
      onClick={() => {
        dispatch(logOutUser());
        setCookie("token", null);
        router.push("/");
      }}
    >
      Logout
    </button>
  </footer>
</div>


  
  </>
    
  )
}
