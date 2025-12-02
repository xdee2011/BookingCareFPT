const clinicServices = require("../services/clinicServices");

class ClinicController {
    createSpecialty = async (req, res) => {
      try {
        let info = await clinicServices.createSpecialty(req.body);
        return res.status(200).json(info);
      } catch (e) {
        return e;
      }
    };
  
    getAllClinics = async (req, res) => {
      try {
        let specialty = await clinicServices.getAllClinics();
        return res.status(200).json(specialty);
      } catch (e) {
        return e;
      }
    };
  
    getDetailbyId=async(req,res)=>{
      try{
        let specialty = await clinicServices.getDetailbyId(req.query.id,req.query.location);
        return res.status(200).json(specialty);
      }catch(e){
        return e
      }
    }
  }
  
  module.exports = new ClinicController();
  