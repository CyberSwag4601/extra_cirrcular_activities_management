import React from 'react'
import clglogo from '../assets/clglogo.png'
import {Link} from 'react-router-dom'
const AdminHeader = () => {
  return (
    
    <>
          <div className='header' >
            <img src={clglogo} alt='logo' className="homepagelogo" />
            <p className='h1 pt-4' style={{color:'white'}}>ANDHRA POLYTECHNIC,KAKINADA</p>
             <div className="nav">
             <Link to={'/'} className='nav-item'>Home</Link>
             <Link to={'/AdminLogin'} className='nav-item'>Login</Link>
             <Link to={'/AdminPanel'} className='nav-item'>Admin Page</Link>
             <Link to={'/EventTable'} className='nav-item'>College Events</Link>
             <Link to={'/AchievementTable'} className='nav-item'>Achievements</Link>
             <Link to={'/PlacementsTable'} className='nav-item'>Placements</Link>
          </div>
        </div>   
    
    </>

  )
}

export default AdminHeader;