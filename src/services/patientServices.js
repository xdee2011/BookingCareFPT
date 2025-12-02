const db = require("../models/index");
const emailService = require("./emailServices");
const { v4: uuidv4 } = require("uuid");

let buildUrlEmail = (doctorId, token) => {
  let result = `http://localhost:3000/verify-booking?token=${token}&doctorId=${doctorId}`;
  return result;
};
let getPatientBooking = async (data) => {
  try {
    console.log(data);
    if (!data.email || !data.doctorId || !data.timeType) {
      return {
        errCode: 1,
        errMessage: "Missing input parameter",
      };
    } else {
      let token = uuidv4();
      await emailService.sendSimpleEmail({
        name: data.fullName,
        receiverEmail: data.email,
        time: data.timeString,
        doctorName: data.doctorName,
        redirect: buildUrlEmail(data.doctorId, token),
      });
      await db.Booking.findOrCreate({
        where: { email: data.email, token: token },
        defaults: {
          status: "Booking",
          email: data.email,
          fullName: data.fullName,
          phoneNumber: data.phoneNumber,
          doctorId: data.doctorId,
          timeType: data.timeType,
          doctorName: data.doctorName,
          date: data.date,
          token: token,
          address: data.address,
          reason: data.reason,
        },
      });
      return {
        errCode: 0,
        errMessage: "OK",
      };
    }

    //create booking record
  } catch (e) {
    return e;
  }
};

let getVerifyBooking = async (data) => {
  try {
    if (!data.token || !data.doctorId) {
      return {
        errCode: 1,
        errMessage: "Missing Parameter",
      };
    } else {
      let appointment = await db.Booking.findOne({
        where: {
          doctorId: data.doctorId,
          token: data.token,
        },
        raw: false,
      });
      if (appointment) {
        appointment.status = "VerifiedBooking";
        await appointment.save();
        return {
          errCode: 0,
          errMessage: "Update appointment successfully",
        };
      } else {
        return {
          errCode: 2,
          errMessage: "Appointment is active or does not exist",
        };
      }
    }
  } catch (e) {
    return e;
  }
};

module.exports = { getPatientBooking, getVerifyBooking };
