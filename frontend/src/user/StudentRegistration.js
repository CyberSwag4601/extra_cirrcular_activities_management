import React,{useState} from 'react'
import {useNavigate,Link} from 'react-router-dom'
import axios from 'axios'
import StudentHeader from './StudentHeader';
const StudentRegistration = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: "",
    pin_number: "",
    department: "",
    phone_number: "",
    gender: "",
    age: "",
    sports:"",
    competition:"",
    cultural_activities:"",
    music:"",
    achievements: "",
    email: "",
    password: "",
    confirm_password: "",
  });
  const [showSportsField, setShowSportsField] = useState(false);
  const [showCulturalField, setShowCulturalField] = useState(false);
  const [showIndoorField, setShowIndoorField] = useState(false);
  const [showMusicField, setShowMusicField] = useState(false);
  const {
    name, pin_number, department, phone_number, gender, age,
    achievements, email, password, confirm_password,
    sports, competition, cultural_activities, music
  }=data;


  const ChangeHandler=(e)=>{
    setData({...data,[e.target.name]:e.target.value})
  }
  

  const SubmitHandler=async(e)=>{
    e.preventDefault();
    console.log(data,"data")

    try{
     if (phone_number.length!== 10){
      alert('Please enter 10 digit phone number')
    }

    else if(password !== confirm_password){
      alert('Password not matched')
    }
    else {
      
        const response = await axios.post('http://localhost:3008/StudentRegistration',data);
        if (response.data.message === 'user already exists'){
          alert('User already exists ,please login');

        }
        else if(response.data.message=== 'user registered successfully'){
          alert('Register Successful');
          navigate ('/UserLogin')
        }
      }
    }
     catch(error){
      console.error('Error occured:',error)
     }  
    }
  
    const handleCheckboxChange = (fieldName) => {
      switch (fieldName) {
          case 'sports':
              setShowSportsField(!showSportsField);
              break;
          case 'cultural_activities':
              setShowCulturalField(!showCulturalField);
              break;
          case 'competition':
              setShowIndoorField(!showIndoorField);
              break;
          case 'music':
              setShowMusicField(!showMusicField);
              break;
          default:
              break;
              
      }
  
  };
  return (
    <>
          <div>
            <StudentHeader/>
          </div>
          <div className='form' >
            <form className='register mt-3' onSubmit={SubmitHandler}>
             <p className='h3'>SIGN UP</p>
             <div className='inputfields'>
             <div className='leftlabels'>
              <label>Name:<br/>
              <input type='text' value={name} name='name' onChange={ChangeHandler} required/></label><br/>
                <label>Age:<br/><input type='text' name='age' value={age} onChange={ChangeHandler} required/></label><br/>
                <label>Email:<br/><input type='email' name='email' value={email} onChange={ChangeHandler} required/></label><br/>
                </div>
                <div className='middlelabels'>
                <label>Phone Number:<br/><input type='text' name='phone_number' value={phone_number} onChange={ChangeHandler} required/></label><br/>
                <label>Pin number:<br/><input type='text' name='pin_number' value={pin_number} onChange={ChangeHandler} required/></label><br/>
                <label>Password:<br/>
                <input type='password'   name='password'  value={password}  onChange={ChangeHandler}  required /></label>
                </div>
              <div className='rightlabels'>
              <label>Department<br/>
              <select value={department}  name='department' onChange={ChangeHandler} className='selectinputs' required>
                <option></option>
                <option value='cme'>DCME</option>
                <option value='eee'>DEEE</option>
                <option value='ece'>DECE</option>
                <option value='civ'>DCIV</option>
                <option value='arch'>DARC</option>
                <option value='Auto'>DAA</option>
                <option value='mech'>DMEC</option></select></label><br/>
                <label>Gender:<br/><select value={gender}  name='gender' onChange={ChangeHandler} className='selectinputs' required>
                <option></option>
                <option value='female'>FEMALE</option>
                <option value='male'>MALE</option></select> </label><br/>
                <label>Confirm Password:<br/><input type='password' name='confirm_password' value={confirm_password} onChange={ChangeHandler} required/></label>
              </div></div>
              <label className='previous_achievements'>
                <label>Select your intrests:<br/>
                <input type='checkbox'  onChange={() => handleCheckboxChange('sports')} /><strong>Sports</strong>
                {showSportsField&&(<textarea name="sports" placeholder='Enter your sports intrests' cols="68" rows="1" value={sports} onChange={ChangeHandler}></textarea>
                )}<br/>
                <input type='checkbox'  onChange={() => handleCheckboxChange('competition')} />
                <strong>Indoor Competitions</strong>
                {showCulturalField&&(
                <textarea name="competition" placeholder='Enter Your intrests' cols="54" rows="1" value={competition} onChange={ChangeHandler}></textarea>)}<br/>
                <input type='checkbox'  onChange={() => handleCheckboxChange('cultural_activities')} />
                <strong>Cultural Activities</strong>
                {showIndoorField&&(<textarea name="cultural_activities" placeholder='Enter Your intrests in cultural activities'  cols="57" rows="1" value={cultural_activities} onChange={ChangeHandler}></textarea>)}<br/>
                <input type='checkbox'  onChange={() => handleCheckboxChange('music')} />
                 <strong>Musical Instruments</strong>
                {showMusicField&&(<textarea name="music" placeholder='Enter Your intrests in cultural activities' cols="54" rows="1" value={music} onChange={ChangeHandler}></textarea>)}<br/>
                Previous Achievements:<br/>
                <textarea name="achievements" placeholder='Enter Your Previous Achievements' id="" cols="75" rows="2" value={achievements} onChange={ChangeHandler}></textarea></label>
                </label>
              <input type='submit' className='btn btn-primary' value='Register'   style={{color:'white',textDecoration:"none"}}/>
              <p className='h6 h6-signup'>Already have an account ? <Link to={'/UserLogin'}>Login.</Link></p>
            </form>
         </div>
    </>
    
  )
}

export default StudentRegistration;