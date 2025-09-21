import React,{useState,useEffect} from 'react'
import axios from 'axios';
import StudentHeader from './StudentHeader';
const ListOngoingevents = () => {
    const [selectedEvents, setSelectedEvents] = useState([]);
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
    const handleCheckboxChange = (index) => {
      const selectedIndex = selectedEvents.indexOf(index);
  
      if (selectedIndex === -1) {
        setSelectedEvents([...selectedEvents, index]);
      } else {
        const updatedSelectedEvents = [...selectedEvents];
        updatedSelectedEvents.splice(selectedIndex, 1);
        setSelectedEvents(updatedSelectedEvents);
      }
    };
  
    const handleParticipate = async () => {
      if (selectedEvents.length > 0) {
        try {
          const registrationPromises = selectedEvents.map(async (selectedIndex) => {
            const selectedEvent = getdata[selectedIndex];
             const pin_number=localStorage.getItem('pin_number')
            const response = await axios.post('http://localhost:3008/registerParticipant',({
              pin_number:pin_number,
              id: selectedEvent.id,
            }) );
            return response.data.message;
          });
    
          const registrationResults = await Promise.all(registrationPromises);
          if (registrationResults.every((result)=>result === 'student already registered')){
            alert('Participant already registered');
          }
          else if (registrationResults.every((result) => result === 'Participant registered successfully for the event')) {
            alert('Participants registered successfully!');
          
          } else {
            alert('Failed to register participants for some events.');
          }
        } catch (error) {
          console.error('Error registering participants:', error);
        }
      } else {
        alert('Please select at least one event before participating.');
      }
    };
    
  
  return (
    <>
      <div>
       <StudentHeader/>
      </div>
      <div className='container'>
        <table className='table table-bordered table-hover  mt-5'>
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
                <td><li>{item.first_prize}</li><li>{item.second_prize}</li><li>{item.third_prize}</li></td>
                <td>
                  <input
                    type='checkbox'  checked={selectedEvents.includes(index)}
                     onChange={() => handleCheckboxChange(index)} />Select Here To Participate
                </td>
              </tr>
               ))}
            </tbody>
        </table>
        <button className='btn btn-primary mb-4' onClick={handleParticipate} style={{background:'blue'}}>Submit Your Participation</button>
      </div>
    </>
  )
}

export default ListOngoingevents;