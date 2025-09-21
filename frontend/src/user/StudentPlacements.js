import React,{useState,useEffect} from 'react'
import axios from 'axios'
import StudentHeader from './StudentHeader';
const StudentPlacements = () => {
  const [getdata,setGetdata]=useState([]);

  useEffect(()=>{
    fetchdata();
  },[]);
    const fetchdata= async ()=>{
      try{
       const fetchresponse=await axios.get('http://localhost:3008/getplacements')
          setGetdata(fetchresponse.data);
      }
     catch(error){
      console.log('error');
     }
    }

  return (
    <>
      <div ><StudentHeader/></div>
      <p className='h2 mt-2'>Campus Placements</p>
      <div className='container mt-2'>
       <table className='table  table-bordered table-hover '>
            <thead>
              <tr>
                <th>S No.</th>
                <th>Pin Number</th>
                <th>Placement</th>
                <th>Package</th>
                <th>Year</th>
                <th>Department</th>
                </tr>
            </thead>
            <tbody>
            {Array.isArray(getdata) && getdata.map((item, index) => (
             <tr key={index}>
                <td>{index+1}</td>
                <td>{item.pin_number}</td>
                 <td>{item.placement_name}</td>
                 <td>{item.lpa}</td>
                 <td>{item.year}</td>
                 <td>{item.department}</td>
             </tr>
             ))}
            </tbody>
        </table>
        </div>
       
    </>
  )
}

export default StudentPlacements;