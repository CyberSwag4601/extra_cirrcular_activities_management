import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import StudentHeader from './StudentHeader';
const UserLogin = () => {
  const navigate=useNavigate();
  const [data,setData]= useState({
     pin_number:"",
     password:"",
  });
  const {pin_number,password}= data;
  const ChangeHandler =(e)=>{
    setData({...data,[e.target.name]:e.target.value,})
  }
  const SubmitHandler = async (e) => {
    e.preventDefault();
    console.log('SubmitHandler is called');
  
    try {
      const response = await axios.post('http://localhost:3008/participantlogin', data);
  
  
      if (response.data.message === 'user not found') {
        alert('User not found');
       
      } else if(response.data.message === 'password not matched'){
         alert('password not matched')
      }
      else if(response.data.message === 'user login successfull'){
        alert('User login Successfull');
        localStorage.setItem('pin_number',pin_number);
        navigate('/ListOngoingevents')
      }
    } catch (error) {
      console.log('Error occurred:', error);
    }
  };
  
  return (
   <>
     <div ><StudentHeader/></div>
     
       <div className='login'>
       <form className='LoginPage mt-5' onSubmit={SubmitHandler}>
        <p className="h3">Login</p>
         <Link to={'/AdminLogin'} className='links'>Teacher Login</Link>
       <div className='labels'>
        <label className='texts'>Pin Number:<br/><input type='text' className='inputs' value={pin_number} name='pin_number' onChange={ChangeHandler} required/></label><br/>
        <label className='texts'>Password:<br/><input type='password' className='inputs' value={password} name='password' onChange={ChangeHandler} required/></label><br/>
        
        <Link to={'/ForgotPassword'} className='frgtpswd'>Forgot Password?</Link>
        </div>
        <input type='submit' className='btn btn-primary btn-login' style={{ color: 'white', textDecoration: "none" }}/>
        <p className='h6 h6-login mt-3'>Don't have an account ? <Link to={'/StudentRegistration'}>SignUp.</Link></p>
        
      </form>
       </div>
      
   </>
  )
}

export default UserLogin;