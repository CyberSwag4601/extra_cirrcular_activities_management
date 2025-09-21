import React,{useEffect,useState} from 'react'
import { Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import AdminHeader from './AdminHeader'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faPencilAlt, faTrash} from '@fortawesome/free-solid-svg-icons';
const PlacementsTable = () => {
  const [show,setShow] = useState (false);
  const [getdata, setGetdata] = useState([]);
  const[data,setData]=useState({
    pin_number:"",
    placement_name:"",
    lpa:"",
    year:"",
    department:"",
 });
 const [selectedEvent, setSelectedEvent] = useState(null);
  const handleClose = () =>{
    setShow(false);
    setSelectedEvent(null);
  }
  const handleShow = (event) =>{
    setShow(true);
    setSelectedEvent (event);
    setData({...event});
  }
  const handleDelete = async (eventId) => {
    try {
      const response = await axios.delete('http://localhost:3008/deleteplacement', {
        data: { id: eventId },
      });
      console.log(response.data);
    } catch (error) {
      console.error("Error deleting event:", error);
    }
    fetchdata();
  };
  const {pin_number,placement_name,lpa,year,department}=data;
  const ChangeHandler = (e) =>{ 
    setData({...data,[e.target.name]:e.target.value
    })
  }
  const SubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const requestData = {
        id: selectedEvent ? selectedEvent.id : null,
        pin_number,
        placement_name,
        lpa,
        year,
        department
      };
      console.log(requestData);
      if (requestData.id) {
        const response = await axios.put('http://localhost:3008/updateplacement' ,requestData);
        console.log(response.data);
        
      } else if (requestData.id === null || requestData.id === undefined) {
        const response = await axios.post("http://localhost:3008/addplacement", requestData);
        console.log(response.data);
      }
      fetchdata();
      handleClose();
    } catch (error) {
      console.error("Error updating/inserting placement:", error);
    }
  };
  useEffect( ()=>{
    fetchdata();
  } ,[])
  const fetchdata= async()=>{
    try {
       const response1= await axios.get('http://localhost:3008/getplacements')
       console.log(response1);
       setGetdata(response1.data);
        
    } catch (error) {
       console.log("error fetching data")
    }
  }
  return (
    <>
    <div><AdminHeader/></div>
      <button onClick={handleShow} className="btn-add my-2" variant='light'>Add Placements</button>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title id='modal-title'>Placements</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='eventform' >
            <div className='eventdivlft'>
            <label>Student Pin:<br/><input type='text' name='pin_number' value={pin_number} onChange={ChangeHandler} required/></label><br/>
            <label>Placement Name:<br/><input type='text'  name='placement_name' value={placement_name} onChange={ChangeHandler} required/><br/></label><br/>
            <label>Package:<br/><input type='text'  name='lpa' value={lpa} onChange={ChangeHandler} required/><br/></label><br/>
            </div>
            <div className='eventdivrgt'>
            <label>Year:<br/><input type='date'  name='year' value={year} onChange={ChangeHandler} required/></label><br/>
             <label>Department:<br/><input type='text'  name='department' value={department} onChange={ChangeHandler} required/></label><br/>
            </div></div>
            </Modal.Body>
        <Modal.Footer>
            <button onClick={handleClose}  className='btn btn-primary'>Close</button>
            <button onClick={SubmitHandler}  className='btn btn-primary'>Save Changes</button>
          </Modal.Footer>
      </Modal>
    <div className='container'>
       <table className='table  table-bordered table-hover'>
      
        <thead>
               <tr>
                <th>S No.</th>
                <th>Pin Number</th>
                <th>Placement</th>
                <th>Package</th>
                <th>Year</th>
                <th>Department</th>
                <th>Update/Delete</th>
                </tr>
        </thead>
        <tbody>
            {getdata.map((item, index) => (
             <tr key={index}>
                <td>{index+1}</td>
                <td>{item.pin_number}</td>
                 <td>{item.placement_name}</td>
                 <td>{item.lpa}</td>
                 <td>{item.year}</td>
                 <td>{item.department}</td>
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

export default PlacementsTable;