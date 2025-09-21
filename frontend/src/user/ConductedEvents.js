import React,{useState,useEffect} from 'react'
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import StudentHeader from './StudentHeader';
const ConductedEvents = () => {
    const [getdata, setGetdata] = useState([]);
    useEffect(()=>{
        fetchdata();
      },[]);
      
      const fetchdata=async()=>{
        try{
          const fetchresponse=await axios.get('http://localhost:3008/getevents')
            setGetdata(fetchresponse.data);
        }
        catch(error){
          console.log('error')
        }
      }
  return (
    <>
    <div >
       <StudentHeader/>
    </div>
    <div className='container'>
       <p className='h2 mt-1'>College Events</p>
       <table className='table table-bordered table-hover mt-2'>
       
            <thead>
                <tr>
                <th>S No.</th>
                <th>Event Name</th>
                <th>Start Date</th>
                <th>Last Date</th>
                <th>Event Topic</th>
                <th>Prize Winners</th>
                </tr>
            </thead>
            <tbody>
            { getdata.map((item, index) => (
             <tr key={index}>
                <td>{index+1}</td>
                    <td>{item.event_name}</td>
                    <td>{item.event_duration}</td>
                    <td>{item.last_date}</td>
                    <td>{item.event_topic}</td>
                    <td><ul><li>{item.first_prize}</li><li>{item.second_prize}</li><li>{item.third_prize}</li></ul></td>
             </tr>
             ))}
            </tbody>
        </table>
        </div>
    



    </>
  )
}

export default ConductedEvents;