const pool = require('../config/config');
const nodemailer = require('nodemailer')
const StudentRegistration = async (req, res) => {
  const { pin_number } = req.body;

  try {
    const existingUser = await pool.query('SELECT pin_number FROM student_registration WHERE pin_number=$1', [pin_number]);

    if (existingUser.rowCount !== 0) {
      console.log(existingUser);
      res.status(200).json({ data: existingUser.rows, message: 'user already exists' });
    } else {
      const {
        name, pin_number, department, phone_number, gender, age,
        achievements, email, password,
        sports, competition, cultural_activities, music
      } = req.body;

      const studentResult = await pool.query(
        'INSERT INTO student_registration(name, pin_number, department, phone_number, gender, age, achievements, email, password, sports, competition, cultural_activities, music) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)',
        [name, pin_number, department, phone_number, gender, age, achievements, email, password, sports, competition, cultural_activities, music]
      );
       console.log(studentResult);

      res.status(200).json({ message: 'user registered successfully' });
    }
  } catch (error) {
    res.status(500).json({ message: 'internal server error', error: error.message });
  }
};

const AdminLogin= async(req,res)=>{
  try{
   const {admin_id}=req.body;
   const ExistAdmin =await pool.query('SELECT admin_id FROM admin_credentials WHERE admin_id=$1',[admin_id]);
   if (ExistAdmin.rowCount !== 0) {
    console.log(ExistAdmin);
    res.status(200).json({ data: ExistAdmin.rows, message: 'admin already exists use another id' });
   }
   else{
    const {admin_id,email,password}=req.body;
   const MainAdmin= await pool.query('INSERT INTO admin_credentials(admin_id,email,password) VALUES ($1,$2,$3)',[admin_id,email,password]);
   console.log(MainAdmin);
    res.status(200).json({message:'added admin successfully'});
  }
}
  catch(error){
    console.log(error);
    res.status(500).json({message:'error in adding admin'})
  }
}

