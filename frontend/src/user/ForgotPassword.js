import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import StudentHeader from './StudentHeader';
const ForgotPassword = () => {
    const [email,setEmail] = useState();
    const navigate = useNavigate();
    const submithandler = async (e) => {
      e.preventDefault();
      try {
        const Response = await axios.get(`http://localhost:3008/sendotp?email=${email}`);
        
        if (Response.data.message === 'user not found') {
          alert('User not found with this email ID');
        } else {
          console.log(Response);
          localStorage.setItem('email', email);
          localStorage.setItem('otp', Response.data.otp);
          alert('OTP has been sent to your email');
          navigate('/Validateotp');
        }
      } catch (error) {
        console.error('Error sending OTP:', error);
      }
    };
    
  return (
   
    <>
         
           <div><StudentHeader/></div>
           <div className='LoginPage mt-5 ps-5'>
            <form  onSubmit={submithandler} >
                    <br/>
                     <p className='h3 ms-5'>Forgot Password</p>
                     <strong>Please enter your email to reset your Password</strong><br/><br/>
                     <input 
                     type='email'
                     name='email'
                     value={email} 
                     placeholder='enter your email'
                     onChange={(e)=>{
                    setEmail(e.target.value)
                   }}  required/><br/><br/>
                  <button className='btn btn-primary ms-0'>SendOTP</button><br/>
              </form>
           </div>
    </>
)}

export default ForgotPassword;