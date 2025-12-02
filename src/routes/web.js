const express =  require('express');
const AdminController = require('../controller/AdminController');
const DoctorController = require('../controller/DoctorController');
const PatientController =require('../controller/PatientController');
const SpecialtyController =require('../controller/SpecialtyController');
const ClinicController=require('../controller/ClinicController')
let router = express.Router();

let initWebRoute=(app)=>{
    router.get('/api/user/list',AdminController.getAllUsers)
    router.post('/api/user',AdminController.CreateANewUser);
    router.put('/api/edit-user',AdminController.EditUser);
    router.delete('/api/delete-user',AdminController.DeleteUser);
    router.post('/api/login',AdminController.LoginUser);
    router.get('/api/topdoc/list',DoctorController.getTopDoctors)
    router.get('/api/doctor/list',DoctorController.getAllDoctor);
    router.post('/api/doctor-info',DoctorController.SaveDoctorInfo)
    router.get('/api/doctor-info/detail',DoctorController.getDoctorInfo)
    router.post('/api/schedule',DoctorController.SaveSchedule)
    router.get('/api/date-schedule',DoctorController.getScheduleByDate)
    router.get('/api/check-count-schedule',DoctorController.getCountSlot)
    router.post('/api/patient-booking',PatientController.getPatientBooking)
    router.post('/api/verify-booking',PatientController.getVerifyBooking)
    router.post('/api/specialty',SpecialtyController.createSpecialty)
    router.get('/api/specialty/list',SpecialtyController.getAllSpecialties)
    router.get('/api/list-patient',DoctorController.getListPatient)
    router.post('/api/send-bill',DoctorController.SendBill)
    router.get('/api/specialty/detail',SpecialtyController.getDetailbyId)
    router.post('/api/clinic',ClinicController.createSpecialty)
    router.get('/api/clinic/list',ClinicController.getAllClinics)
    router.get('/api/clinic/detail',ClinicController.getDetailbyId)
    router.get('/api/get-list-accepted-booking',DoctorController.getlistAcceptedBooking)
    return app.use('/',router);
}
module.exports = initWebRoute;