import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import StudentHeader from './StudentHeader';

const Validateotp = () => {
  const navigate = useNavigate();
  const otpInputs = useRef([]);


  const submithandler = (e) => {
    e.preventDefault();
    const msg = otpInputs.current.map((input) => input.value).join(''); 
    const otp = localStorage.getItem('otp');
    console.log(msg);
  
    if (otp !== msg) {
      alert('Invalid OTP');
    } else {
      alert('otp is verified')
      navigate('/UpdatePassword');
    }
  };
  
  

  const [otp, setOtp] = useState({
    otp1: '',
    otp2: '',
    otp3: '',
    otp4: '',
  });

  const { otp1, otp2, otp3, otp4 } = otp;

  const changeHandler = (e, index) => {
    setOtp({ ...otp, [e.target.name]: e.target.value});
    if (e.target.value !== '' && index < otpInputs.current.length - 1) {
      otpInputs.current[index + 1].focus();
    }
  };

  return (
    <>   
       <div ><StudentHeader/></div>
        <div className='LoginPage mt-5 '>
          <form onSubmit={submithandler}>
            <p className='h3'>OTP</p>
            <p className='h6 ms-5 ps-5'>Please enter your OTP</p>
            <div className='otpdiv'>
              {[otp1, otp2, otp3, otp4].map((value, index) => (
                   <input
                   key={index}
                   type='text'
                   className='otpfield ms-5 mt-5'
                   name={`otp${index + 1}`}
                   value={value}
                   onChange={(e) => changeHandler(e, index)}
                   ref={(input) => (otpInputs.current[index] = input)}
                   maxLength={1}
                   required
                 />
                 
              ))}
            </div>
            <br />
            <center>
              <button className='btn btn-primary ms-5 mt-5'>Send OTP</button>
              <br />
            </center>
          </form>
        </div>
      
    </>
  );
};

export default Validateotp;