import React, { useContext, useEffect, useState } from 'react'
import Add from './Add'
import Edit from './Edit'
import { deleteProjectAPI, userProjectAPI } from '../services/allAPI'
import { addProjectContext, editProjectContext } from '../contexts/ContextShare'
const View = () => {

  const {editProjectResponse,setEditProjectResponse}=useContext(editProjectContext)

  const {addProjectResponse,setAddProjectResponse}=useContext(addProjectContext)
  // to display user projects
  // 1.create state to store user projects
  const [userProjects,setUserProjects]=useState([])
  console.log(userProjects);

  useEffect(()=>{
    getUserProject()
  },[addProjectResponse,editProjectResponse])
  
  // 2.create a function for getting all user projects and call api inside that function store all user projects inside the state

  // 3.call that user project getting function using useEffect
  
const getUserProject=async()=>{
  const token=sessionStorage.getItem("token")
  if(token){
    const reqHeader={
      "Authorization":`Bearer ${token}`
    }
    try{
      const result=await userProjectAPI(reqHeader)
      console.log(result);
      if(result.status==200){
        setUserProjects(result.data)

      }
      
    }catch(err){
      console.log(err);
      
    }
  }
}


// display array in jsx


const removeProject=async(id)=>{
  const token=sessionStorage.getItem("token")
  if(token){
    const reqHeader={
      "Authorization":`Bearer ${token}`
    }
    try{
      const result=await deleteProjectAPI(id,reqHeader)
      if(result.status==200){
        getUserProject()
      }
  
    }catch(err){
      console.log(err);
      
    }
  }
}

  


  return (
    <>
    <div className='d-flex justify-content-between  mt-3'>
        <h2>All Projects</h2>
        <div> <Add/> </div>
    </div>
    <div className='mt-2'>
        {/* project */}
       {
        userProjects.length>0?
        userProjects?.map(project=>(
          <div key={project?._id} className='border rounded p-2 d-flex justify-content-between mb-3'>
            <h3>{project?.title}</h3>
            <div className='d-flex align-items-center'>
                <div> <Edit project={project}/></div>
                <button className='btn'> <a href={project?.github} target='_blank'> <i className='fa-brands fa-github'></i></a></button>
                <button onClick={()=>removeProject(project?._id)} className='btn'> <i className='fa-solid fa-trash text-danger'></i></button>

            </div>

        </div>
        ))
        :
        <div>You havent't uploaded any project yet....Add Your Projects</div>
        }

    </div>
    </>
  )
}

export default View