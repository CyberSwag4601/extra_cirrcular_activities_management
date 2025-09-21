import React,{useEffect,useState} from 'react'
import { Modal } from 'react-bootstrap';
import{Link} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faPencilAlt, faTrash} from '@fortawesome/free-solid-svg-icons';
import AdminHeader from './AdminHeader' 
import axios from 'axios'

const AdminPanel = () => {
  const[data,setData]=useState({
    event_name:"",
    event_topic:"",
    start_date:"",
    last_date:"",
    place_of_organisation:"",
    event_timings:"",
    organised_by:"",
    first_prize:"",
    second_prize:"",
    third_prize:"",
    more_details:"",
 }); 
 const [adminData, setAdminData] = useState({
  admin_id: "",
  email: "",
  password: "",
});
  const [showAdminModal, setShowAdminModal] = useState(false);
  const handleShowAdminModal = () => {
    setShowAdminModal(true);
  };
  const handleCloseAdminModal = () => {
    setShowAdminModal(false);
  };

  const [geteventdata, setGeteventdata] = useState([]);
  const[show,setShow]=useState(false);
  const handleClose = () =>{
    setShow(false);
    setSelectedEvent(null);
  };
  const handleShow = (event) =>{
    setShow(true);
    setSelectedEvent(event);
    setData({...event});
  };

  const [selectedEvent, setSelectedEvent] = useState(null);
  const handleDelete = async (eventId) => {
    try {
      const response = await axios.delete('http://localhost:3008/deleteupcomingevent', {
        data: { id: eventId },
      });
      console.log(response.data);
    } catch (error) {
      console.error("Error deleting event:", error);
    }
    fetchdata();
  };
  const handleAdminChange = (e) => {
    setAdminData({
      ...adminData,
      [e.target.name]: e.target.value,
    });
  };
  
  const {event_name,event_topic,start_date,last_date,place_of_organisation,event_timings,organised_by,first_prize,second_prize,third_prize}=data;
  const {admin_id,email,password}=adminData;
  const ChangeHandler = (e) =>{ 
    setData({...data,[e.target.name]:e.target.value
    })
  }
 
  const submitAdminData = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post('http://localhost:3008/AdminLogin', adminData);
      
      if (response.data.message === 'error in adding admin') {
        alert('Can not add the current admin');
      } else if (response.data.message === 'added admin successfully') {
        alert('Added admin successfully');
      }
    } catch (error) {
      console.log('error:', error);
    }
  
    handleCloseAdminModal();
  };
  const SubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const requestData = {
        id: selectedEvent ? selectedEvent.id : null,
        event_name,
        event_topic,
        start_date,
        last_date,
        place_of_organisation,
        event_timings,
        organised_by,
        first_prize,
        second_prize,
        third_prize,
      };
      console.log(requestData);
      if (requestData.id) {
        const response = await axios.put('http://localhost:3008/updateupcomingevent' ,requestData);
        console.log(response.data);
        
      } else if (requestData.id === null || requestData.id === undefined) {
        const response = await axios.post("http://localhost:3008/UpcomingEvents", requestData);
        console.log(response.data);
      }
      fetchdata();
      handleClose();
    } catch (error) {
      console.error("Error updating/inserting event:", error);
    }
  };
  useEffect( ()=>{
    fetchdata();
  } ,[])
  const fetchdata= async()=>{
    try {
       const response1= await axios.get('http://localhost:3008/GetUpcomingEvent')
       console.log(response1);
       setGeteventdata(response1.data);
        
    } catch (error) {
       console.log("error fetching data")
    }
  }
  return (
    <>
      <div>
        <AdminHeader/>
      </div>
      <div className='modal-btn'>
        <button onClick={handleShow} className="btn-add my-3">Add Upcoming Events</button>
        <Modal show={show} onHide={handleClose} centered>
          <Modal.Header closeButton>
            <Modal.Title id='modal-title'>Upcoming Events</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div  className='eventform'>
              <div className='eventdivlft'>
              <label>Name of the Event:<br/><input type='text' name='event_name' value={event_name} onChange={ChangeHandler} required/></label><br/>
              <label>Event Topic:<br/><input type='text' name='event_topic' value={event_topic} onChange={ChangeHandler} required/><br/>
              <label>Start Date:</label><input type='text' name='start_date' value={start_date} onChange={ChangeHandler}/>
              To:<input type='text' name='last_date' value={last_date} onChange={ChangeHandler} required/></label><br/>
              <label>Place Of Organisation:<input type='text' name='place_of_organisation' value={place_of_organisation} onChange={ChangeHandler} required/></label><br/>
              
              </div>
              <div className='eventdivrgt'>
              <label>Timings:<br/><input type='text' name='event_timings' value={event_timings} onChange={ChangeHandler} required/></label><br/>
               <label>Organiser:<br/><input type='text' name='organised_by' value={organised_by} onChange={ChangeHandler} required/></label>
               <label>First Prize:<br/><input type='text' name='first_prize' value={first_prize} onChange={ChangeHandler} required/><br/>
               Second Prize:<input type='text'  name='second_prize' value={second_prize} onChange={ChangeHandler}/><br/>
               Third Prize:<input type='text'  name= 'third_prize' value={third_prize} onChange={ChangeHandler}/></label><br/>
               </div>
              </div>
             </Modal.Body>
             <Modal.Footer>
             <button onClick={handleClose} className='btn btn-primary'>Close</button>
             <button onClick={SubmitHandler} className='btn btn-primary'>Save Changes</button>
             </Modal.Footer>
        </Modal>
    
       <button onClick={handleShowAdminModal} className="btn-admin my-3" variant='primary'>Add Admin</button>
        <Modal show={showAdminModal} onHide={handleCloseAdminModal} centered>
          <Modal.Header closeButton>
            <Modal.Title id='modal-title-admin'>Add Admin</Modal.Title>
          </Modal.Header>     
       <Modal.Body>
            <form onSubmit={submitAdminData}>
          <label>Admin ID:<br />
      <input
        type='text'
        name='admin_id'
        value={admin_id}
        onChange={handleAdminChange}
        required
      />
    </label><br />
    <label>Email:<br />
      <input
        type='text'
        name='email'
        value={email}
        onChange={handleAdminChange}
        required
      />
    </label><br />
    <label>Password:<br />
      <input
        type='password'
        name='password'
        value={password}
        onChange={handleAdminChange}
        required
      />
    </label><br />

   
    <input type='submit' value='Submit' className='modal-submit' />
  </form>
</Modal.Body>
</Modal></div>
      <div className='container'>
        <table className='table  table-bordered table-hover'>
            <thead>
            <tr>
                <th>S.No</th>
                <th>Event Name</th>
                <th>Topic of the Event</th>
                <th>Start Date</th>
                <th>Last Date</th>
                <th>Place Of Organisation</th>
                <th>Event Timings</th>
                <th>Organiser</th>
                <th>Rewards</th>
                <th>Student List </th>
              </tr>
            </thead>
            <tbody>
             {geteventdata.map((item,index)=>(
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
                <td><Link to={`/participantlist/${item.id}`}>View Participants</Link>
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

export default AdminPanel;