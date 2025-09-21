import React,{useEffect,useState} from 'react'
import { Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faPencilAlt, faTrash} from '@fortawesome/free-solid-svg-icons';
import AdminHeader from './AdminHeader'
import axios from 'axios'

const EventTable= () => {
    const [show, setShow] = useState(false);
    const [getdata, setGetdata] = useState([]);
    const[data,setData]=useState({
      event_name:'',
      event_duration:'',
      last_date:'',
      event_topic:'',
      first_prize:'',
      second_prize:'',
      third_prize:'',
    }
    )
const{
  event_name,
  event_duration,
  last_date,
  event_topic,
  first_prize,
  second_prize,
  third_prize,
}= data;
const [selectedEvent, setSelectedEvent] = useState(null);
const ChangeHandler=(e)=>{
  
  setData({ ...data, [e.target.name]: e.target.value });
}
const handleClose = () => {
  setShow(false);
  setSelectedEvent(null);
};

const handleShow = (event) => {
  setShow(true);
  setSelectedEvent(event);
  setData({ ...event });
};
const handleDelete = async (eventId) => {
  try {
    const response = await axios.delete('http://localhost:3008/deleteevent', {
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
        event_name,
        event_duration,
        last_date,
        event_topic,
        first_prize,
        second_prize,
        third_prize,
      };
      console.log(requestData);
      if (requestData.id) {
        const response = await axios.put('http://localhost:3008/updateevent' ,requestData);
        console.log(response.data);
        
      } else if (requestData.id === null || requestData.id === undefined) {
        const response = await axios.post("http://localhost:3008/addevent", requestData);
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
       const response1= await axios.get('http://localhost:3008/getevents')
       console.log(response1);
       setGetdata(response1.data);
        
    } catch (error) {
       console.log("error fetching data")
    }
  }
  return (
    <>
      <div><AdminHeader/></div>
    <button onClick={handleShow} className="btn-add my-2" variant='light'>Add College Events</button>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title id='modal-title'>College Events</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        
          <div  className='eventform'>
            <div className='eventdivlft'>
            <label>Name of the Event:<br/><input type='text' name='event_name' value={event_name} onChange={ChangeHandler} required/></label><br/>
            <label>Event Duration:<br/><input type='text' name='event_duration' value={event_duration} onChange={ChangeHandler} required/><br/> to:<br/><input type='text' name='last_date' value={last_date} onChange={ChangeHandler}/></label><br/>
            </div>
            <div className='eventdivrgt'>
            <label>Topic:<br/><input type='text' name='event_topic' value={event_topic} onChange={ChangeHandler} required/></label><br/>
             
             <label>Price Winners:<br/>1st Prize:<br/><input type='text' name='first_prize' value={first_prize} onChange={ChangeHandler} required/><br/>
             2nd Prize:<input type='text'  name='second_prize' value={second_prize} onChange={ChangeHandler}/><br/>
             3rd Prize:<input type='text'  name= 'third_prize' value={third_prize} onChange={ChangeHandler}/></label><br/>
            </div>
           </div>
          </Modal.Body>
          <Modal.Footer>
            <button onClick={handleClose} className='btn btn-primary'>Close</button>
            <button onClick={SubmitHandler} className='btn btn-primary'>Save Changes</button>
          </Modal.Footer>
      </Modal>
    <div className='container'>
       <table className='table  table-bordered table-hover'>
          <thead>
           <tr>
             <th>S.No</th>
             <th>Event Name</th>
             <th>Start Date</th>
             <th>Last Date</th>
             <th>Topic</th>
             <th>Price Winners</th>
             <th>Update/Delete</th>
            </tr>
          </thead>

            <tbody>
             {getdata.map((item, index) => (
              <tr key={index}>
             <td>{index+1}</td>
             <td>{item.event_name}</td>
             <td>{item.event_duration}</td>
             <td>{item.last_date}</td>
             <td>{item.event_topic}</td>
             <td>{item.first_prize}<br/>{item.second_prize}<br/>{item.third_prize}</td>
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
export default EventTable;