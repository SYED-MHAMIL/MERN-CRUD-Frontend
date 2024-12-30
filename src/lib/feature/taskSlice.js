import { ApiRoutes } from '@/app/constant/url'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { getCookie } from 'cookies-next'
   

export const fetchTasks = createAsyncThunk(
    'tasks/fetchTasks',
    async () => {
      const token= getCookie("token") 
      const response = await axios.get(ApiRoutes.getTasks,{
          headers:{
             Authorization : `Bearer ${token}`
          }
      })
       console.log(response.data);
       
      return response.data;
    },
  )

export const addTask =createAsyncThunk(
  'addtasks/fetchTasks',
  async (task) => {
    const token= getCookie("token") 
    const response = await axios.post(ApiRoutes.postTasks,{task},{
        headers:{
           Authorization : `Bearer ${token}`
        }
    })
     console.log(response.data);
     
    return response.data;
  },
)

export const deleteTask =createAsyncThunk(
  'deletetasks/fetchTasks',
  async (id) => {
    const token= getCookie("token") 
    const response = await axios.delete(`${ApiRoutes.getTasks}/${id}`,{
        headers:{
           Authorization : `Bearer ${token}`
        }
    })
     console.log('deleted toddo', response.data);
     
    return response.data;
  },
)

export const editTasks =createAsyncThunk(
  'editTasks/fetcheditTasks',
  async ({id,task}) => {
    const token= getCookie("token") 
    const response = await axios.put(`${ApiRoutes.getTasks}/${id}`,{task},{
        headers:{
           Authorization : `Bearer ${token}`
        }
    })
     console.log('edited tdod toddo', response.data);
     
    return response.data;
  },
)

   const initialState={
       task : [] ,
       loading : true ,
       status : "Pending",   
        error: null
   }

 const taskSlice =createSlice({
   name : "task",
   initialState,
   extraReducers: (builder) => {
    builder
    .addCase(fetchTasks.pending, (state, action) => {  
      state.status= "pending"
    
  })
  .addCase(addTask.pending, (state, action) => {  
    state.status= "pending"
  
})
.addCase(deleteTask.pending, (state, action) => {  
  state.status= "pending"

})
.addCase(editTasks.pending, (state, action) => {  
  state.status= "pending"

})
      .addCase(fetchTasks.fulfilled, (state, action) => {
         state.status = 'succeeded'
         state.loading = false
         console.log( "state=>",state.task , "payload=>", action.payload );
         
         state.task= action.payload
      })
      .addCase(addTask.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.loading = false
         console.log("add task payload ==>>>",action.payload.data);
         console.log("statetask payload ==>>>",state.task.data);
        state?.task?.data.push(action.payload.data)
     })
     .addCase(deleteTask.fulfilled, (state, action) => {
      state.status = 'succeeded'
      state.loading = false
      state.task=action.payload
     
   })
   .addCase(editTasks.fulfilled, (state, action) => {
    state.status = 'succeeded'
    state.loading = false
     console.log("eadit", action.payload);
     
     state.task.data = state.task.data.map((data) => {
      if (data._id === action.payload.data._id) {
        return { ...data, task: action.payload?.data?.task }; // Return a new object with the updated task
      }
      return data; // Return the unmodified object
    });
 })
      .addCase(fetchTasks.rejected, (state, action) => {
          state.status = 'failed'
                state.error = action.error.message ?? 'Unknown Error'
      })
      .addCase(addTask.rejected, (state, action) => {
        state.status = 'failed'
              state.error = action.error.message ?? 'Unknown Error'
    })
    .addCase(deleteTask.rejected, (state, action) => {
      state.status = 'failed'
            state.error = action.error.message ?? 'Unknown Error'
  })
  .addCase(editTasks.rejected, (state, action) => {
    state.status = 'failed'
          state.error = action.error.message ?? 'Unknown Error'
})
  },

   
  
   
   

 })


export default taskSlice.reducer   


