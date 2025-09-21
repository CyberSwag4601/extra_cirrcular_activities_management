import React from "react";
import { Route,Routes } from "react-router-dom";
import "./App.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import HomePage from './user/HomePage';
import StudentRegistration from "./user/StudentRegistration";
import UserLogin from './user/UserLogin';
import ConductedEvents from "./user/ConductedEvents";
import StudentAchievements from './user/StudentAchievements';
import StudentPlacements from "./user/StudentPlacements";
import ParticipantList from "./admin/Participantslist";
import AchievementTable from "./admin/AchievementTable";
import PlacementsTable from "./admin/PlacementsTable";
import ListOngoingevents from "./user/ListOngoingevents";
import OngoingEvents from "./user/OngoingEvents";
import AdminLogin from "./admin/AdminLogin";
import ForgotPassword from "./user/ForgotPassword";
import Validateotp from './user/Validateotp';
import AdminPanel from "./admin/AdminPanel";
import EventTable from "./admin/EventTable";
import UpdatePassword from "./user/UpdatePassword";
function App(){
return (
  <>
   <Routes>
   <Route path='/' element={<HomePage/>}/>
   <Route path='/StudentRegistration' element={<StudentRegistration/>}/>
    <Route path='/UserLogin' element={<UserLogin/>}/>
    <Route path='/ForgotPassword' element={<ForgotPassword/>}/>
    <Route path='/ListOngoingevents' element={<ListOngoingevents/>}/>
    <Route path='/ConductedEvents' element={<ConductedEvents/>}/>
    <Route path='/StudentAchievements' element={<StudentAchievements/>}/>
    <Route path='/StudentPlacements' element={<StudentPlacements/>}/>
    <Route path='/AdminLogin' element={<AdminLogin/>}/>
    <Route path='/AdminPanel' element={<AdminPanel/>}/>
    <Route path="/participantlist/:id" element={<ParticipantList />} />
    <Route path='/EventTable' element={<EventTable/>}/>
    <Route path='/AchievementTable' element={<AchievementTable/>}/>
    <Route path='/PlacementsTable' element={<PlacementsTable/>}/>
    <Route path ='/Validateotp' element={<Validateotp/>}/>
    <Route path='/UpdatePassword' element={<UpdatePassword/>}/>
    <Route path='/OngoingEvents' element={<OngoingEvents/>}/>
  </Routes> 
  </>
)
}
export default App;