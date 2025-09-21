import React, { useEffect, useState } from 'react';
import { useParams,useNavigate } from 'react-router-dom';
import axios from 'axios';
import AdminHeader from './AdminHeader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faArrowAltCircleLeft} from '@fortawesome/free-solid-svg-icons';
const ParticipantList = () => {
  const { id } = useParams();
  console.log('Params:', useParams());
  console.log('Event ID:', id);
  const navigate=useNavigate();
  const Admin=()=>{
    navigate('/AdminPanel')
  }
  const [participants, setParticipants] = useState([]);

  useEffect(() => {
    const fetchParticipants = async () => {
      try {
        if (!id) {
          console.error('Event ID is undefined');
          return;
        }
        
        const response = await axios.get(`http://localhost:3008/GetParticipantsForEvent/${id}`);
        console.log('Response:', response.data);
        setParticipants(response.data);
      } catch (error) {
        console.log('Error fetching participants:', error);
      }
    };

    fetchParticipants();
  }, [id]);

  return (
    <>
       <div><AdminHeader/></div>
       <FontAwesomeIcon icon={ faArrowAltCircleLeft} style={{marginLeft:'5%'}} onClick={Admin} className='icon mt-2'/>
        <div className='container ps-0 pe-0'>
          <center><p className='h1 ms-5'>Participation List</p></center>
         <table className=' table-bordered table-hover mt-2'>
                <thead>
                   <tr>
                   <th>S.No</th>
                   <th>Student Name</th>
                   <th>Pin Number</th>
                    <th>Department</th>
                      <th>Phone Number</th>
                     <th>Gender</th>
                     <th>Age</th>
                     <th>Previous Achievements</th>
                     <th>Email</th>
                     <th>Intrested Sports</th>
                     <th>Intrested Indoor Competitions</th>
                     <th>Intrested Cultural Activities</th>
                     <th>Musical Instruments</th>
                      </tr>
                  </thead>
        
                    <tbody>
                     {Array.isArray(participants) && participants.map((item, index) => (
                    <tr key={index}>
                       <td>{index+1}</td>
                           <td>{item.name}</td>
                           <td>{item.pin_number}</td>
                           <td>{item.department}</td>
                           <td>{item.phone_number}</td>
                           <td>{item.gender}</td>
                           <td>{item.age}</td>
                           <td>{item.achievements}</td>
                           <td>{item.email}</td>
                           <td>{item.sports}</td>
                           <td>{item.competition}</td>
                           <td>{item.cultural_activities}</td>
                           <td>{item.music}</td>
                    </tr>
                    ))}
                   </tbody>
                   </table>
                   </div>
      </>
  );
};

export default ParticipantList;
