import axios from "axios";

const handleLoginApi = (email, password) => {
  return axios.post("http://localhost:8000/api/login", { email, password });
};

const createNewUser = (data) => {
  return axios.post("http://localhost:8000/api/user", data);
};

const getAllUsers = () => {
  return axios.get("http://localhost:8000/api/user/list");
};

const EditAnUser = (user) => {
  return axios.put("http://localhost:8000/api/edit-user", user);
};

const DeleteUser = (userId) => {
  return axios.delete("http://localhost:8000/api/delete-user", {
    data: {
      id: userId,
    },
  });
};

const getListAccpetBooking = (doctorId,status) => {
  return axios.get(`http://localhost:8000/api/get-list-accepted-booking?doctorId=${doctorId}&status=${status}`);
};

const getTopDoctor = () => {
  return axios.get("http://localhost:8000/api/topdoc/list");
};

const getAllDoctors = () => {
  return axios.get("http://localhost:8000/api/doctor/list");
};

const getInfoDoctor = (inputId) => {
  return axios.get(
    `http://localhost:8000/api/doctor-info/detail?doctorId=${inputId}`
  );
};

const postDoctorInfo = (data) => {
  return axios.post("http://localhost:8000/api/doctor-info", data);
};

const SaveSchedule = (data) => {
  return axios.post("http://localhost:8000/api/schedule", data);
};

const getDetailsSchedule = (doctorId, date) => {
  return axios.get(
    `http://localhost:8000/api/date-schedule?doctorId=${doctorId}&date=${date}`
  );
};

const postBooking = (data) => {
  return axios.post("http://localhost:8000/api/verify-booking", data);
};

const getSpecialtyDetail = (data) => {
  return axios.get(
    `http://localhost:8000/api/specialty/detail?id=${data.id}&location=${data.location}`
  );
};

const createSpecialty = (data) => {
  return axios.post("http://localhost:8000/api/specialty", data);
};

const getSpecialty = () => {
  return axios.get("http://localhost:8000/api/specialty/list");
};

const getPatientForDoctor = (data) => {
  return axios.get(
    `http://localhost:8000/api/list-patient?doctorId=${data.doctorId}&date=${data.date}`
  );
};

const confirmBooking = (data) => {
  return axios.post("http://localhost:8000/api/patient-booking", data);
};

const sendDataBill = (data) => {
  return axios.post("http://localhost:8000/api/send-bill", data);
};

const createClinic = (data) => {
  return axios.post("http://localhost:8000/api/clinic", data);
};

const getAllClinic = () => {
  return axios.get("http://localhost:8000/api/clinic/list");
};

const getDetailClinic = (data) => {
  return axios.get(`http://localhost:8000/api/clinic/detail?id=${data.id}`);
};

const getCountSchedule = (data) => {
  return axios.get(`http://localhost:8000/api/check-count-schedule?doctorId=${data.doctorId}&timeType=${data.date}&date=${data.timeType}`);
};
export {
  handleLoginApi,
  createNewUser,
  getAllUsers,
  EditAnUser,
  DeleteUser,
  getTopDoctor,
  getAllClinic,
  getAllDoctors,
  sendDataBill,
  getInfoDoctor,
  postDoctorInfo,
  getListAccpetBooking,
  SaveSchedule,
  getDetailsSchedule,
  postBooking,
  confirmBooking,
  createSpecialty,
  getSpecialty,
  getPatientForDoctor,
  getSpecialtyDetail,
  createClinic,
  getDetailClinic,
  getCountSchedule
};
