import React,{useState,useEffect} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios';
import StudentHeader from './StudentHeader';
const OngoingEvents = () => {
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
        <div className='container'>
            
            <table className='table table-bordered table-hover  mt-5'>
                <thead>
                  <tr>
                  <th>Event Name</th>
                  <th>Topic</th>
                  <th>Start Date</th>
                  <th>Last Date</th>
                  <th>Place Of Organisation</th>
                  <th>Timings</th>
                  <th>Organiser</th>
                  <th>Rewards</th>
                  <th>Participate Here</th>
                  </tr>
                </thead>
                <tbody>
                {getdata.map((item,index)=>(
                  <tr key={index}>
                   <td>{item.event_name}</td>
                   <td>{item.event_topic}</td>
                   <td>{item.start_date}</td>
                   <td>{item.last_date}</td>
                   <td>{item.place_of_organisation}</td>
                   <td>{item.event_timings}</td>
                   <td>{item.organised_by}</td>
                   <td>{item.first_prize}<br/>{item.second_prize}<br/>{item.third_prize}</td>
                   <td><Link to={'/StudentRegistration'}>Participate Here</Link>{item.more_details}</td>
                  </tr>
                ))}
                </tbody>
           </table>
        </div>
       
    </>
  )
}

export default OngoingEvents