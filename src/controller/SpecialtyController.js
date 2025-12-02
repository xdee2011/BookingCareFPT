const specialtyService = require("../services/specialtyServices");
class SpecialtyController {
  createSpecialty = async (req, res) => {
    try {
      let info = await specialtyService.createSpecialty(req.body);
      return res.status(200).json(info);
    } catch (e) {
      return e;
    }
  };

  getAllSpecialties = async (req, res) => {
    try {
      let specialty = await specialtyService.getAllSpecialties();
      return res.status(200).json(specialty);
    } catch (e) {
      return e;
    }
  };

  getDetailbyId=async(req,res)=>{
    try{
      let specialty = await specialtyService.getDetailbyId(req.query.id,req.query.location);
      return res.status(200).json(specialty);
    }catch(e){
      return e
    }
  }
}

module.exports = new SpecialtyController();
