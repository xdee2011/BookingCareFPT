const doctorServices = require("../services/doctorServices");

class DoctorController {
  getTopDoctors = async (req, res) => {
    try {
      let topDocs = await doctorServices.getTopDoctors(+10);
      return res.status(200).json(topDocs);
    } catch (e) {
      print(e);
    }
  };

  getAllDoctor = async (req, res) => {
    let AllDocs = await doctorServices.getAllDoctors();
    return res.status(200).json(AllDocs);
  };

  SaveDoctorInfo = async (req, res) => {
    let response = await doctorServices.SaveInfoDoctor(req.body);
    return res.status(200).json(response);
  };

  getDoctorInfo = async (req, res) => {
    let doc = await doctorServices.getDoctorInfo(req.query.doctorId);
    return res.status(200).json(doc);
  };

  SaveSchedule = async (req, res) => {
    let schedule = await doctorServices.SaveScheduleDoctor(req.body);
    return res.status(200).json(schedule);
  };

  getScheduleByDate = async (req, res) => {
    try {
      let data = await doctorServices.getScheduleByDate(
        req.query.doctorId,
        req.query.date
      );
      return res.status(200).json(data);
    } catch (e) {
      console.log(e);
      return res.status(200).json({
        errCode: -1,
        errMessage: "Error from sever",
      });
    }
  };
  getListPatient = async (req, res) => {
    try{
      let doc = await doctorServices.getListPatient(req.query.doctorId,req.query.date);
      return res.status(200).json(doc);
    }
    catch(e){
      return e
    }
  };

  getCountSlot=async(req,res)=>{
    try{
      let doc = await doctorServices.getCountSlot(req.query.timeType,req.query.date,req.query.doctorId);
      return res.status(200).json(doc);
    }
    catch(e){
      return e
    }
  }

  SendBill=async(req,res)=>{
    let schedule = await doctorServices.SendBill(req.body);
    return res.status(200).json(schedule);
  }

  getlistAcceptedBooking=async(req,res)=>{
    try{
      let doc = await doctorServices.getlistAcceptedBooking(req.query.doctorId,req.query.status);
      return res.status(200).json(doc);
    }
    catch(e){
      return e;
    }
  }
}

module.exports = new DoctorController();
