import React, { useState } from 'react'
import authimgone from '../assets/authimgone.jpg'
import { Form,FloatingLabel,Spinner } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { loginAPI, registerAPI } from '../services/allAPI'


const Auth = ({insideRegister}) => {
  const [isLogin,setIsLogin]=useState(false)
  const navigate=useNavigate()
  const [userInput,setUserInput]=useState({
    username:"",email:"",password:""
  })
  console.log(userInput);

  const register=async(e)=>{
   e.preventDefault()
   if(userInput.username && userInput.password && userInput.email){
    // api call
    try{
      const result=await registerAPI(userInput)
      if(result.status==200){
        alert(`Welcome ${result.data?.username}, Please login to explore our projects!!!`)
        navigate("/login")
        setUserInput({username:"",email:"",password:""})
      }else{
        if(result.response.status==406){
          alert(result.response.data)
          setUserInput({username:"",email:"",password:""})
        }
      }
    }catch(err){
      console.log(err);
      
    }
   }else{
    alert("Please fill the form completely")
   }
  }


  const login=async(e)=>{
    e.preventDefault()
    if(userInput.password &&  userInput.email){
     // api call
     try{
       const result=await loginAPI(userInput)
       if(result.status==200){
        sessionStorage.setItem("user",JSON.stringify(result.data.user))
        sessionStorage.setItem("token",result.data.token)
        setIsLogin(true)
        setTimeout(()=>{
          navigate("/")
           setUserInput({username:"",email:"",password:""})
           setIsLogin(false)
          
        },2000)
        
        
       }else{
         if(result.response.status==404){
           alert(result.response.data)
          
         }
       }
     }catch(err){
       console.log(err);
       
     }
    }else{
     alert("Please fill the form completely")
    }
   }


  
  return (
    <div style={{minHeight:'100vh'}} className='d-flex justify-content-center align-items-center'>
      <div className='container w-75'>
        <div className='card shadow p-2'>
          <div className='row align-items-center'>
            <div className='col-lg-6'>
              <img className='img-fluid' src={authimgone} alt="" />
            </div>
            <div className='col-lg-6'>
              <h1 className='my-2'><i className='fa-brands fa-docker'></i>Project Fair</h1>
              <h5>Sign {insideRegister?'Up' :'In'} to your account</h5>
              <Form>
                {
                  insideRegister &&
                   <FloatingLabel controlId="floatingInputUsername" label="Username" className='mb-3'>
                   <Form.Control value={userInput.username} onChange={e=>setUserInput({...userInput,username:e.target.value})} type="text" placeholder="Username" />
                   </FloatingLabel>
                }
              <FloatingLabel
                  controlId="floatingInput"
                  label="Email address"
                  className="mb-3">
             <Form.Control value={userInput.email} onChange={e=>setUserInput({...userInput,email:e.target.value})} type="email" placeholder="Email Address" />
             </FloatingLabel>
             <FloatingLabel controlId="floatingPassword" label="Password" className='mb-2'>
             <Form.Control value={userInput.password} onChange={e=>setUserInput({...userInput,password:e.target.value})} type="password" placeholder="Password" />
             </FloatingLabel>

             {
              insideRegister ?
              <div className='mt-3'>
                <button onClick={register} className='btn btn-primary mb-2'>Register</button>
                <p>Existing User ? Please click here to <Link to={'/login'}>Login</Link></p>

              </div>
              :
              <div>
                <button onClick={login} className='btn btn-primary mb-2'>Login    { isLogin &&<Spinner animation="border" variant="light" />}</button>
                <p>New User ? Please click here to <Link to={'/register'}>Register</Link></p>
              </div>
             }

              </Form>

            </div>

          </div>

        </div>

      </div>
    </div>
  )
}

export default Auth