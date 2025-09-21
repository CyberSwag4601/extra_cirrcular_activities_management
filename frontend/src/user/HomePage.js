import React,{useState,useEffect} from 'react'
import {Link} from 'react-router-dom'
import StudentHeader from './StudentHeader'
import axios from 'axios'
import HomepageCarousel from './HomepageCarousel'
const HomePage = () => {
  const [getdata,setGetdata]= useState([]);
  useEffect (()=>{
    fetchdata();
  },[]);
  const fetchdata = async () => {
    try {
      const response = await axios.get('http://localhost:3008/GetUpcomingEvent');
    
      setGetdata(response.data);
    } catch (error) {
      console.log("error in fetching data", error);
    }
  };
  
  return (
    <>
     
       <div ><StudentHeader/></div>
        <div className='container mt-3'>
          <p className='h2'>Welcome Aspirant !</p>
          <p className='h6'>At "Andhra Polytechnic College", we believe in the holistic
                  development of individuals beyond the classroom.
                  Our platform is dedicated to showcasing a diverse
                  range of extracurricular activities that empower 
                  individuals to discover their passions, foster 
                  creativity,and develop essential life skills.</p>
        </div>
        <div className='container d-flex'>
         <div className='container' style={{background:'rgba(234, 140, 156, 0.699)'}}>
          <p className='h2 mt-2' >About:</p>
          <p className='h4'><i>Updates on Extra Cirrcular Activities</i></p>
          <p className='h6'>Looking for the right path to actively 
          participate in extra cirrcular activities of our college.
          This page helps  you to achieve your goal, by providing the complete information 
          and details of ongoing events in our college. <br/>
          Stay updated with latest sports , activities, competitions,placements ...
          </p><br/>
           <strong>Please signup to participate in Upcoming Events Below  ⬇️⬇️⬇️ </strong>
           </div>
          <div className='container w-60'><HomepageCarousel/></div>
        </div>
            <div className='container'>
              <p className='h2 ms-2'>Upcoming College Events :</p>
              <div className='container'>
                <table className='table-bordered mb-2' style={{color:'white'}}>
                  <thead>
                    <tr>
                    <th>S No.</th>
                     <th>Event Name</th>
                  <th>Topic of the Event</th>
                <th>Start Date</th>
                <th>Last Date</th>
                <th>Place Of Organisation</th>
                <th>Event Timings</th>
                <th>Organiser</th>
                <th>Rewards</th>
                <th>Paticipate Here</th>
                    </tr>
                  </thead>
                  <tbody>
                    {getdata.map((item,index)=>(
                      <tr key={index}>
                      <td>{index+1}</td>
                      <td>{item.event_name}</td>
                      <td>{item.event_topic}</td>
                      <td>{item.start_date}</td>
                      <td>{item.last_date}</td>
                      <td>{item.place_of_organisation}</td>
                      <td>{item.event_timings}</td>
                      <td>{item.organised_by}</td>
                      <td><ul><li>{item.first_prize}</li><li>{item.second_prize}</li><li>{item.third_prize}</li></ul></td>
                      <td><Link to={'/StudentRegistration'} style={{color:'white',textDecoration:'none'}}>Click Here</Link></td>
                     </tr>
                    
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
        
      </>
  )
}

export default HomePage;