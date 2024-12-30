

export const BASE_URL=`http://localhost:4000/`
         

export const ApiRoutes={
           signup:BASE_URL+"auth/register" ,
           login : BASE_URL+"auth/login",
           getTasks:BASE_URL+"tasks",
           postTasks:BASE_URL+"tasks"
}