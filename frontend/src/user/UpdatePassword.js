import React, { useState } from 'react';

import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const UpdatePassword = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    password: '',
    conformpassword: '',
  });
  const { password, conformpassword } = data;

  const changeHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const email = localStorage.getItem('email');

  const submitHandler = async (e) => {
    e.preventDefault();

    if (password.length < 8 || password.length > 12) {
      alert('Password must have 8 to 12 characters');
    } else if (password === conformpassword) {
      try {
        const response = await axios.put('http://localhost:3008/updatepassword', {
          password: data.password,
          email: email,
        });

        if (response.data.message === 'Updated password successfully') {
          alert('Updated password successfully');
          navigate('/');
        } else {
          alert('Password updation failed');
        }
      } catch (error) {
        console.error('Error updating password:', error);
        alert('An error occurred while updating the password');
      }
    } else {
      alert('Password and conform password do not match');
    }
  };

  return (
    <>
    
        <div className='LoginPage mt-5 px-5'>
          <form onSubmit={submitHandler}>
            <br />
           <p className='h3 mt-2 ms-5'>Update Password</p>
            <strong>Please enter your new password</strong><br/><br/>
            <label>Password</label><br/>
            <input
              type='password'
              name='password'
              value={password}
              onChange={changeHandler}
              required
            />
            <br />
            <label>Confirm Password</label><br/>
            <input
              type='password'
              name='conformpassword'
              value={conformpassword}
              onChange={changeHandler}
              required
            />
            <br />
            
           
              <button type='submit' className='btn btn-primary ms-5 mt-5'>
                UpdatePassword
              </button>
           
            <br />
          </form>
        </div>
     
    </>
  );
};

export default UpdatePassword;