const AdminPanelAccess = async (req,res)=>{
  try{
    const{admin_id,email,password}=req.body; 
    const Admin =  await pool.query('SELECT admin_id,email,password FROM admin_credentials WHERE admin_id =$1',[admin_id]);
    console.log(Admin);
    if(Admin.rowCount == 0){
     res.status(200).json({data:admin_id.rows,message:'invalid id'});
    }
    const OtherAdmin = Admin.rows[0];
    if(OtherAdmin.email !== email){
     res.status(200).json({message:'invalid email'})
    }
    else if(OtherAdmin.password !== password){
     res.status(200).json({message:"invalid password"})
    }

    else{
     res.status(200).json({message:'user found'})
 
    }
  
  }
  catch(error){
    console.log('error');
    res.status(500).json({message:'error with login credentials'})
  }
}
const GetStudentList = async (req, res) => {
  try {
    const getstudentlist = await pool.query('SELECT name, pin_number, department, phone_number, gender, age, achievements, email, sports, competition, cultural_activities, music FROM student_registration');
    
    console.log(getstudentlist.rows);
    
    res.status(200).json(getstudentlist.rows);
  } catch (error) {
    console.error('Error fetching student list:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const AddEvent = async (req, res) => {
  try {
    const { event_name, event_duration,last_date, event_topic, first_prize, second_prize, third_prize } = req.body;
    const AddEvents = await pool.query('INSERT INTO college_events(event_name, event_duration, last_date, event_topic, first_prize, second_prize, third_prize) VALUES ($1, $2, $3, $4, $5, $6, $7)', [event_name, event_duration,last_date, event_topic, first_prize, second_prize, third_prize]);
    console.log(AddEvents);
    res.status(200).json({ message: 'added event successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'error in adding event' });
  }
};
const GetEvents=async(req,res)=>{

   try{
     const GetEvents=await pool.query('SELECT * FROM college_events')
     res.status(200).json(GetEvents.rows)
   
   }
 
   catch (error){
     console.log(error)
     res.send('Events not found')
   }
 } 

 const AddAchievement = async (req, res) => {
  try {
    const {pin_number,achievement,place_of_event_organisation,awards_received,organised_by,year_of_achievement} = req.body;
    const AddAchievements = await pool.query('INSERT INTO student_achievements(pin_number,achievement,place_of_event_organisation,awards_received,organised_by,year_of_achievement) VALUES ($1, $2, $3, $4, $5, $6)', [pin_number,achievement,place_of_event_organisation,awards_received,organised_by,year_of_achievement]);
    console.log(AddAchievements);
    res.status(200).json({ message: 'added achievement successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'error in adding achievement' });
  }
};

const GetAchievements=async(req,res)=>{

  try{
    const GetAchievements=await pool.query('SELECT * FROM student_achievements')
    res.status(200).json(GetAchievements.rows)
  
  }

  catch (error){
    console.log(error)
    res.send('Achievements not found')
  }
} 
const AddPlacement=async(req,res)=>{
  try{

  const {pin_number,placement_name,lpa,year,department}=req.body;
  const AddPlacements = await pool.query('INSERT INTO placements(pin_number,placement_name,lpa,year,department) VALUES ($1, $2, $3, $4, $5)', [pin_number,placement_name,lpa,year,department]);
  console.log(AddPlacements);
  res.status(200).json({ message: 'added placement successfully' });
}
 catch (error) {
  console.log(error);
  res.status(500).json({ message: 'error in adding placement' });
}
};

const GetPlacements=async(req,res)=>{

  try{
    const GetPlacements=await pool.query('SELECT * FROM placements')
    res.status(200).json(GetPlacements.rows)
  
  }

  catch (error){
    console.log(error)
    res.send('Placements not found')
  }
} 

const UpcomingEvents = async (req, res) => {
  try {
    const {
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
    } = req.body;

    const participants_list = [];

    const upcomingevents = await pool.query(
      'INSERT INTO upcoming_events(event_name, event_topic, start_date, last_date, place_of_organisation, event_timings, organised_by, first_prize, second_prize, third_prize, participants_list) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING id',
      [
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
        participants_list,
      ]
    );

    const eventId = upcomingevents.rows[0].id;

    console.log(upcomingevents);
    res.status(200).json({ message: 'added event successfully', eventId });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'error in adding upcoming event' });
  }
};

const GetUpcomingEvent=async(req,res)=>{
  try{
    const getupcomingevents = await pool.query ('SELECT * FROM upcoming_events');
    res.status(200).json(getupcomingevents.rows);

  }
  catch(error){
    res.status(500).json({messaga:'error fetching upcoming events.'})
  }
}
const participantlogin = async (req, res) => {
  try {
    const { pin_number, password } = req.body;
    const getparticipant = await pool.query(
      'SELECT pin_number, password FROM student_registration WHERE pin_number=$1',
      [pin_number]
    );
    if (getparticipant.rowCount === 0) {
      res.status(200).json({ message: 'user not found' });
    } else if (getparticipant.rows[0].password !== password) {
      res.status(200).json({ message: 'password not matched' });
    } else if(getparticipant.rowCount !== 0) {
      res.status(200).json({ message: 'user login successfull' });
    }
  } 
  catch (error) {
  console.error('Error in user login:', error);
  res.status(500).json({ message: 'error in user login' });
}

};

const registerParticipant = async (req, res) => {
  try {
    const {id, pin_number } = req.body;
    console.log(id,pin_number ); 
    const eventExists = await pool.query('SELECT * FROM upcoming_events WHERE id = $1', [id]);

    if (eventExists.rowCount === 0) {
      res.status(200).json({ message: 'Event not found' });
    } else {
    const updateParticipantsList = await pool.query(
        'UPDATE upcoming_events SET participants_list = array_append(participants_list, $2) WHERE id = $1',
        [id,pin_number]
      );
        if (eventExists.rows[0].participants_list.includes(pin_number)) {
        res.status(200).json({message:'student already registered'})
      }
      else if (updateParticipantsList.rowCount > 0) {
        res.status(200).json({ message: 'Participant registered successfully for the event' });
      } else {
        res.status(500).json({ message: 'Failed to register participant for the event' });
      }
    }  
  } catch (error) {
    console.error('Error registering participant:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const GetParticipantsForEvent = async (req, res) => {
  try {
    const eventId = req.params.id;
    console.log('eventId:', eventId);

    const getParticipants = await pool.query(
      'SELECT participants_list FROM upcoming_events WHERE id = $1',
      [eventId]
    );

    console.log('getParticipants result:', getParticipants.rows);

    if (getParticipants.rowCount === 0) {
      console.log('Event not found');
      res.status(404).json({ message: 'Event not found' });
    } else {
      const participantList = getParticipants.rows[0].participants_list;
      console.log(participantList, 'participants');

      if (participantList.length === 0) {
        res.status(200).json('No students are registered.');
      } else {
        const query = {
          text: 'SELECT * FROM student_registration WHERE pin_number = ANY($1::text[])',
          values: [participantList],
        };

        const participantsDetails = await pool.query(query);
        console.log(participantsDetails.rows);

        res.status(200).json(participantsDetails.rows);
      }
    }
  } catch (error) {
    console.error('Error fetching participants:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


const updateevent = async (req, res) => {
  const {
    event_name, event_duration,last_date, event_topic, first_prize, second_prize, third_prize
  } = req.body;
  console.log(req.body.id);
  try {
    const existingEvent = await pool.query('SELECT * FROM college_events WHERE id=$1', [req.body.id]);

    if (existingEvent.rows.length === 0) {
      return res.status(404).json({ message: 'Event not found' });
    }
    const update = await pool.query('UPDATE college_events SET event_name=$1,event_duration=$2, last_date=$3, event_topic=$4, first_prize=$5, second_prize=$6, third_prize=$7 WHERE id=$8',
      [ event_name, event_duration,last_date, event_topic, first_prize, second_prize, third_prize,req.body.id]);

    console.log(update.rows);

    return res.status(200).json({ message: 'Event updated successfully' });
  } catch (error) {
    console.error("Error updating event:", error);
    res.status(500).json({ message: "An error occurred on the server" });
  }
};
const deleteevent=async(req,res)=>{
  
    const eventId = req.body.id; 
  
    try {
      const existingEvent = await pool.query('SELECT * FROM college_events WHERE id=$1', [eventId]);
  
      if (existingEvent.rows.length === 0) {
        return res.status(404).json({ message: 'Event not found' });
      }
      const deletion = await pool.query('DELETE FROM college_events WHERE id=$1', [eventId]);
  
      console.log(deletion.rows);
  
      return res.status(200).json({ message: 'Event deleted successfully' });
    } catch (error) {
      console.error('Error deleting event:', error);
      return res.status(500).json({ message: 'An error occurred on the server' });
    }
  };
  const updateachievement = async (req, res) => {
    
    const {pin_number,achievement,place_of_event_organisation,awards_received,organised_by,year_of_achievement} = req.body;
    console.log(req.body.id);
    try {
      const existingEvent = await pool.query('SELECT * FROM student_achievements WHERE id=$1', [req.body.id]);
  
      if (existingEvent.rows.length === 0) {
        return res.status(404).json({ message: 'Event not found' });
      }
      const update = await pool.query('UPDATE student_achievements SET pin_number=$1,achievement=$2,place_of_event_organisation=$3,awards_received=$4,organised_by=$5,year_of_achievement=$6 WHERE id=$7',
        [pin_number,achievement,place_of_event_organisation,awards_received,organised_by,year_of_achievement,req.body.id]);
  
      console.log(update.rows);
  
      return res.status(200).json({ message: 'Achievement updated successfully' });
    } catch (error) {
      console.error("Error updating achievement:", error);
      res.status(500).json({ message: "An error occurred on the server" });
    }
  };
  const deleteachievement=async(req,res)=>{
    
      const eventId = req.body.id; 
    
      try {
        const existingEvent = await pool.query('SELECT * FROM student_achievements WHERE id=$1', [eventId]);
    
        if (existingEvent.rows.length === 0) {
          return res.status(404).json({ message: 'Achievement not found' });
        }
        const deletion = await pool.query('DELETE FROM student_achievements WHERE id=$1', [eventId]);
    
        console.log(deletion.rows);
    
        return res.status(200).json({ message: 'Achievement deleted successfully' });
      } catch (error) {
        console.error('Error deleting event:', error);
        return res.status(500).json({ message: 'An error occurred on the server' });
      }
};
const updateplacement= async (req, res) => {
  const {pin_number,placement_name,lpa,year,department}=req.body;
  console.log(req.body.id);
  try {
    const existingEvent = await pool.query('SELECT * FROM placements WHERE id=$1', [req.body.id]);

    if (existingEvent.rows.length === 0) {
      return res.status(404).json({ message: 'Event not found' });
    }
    const update = await pool.query('UPDATE placements SET pin_number=$1,placement_name=$2,lpa=$3,year=$4,department=$5  WHERE id=$6',
      [pin_number,placement_name,lpa,year,department,req.body.id]);

    console.log(update.rows);

    return res.status(200).json({ message: 'placement updated successfully' });
  } catch (error) {
    console.error("Error updating placement:", error);
    res.status(500).json({ message: "An error occurred on the server" });
  }
};
const deleteplacement=async(req,res)=>{
  
    const eventId = req.body.id;
  
    try {
      const existingEvent = await pool.query('SELECT * FROM placements WHERE id=$1', [eventId]);
  
      if (existingEvent.rows.length === 0) {
        return res.status(404).json({ message: 'Event not found' });
      }
      const deletion = await pool.query('DELETE FROM placements WHERE id=$1', [eventId]);
  
      console.log(deletion.rows);
  
      return res.status(200).json({ message: 'Event deleted successfully' });
    } catch (error) {
      console.error('Error deleting event:', error);
      return res.status(500).json({ message: 'An error occurred on the server' });
    }
  };
  const updateupcomingevent = async (req, res) => {
    const {
      event_name,event_topic,start_date,last_date,place_of_organisation,event_timings,organised_by, first_prize, second_prize, third_prize
    } = req.body;
    console.log(req.body.id);
    try {
      const existingEvent = await pool.query('SELECT * FROM upcoming_events WHERE id=$1', [req.body.id]);
      if (existingEvent.rows.length === 0) {
        return res.status(404).json({ message: 'Event not found' });
      }
      const update = await pool.query('UPDATE upcoming_events SET event_name=$1,event_topic=$2,start_date=$3, last_date=$4, place_of_organisation=$5,event_timings=$6,organised_by=$7, first_prize=$8, second_prize=$9, third_prize=$10 WHERE id=$11',
        [ event_name,event_topic,start_date,last_date,place_of_organisation,event_timings,organised_by, first_prize, second_prize, third_prize,req.body.id]);
  
      console.log(update.rows);
  
      return res.status(200).json({ message: 'Event updated successfully' });
    } catch (error) {
      console.error("Error updating event:", error);
      res.status(500).json({ message: "An error occurred on the server" });
    }
  };
  const deleteupcomingevent=async(req,res)=>{
    
      const eventId = req.body.id;
    
      try {
        const existingEvent = await pool.query('SELECT * FROM upcoming_events WHERE id=$1', [eventId]);
    
        if (existingEvent.rows.length === 0) {
          return res.status(404).json({ message: 'Event not found' });
        }
        const deletion = await pool.query('DELETE FROM upcoming_events WHERE id=$1', [eventId]);
    
        console.log(deletion.rows);
    
        return res.status(200).json({ message: 'Event deleted successfully' });
      } catch (error) {
        console.error('Error deleting event:', error);
        return res.status(500).json({ message: 'An error occurred on the server' });
      }
    };
const sendotp = async (req, res) => {
    const { email } = req.query;
    try {
      const user = await pool.query('SELECT email FROM student_registration WHERE email = $1', [email]);
  
      if (user.rows.count === 0) {
        res.status(200).json({ message: 'User not found' });
      } else {
        const otp = Math.floor(1000 + Math.random() * 9000);
       console.log(otp)
        res.status(200).json({ message: 'User found', otp: otp });
        var transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: 'chaituchinni246@gmail.com',
            pass: 'wgza zovs lvbr kqob'
          }
        });
  
        var mailOptions = {
          from: 'chaituchinni246@gmail.com',
          to: email,
          subject: 'Your OTP for Verification',
          html: String('<h1 style="color:blue">Your OTP is ' + otp + '</h1>')

        };
  
        transporter.sendMail(mailOptions, function (error, info) {
          if (error) {
            console.log(error);
          } else {
            console.log('Email sent: ' + info.response);
          }
        });
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      res.status(500).json({ error: 'Server error' });
    }
  };
  
  const updatepassword =  async (req, res) => {
    const { password,email} = req.body;
  
    try {
      const query = await pool.query('UPDATE student_registration SET password = $1 WHERE email = $2', [password, email]);
  
      if (query.rowCount !== 0) {
        console.log('Updated password successfully');
        res.status(200).json({ message: 'Updated password successfully' });
      } else {
        console.log('Password updation failed: No rows were updated');
        res.status(404).json({ message: 'Password updation failed: No rows were updated' });
      }
    } catch (error) {
      console.error('Error updating password:', error);
      res.status(500).json({ error: 'Server error', details: error.message });
    }
  };
module.exports = {
  StudentRegistration ,
  AddEvent,
  GetEvents,
  AddAchievement,
  GetAchievements,
  AddPlacement,
  GetPlacements,
  GetStudentList,
  AdminLogin,
  AdminPanelAccess,
  UpcomingEvents,
  GetUpcomingEvent,
  participantlogin,
  registerParticipant,
  GetParticipantsForEvent,
  updateevent,
  deleteevent,
  updateachievement,
  deleteachievement,
  updateplacement,
  deleteplacement,
  updateupcomingevent,
  deleteupcomingevent,
  updatepassword,
  sendotp,
};
