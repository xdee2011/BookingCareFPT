const patientService = require("../services/patientServices");
class PatientController {
  getPatientBooking = async (req, res) => {
    try {
      let data = await patientService.getPatientBooking(req.body);
      return res.status(200).json(data);
    } catch (e) {
      console.log(e);
      return res.status(200).json({
        errCode: -1,
        errMessage: "Error from sever",
      });
    }
  };

  getVerifyBooking = async (req, res) => {
    try {
      let data = await patientService.getVerifyBooking(req.body);
      console.log("aa,", data);
      return res.status(200).json(data);
    } catch (e) {
      console.log(e);
      return res.status(200).json({
        errCode: -1,
        errMessage: "Error from sever",
      });
    }
  };
}
module.exports = new PatientController();
