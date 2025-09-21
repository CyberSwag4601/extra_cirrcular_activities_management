import React,{useEffect,useState} from 'react'
import axios from 'axios';
import StudentHeader from './StudentHeader';
const StudentAchievements = () => {
    const [getdata, setGetdata] = useState([]);
    useEffect(()=>{
        fetchdata();
      },[])
       
      const fetchdata=async ()=>{
        try{
          const fetchresponse =await axios.get('http://localhost:3008/getachievements')
          setGetdata(fetchresponse.data);
        }
        catch(error){
          console.log('error fetching data')
        }
      }
  return (
  <>

    <div>
       <StudentHeader/>
    </div>
    <p class='h2 mt-1'>Students Achievements</p>
    <div className='container '>
       <table className='table   table-bordered table-hover mt-2'>
      
           <thead>
             <tr>
               <th>S No.</th>
               <th>Student Name</th>
               <th>Achievement</th>
               <th>Place of Organisation</th>
               <th>Awards Received</th>
               <th>Organised By</th>
               <th>Year Of Achievement</th>
               </tr>
           </thead>
           <tbody>
            {getdata.map((item, index) => (
               <tr key={index}>
                <td>{index+1}</td>
                <td>{item.pin_number}</td>
                 <td>{item.achievement}</td>
                 <td>{item.place_of_event_organisation}</td>
                 <td>{item.awards_received}</td>
                 <td>{item.organised_by}</td>
                 <td>{item.year_of_achievement}</td>  
             </tr>
              ))}   
           </tbody>
       </table>
       </div>
   
  </>
  )

}

export default StudentAchievements;