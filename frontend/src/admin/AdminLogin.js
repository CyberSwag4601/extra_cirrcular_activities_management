import React,{useState} from 'react'
import { useNavigate} from 'react-router-dom'
import axios from 'axios'
const AdminLogin = () => {
  const navigate= useNavigate(); 
  const [data,setData ]=useState({
    admin_id:"",
    email:"",
    password:"",
    
  });
  const {admin_id,email,password}= data;
  const ChangeHandler = (e) =>{
    setData({...data,[e.target.name]:e.target.value})
  }
  const ClickHandler=async(e)=>{
    e.preventDefault();
    if(password.length<=6){
      alert('Please enter minimum of 6 characters')
    }
    else{
      try{
        const response = await axios.post('http://localhost:3008/AdminPanelAccess',data);
        if (response.data.message === 'invalid id'){
          alert('Invaid User Id')
        }
        else if (response.data.message === 'invalid email'){
          alert('Invalid User Credentials');

        }
        else if(response.data.message=== 'invalid password'){
          alert('Incorrect password');
        }
        else if(response.data.message === 'user found'){
          alert('Login Successfull')
          navigate ('/AdminPanel')
        }
      }
     catch(error){
      console.error('Error occured:',error)
     }  
    }
  } 
  return (
    <>
        <p className='h1 h1-loghead mt-5'>FACULTY LOGIN</p>
     <div className='login mt-5'>
      <form className='LoginPage ps-2' onSubmit={ClickHandler}>
      <p className="h3">Login</p>
      
      <div className='labels'>
       <label className='texts'>Admin ID:<br/><input type='text' className='inputs' name='admin_id' value={admin_id} onChange={ChangeHandler} required/></label>
     <label className='texts'>Email:<br/><input type='email' name='email' value={email} className='inputs' onChange={ChangeHandler} required/></label><br/>
      <label className='texts'>Password:<br/><input type='password' className='inputs' name='password' value={password} onChange={ChangeHandler} required/></label><br/>
      </div>
      <button className='btn btn-primary' tyep='submit' style={{color:'white',textDecoration:"none"}}>Submit</button>
     </form>
     </div>
    
    
    </>
  )
}

export default AdminLogin;