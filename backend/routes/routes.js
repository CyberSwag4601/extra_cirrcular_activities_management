const express= require('express')
const cors = require('cors')
const router =express.Router();
const {StudentRegistration,AddEvent,GetEvents,AddAchievement,GetAchievements,AddPlacement,
    GetPlacements,GetStudentList,AdminLogin,AdminPanelAccess,UpcomingEvents,GetUpcomingEvent,
    participantlogin,registerParticipant, GetParticipantsForEvent,updateevent,deleteevent,
    updateachievement,deleteachievement,updateplacement,deleteplacement,updatepassword,sendotp,updateupcomingevent,
    deleteupcomingevent}= require('../controller/controllers');
router.post('/StudentRegistration',StudentRegistration);
router.post('/addevent',AddEvent);
router.get('/getevents',GetEvents);
router.post('/addachievement',AddAchievement);
router.get('/getachievements',GetAchievements);
router.post('/addplacement',AddPlacement);
router.get('/getplacements',GetPlacements);
router.get('/GetStudentList',GetStudentList);
router.post('/AdminLogin',AdminLogin);
router.post('/AdminPanelAccess',AdminPanelAccess);
router.post('/UpcomingEvents',UpcomingEvents);
router.get('/GetUpcomingEvent',GetUpcomingEvent);
router.post('/participantlogin',participantlogin);
router.post('/registerParticipant',registerParticipant);
router.get('/GetParticipantsForEvent/:id', GetParticipantsForEvent);
router.put('/updateevent',updateevent);
router.delete('/deleteevent',deleteevent);
router.put('/updateachievement',updateachievement);
router.delete('/deleteachievement',deleteachievement);
router.put('/updateplacement',updateplacement);
router.delete('/deleteplacement',deleteplacement);
router.get('/sendotp',sendotp)
router.put('/updatepassword',updatepassword);
router.put('/updateupcomingevent',updateupcomingevent);
router.delete('/deleteupcomingevent',deleteupcomingevent);
module.exports = router ;