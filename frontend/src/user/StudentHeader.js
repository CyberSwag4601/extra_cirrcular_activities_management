import React from 'react';
import clglogo from  '../assets/clglogo.png'
import {Link} from 'react-router-dom'
function StudentHeader(){
    return(
      <>
        <div className='header'>
            <img src={clglogo} alt='logo' className="homepagelogo ms-5" />
            <p className="h1 pt-4" style={{color:'white'}}>ANDHRA POLYTECHNIC,KAKINADA</p>
            <div className="nav">
              <Link to={'/'} className='nav-item' >Home</Link>
              <Link to={'/StudentRegistration'} className='nav-item'>Signup</Link>
              <Link to={'/UserLogin'} className='nav-item'>Login</Link>
              <Link to={'/ConductedEvents'} className='nav-item'>Events</Link>
              <Link to={'/StudentAchievements'} className='nav-item'> Achievements</Link>
              <Link to={'/StudentPlacements'} className='nav-item'>Campus Placements</Link>
           </div>
         </div>
         
      </>
)}


export default StudentHeader;