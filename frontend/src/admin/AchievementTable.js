import React,{useEffect,useState} from 'react'
import axios from 'axios'
import AdminHeader from './AdminHeader'
import { Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faPencilAlt, faTrash} from '@fortawesome/free-solid-svg-icons';
const AchievementTable = () => {
  const[data,setData]=useState({
    pin_number:"",
    achievement:"",
    place_of_event_organisation:"",
    awards_received:"",
   organised_by:"",
    year_of_achievement:"",
 });
 const [getdata, setGetdata] = useState([]);
 const [selectedEvent, setSelectedEvent] = useState(null);
  const[show,setShow]=useState(false);
  const handleClose = () =>{
    setShow(false);
    setSelectedEvent(null);
  }
  const handleShow = (event) =>{
    setShow(true);
    setSelectedEvent(event);
    setData({...event});
  }
  const { pin_number,achievement,place_of_event_organisation,awards_received,organised_by,year_of_achievement}=data;
  const ChangeHandler = (e) =>{ 
    setData({...data,[e.target.name]:e.target.value
    })
  }
  const handleDelete = async (eventId) => {
    try {
      const response = await axios.delete('http://localhost:3008/deleteachievement', {
        data: { id: eventId },
      });
      console.log(response.data);
    } catch (error) {
      console.error("Error deleting event:", error);
    }
    fetchdata();
  };
    const SubmitHandler = async (e) => {
      e.preventDefault();
      try {
        const requestData = {
          id: selectedEvent ? selectedEvent.id : null,
          pin_number,achievement,place_of_event_organisation,
          awards_received,organised_by,year_of_achievement
        };
        console.log(requestData);
        if (requestData.id) {
          const response = await axios.put('http://localhost:3008/updateachievement' ,requestData);
          console.log(response.data);
          
        } else if (requestData.id === null || requestData.id === undefined) {
          const response = await axios.post("http://localhost:3008/addachievement", requestData);
          console.log(response.data);
        }
        fetchdata();
        handleClose();
      } catch (error) {
        console.error("Error updating/inserting achievement:", error);
      }
    };
    useEffect( ()=>{
      fetchdata();
    } ,[])
    const fetchdata= async()=>{
      try {
         const response1= await axios.get('http://localhost:3008/getachievements')
         console.log(response1);
         setGetdata(response1.data);
          
      } catch (error) {
         console.log("error fetching data")
      }
    }
  return (
    <>
      
      <div ><AdminHeader/></div>
     <div>
      <button onClick={handleShow} className="btn-add my-2" variant='light'>Add Student Achievements</button>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title id='modal-title'>Achievements</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        
           <div className='eventform' >
            <div className='eventdivlft'>
            <label>Student Pin:<br/><input type='text' name='pin_number' value={pin_number} onChange={ChangeHandler} required/></label><br/>
            <label>Achievement Name:<br/><input type='text'  name='achievement' value={achievement} onChange={ChangeHandler} required/><br/></label><br/>
            <label>Place of Event Organisation:<br/><input type='text'  name='place_of_event_organisation' value={place_of_event_organisation} onChange={ChangeHandler} required/><br/></label><br/>
            </div>
            <div className='eventdivrgt'>
            <label>Awards:<br/><input type='text'  name='awards_received' value={awards_received} onChange={ChangeHandler} required/></label><br/>
             <label>Conducted By:<br/><input type='text'  name='organised_by' value={organised_by} onChange={ChangeHandler} required/></label><br/>
             <label>Year of Achievement:<br/><input type='text'  name='year_of_achievement' value={year_of_achievement} onChange={ChangeHandler} required/></label><br/>
            </div>
             </div>
          
        </Modal.Body>
        <Modal.Footer>
        <button onClick={handleClose} className='btn btn-primary'>Close</button>
            <button onClick={SubmitHandler}  className='btn btn-primary'>Save Changes</button>
        </Modal.Footer>
      </Modal>
    </div> 
      <div className='container'>
       <table className='table  table-bordered table-hover'>
            <thead>
              <tr>
            <th>S No.</th>
               <th>Student Name</th>
               <th>Achievement</th>
               <th>Place of Organisation</th>
               <th>Awards Received</th>
               <th>Organised By</th>
               <th>Year Of Achievement</th>
               <th>Delete/Update</th>
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
                 <td>
                 <button onClick={() => handleShow(item)} style={{marginLeft:'15%'}}><FontAwesomeIcon icon={ faPencilAlt } /> </button>
                 <button onClick={() => handleDelete(item.id)}  style={{marginLeft:'40%'}}><FontAwesomeIcon icon={ faTrash } /></button>
                 </td>  
             </tr>
             ))}   
            </tbody>
        </table>
        </div>
      
    </>
  )
}

export default AchievementTable;

