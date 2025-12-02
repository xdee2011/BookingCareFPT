const db = require("../models/index");
const emailService = require("./emailServices");

let getAllDoctors = async () => {
  try {
    let doctor = await db.User.findAll({
      where: { role: "Doctor" },
      attributes: {
        exclude: ["password", "image"],
      },
    });
    return {
      errCode: 0,
      data: doctor,
    };
  } catch (e) {
    return e;
  }
};

let getTopDoctors = async (limit) => {
  try {
    let top = await db.User.findAll({
      where: { role: "Doctor" },
      order: [["createdAt", "DESC"]],
      attributes: {
        exclude: ["password"],
      },
      include: [
        { model: db.DoctorInfo, as: "infoData", attributes: ["topDoc"] },
      ],
      raw: false,
    });
    return {
      errCode: 0,
      data: top,
    };
  } catch (e) {
    return e;
  }
};

let SaveInfoDoctor = async (data) => {
  try {
    if (!data) {
      return {
        errCode: -1,
        errMessage: "Missing input parameters",
      };
    } else {
      if (data.action === "CREATE") {
        await db.MarkDown.create({
          contentHtml: data.contentHtml,
          contentMarkdown: data.contentMarkdown,
          description: data.description,
          doctorId: data.doctorId,
        });
      } else if (data.action === "EDIT") {
        let in4 = await db.MarkDown.findOne({
          where: { doctorId: data.doctorId },
          raw: false,
        });
        if (in4) {
          in4.contentHtml = data.contentHtml;
          in4.contentMarkdown = data.contentMarkdown;
          in4.doctorId = data.doctorId;
          in4.description = data.description;

          await in4.save();
        }
      }

      let doctorIn4 = await db.DoctorInfo.findOne({
        where: { doctorId: data.doctorId },
        raw: false,
      });
      if (doctorIn4) {
        doctorIn4.doctorId = data.doctorId;
        doctorIn4.price = data.selectedPrice;
        doctorIn4.province = data.selectedProvince;
        doctorIn4.payment = data.selectedPayment;
        doctorIn4.specialtyId = data.specialtyId;
        doctorIn4.clinicId = data.selectedClinic;
        doctorIn4.addressClinic = data.addressClinic;
        doctorIn4.nameClinic = data.nameClinic;
        doctorIn4.note = data.note;
        doctorIn4.topDoc = data.topDoc;

        await doctorIn4.save();
      } else {
        await db.DoctorInfo.create({
          doctorId: data.doctorId,
          price: data.selectedPrice,
          province: data.selectedProvince,
          payment: data.selectedPayment,
          nameClinic: data.nameClinic,
          addressClinic: data.addressClinic,
          clinicId: data.clinicId,
          specialtyId: data.specialtyId,
          note: data.note,
          topDoc: data.topDoc,
        });
      }
      return {
        errCode: 0,
        errMessage: "Successfully",
      };
    }
  } catch (e) {
    return e;
  }
};

let getDoctorInfo = async (id) => {
  try {
    if (!id) {
      return {
        errCode: -1,
        errMessage: "Not Found",
      };
    } else {
      let doctor = await db.User.findOne({
        raw: false,
        where: { id: id },
        attributes: { exclude: ["password"] },
        include: [
          {
            model: db.MarkDown,
            attributes: ["description", "contentMarkdown", "contentHtml"],
          },
          { model: db.DoctorInfo, as: "infoData" },
        ],
      });
      if (!doctor) {
        doctor = {};
      }
      return {
        data: doctor,
        errCode: 0,
        errMessage: "Successfully",
      };
    }
  } catch (e) {
    return e;
  }
};

let SaveScheduleDoctor = async (data) => {
  try {
    if (!data) {
      return {
        errCode: 1,
        errMessage: "Missing parameter",
      };
    } else {
      try {
        let existing = await db.Schedule.findAll({
          attributes: {
            exclude: ["id", "createdAt", "updatedAt"],
          },
        });
        let schedule = data.scheduleArray;
        const resultsss = schedule.filter(
          ({ timeType: id1, doctorId: idd1, date: iddd1 }) =>
            !existing.some(
              ({ timeType: id2, doctorId: idd2, date: iddd2 }) =>
                id2 === id1 && idd1 === idd2 && iddd1 === iddd2
            )
        );
        //stackoverflow.com/questions/21987909/how-to-get-the-difference-between-two-arrays-of-objects-in-javascript
        const count = await db.Schedule.count();
        console.log(count);
        await db.Schedule.bulkCreate(resultsss);
        return {
          errCode: 0,
          errMessage: "OK",
        };
      } catch (e) {
        console.log(e);
      }
    }
  } catch (e) {
    return e;
  }
};

let getCountSlot = async (date, timeType, doctorId) => {
  try {
    const count = await db.Booking.count({
      where: { date: date, timeType: timeType, doctorId: doctorId },
    });
    console.log(count);
    if (count >= 0 && count < 2) {
      return {
        errCode: 0,
        errMessage: 'Slot'
      }
    }
    else {
      return {
        errCode: 1,
        errMessage: 'No slot available'
      }
    }
  } catch (e) {
    return e;
  }
};

let getScheduleByDate = async (doctorId, date) => {
  try {
    if (!doctorId || !date) {
      return {
        errCode: 1,
        errMessage: "Missing parameter",
      };
    } else {
      let dataSchedule = await db.Schedule.findAll({
        where: {
          doctorId: doctorId,
          date: date,
        },
        include: [
          { model: db.User, as: "doctorData", attributes: ["fullName"] },
        ],
        raw: false,
        nest: true,
      });
      if (!dataSchedule) {
        data = [];
      }
      return {
        errCode: 0,
        dataSchedule,
      };
    }
  } catch (e) {
    return e;
  }
};

let getListPatient = async (doctorId, date) => {
  try {
    if (!doctorId || !date) {
      return {
        errCode: 1,
        errMessage: "Missing parameter",
      };
    } else {
      let data = await db.Booking.findAll({
        where: {
          status: "VerifiedBooking",
          doctorId: doctorId,
          date: date,
        },
        raw: false,
        nest: true,
      });
      return {
        errCode: 0,
        data,
      };
    }
  } catch (e) { }
};

let SendBill = async (data) => {
  try {
    if (!data.email || !data.doctorId) {
      return {
        errCode: 1,
        errMessage: "Missing Information",
      };
    } else {
      let appointment = await db.Booking.findOne({
        where: {
          doctorId: data.doctorId,
          email: data.email,
          timeType: data.timeType,
          status: "VerifiedBooking",
        },
        raw: false,
      });

      if (appointment && data.isAccept === true) {
        appointment.status = "DoneProcessing";
        await appointment.save();
        await emailService.AcceptEmail(data);
        return {
          errCode: 0,
          errMessage: "Ok",
        };
      }
      if (appointment && data.isAccept === false) {
        appointment.status = "DeniedBooking";
        await appointment.save();
        await emailService.DeniedEmail(data);
        return {
          errCode: 0,
          errMessage: "Ok",
        };
      }
    }
  } catch (e) {
    console.log(e);
    return e;
  }
};

let getlistAcceptedBooking = async (doctorId,status) => {
  try{
    let a=await db.Booking.findAll({
      where: {
        status: "DoneProcessing",
        doctorId: doctorId,
      },
      raw: false,
      nest: true,
    })
    return{
      a
    }
  }catch(e){
    return e
  }
}

module.exports = {
  getAllDoctors,
  getTopDoctors,
  SaveInfoDoctor,
  getDoctorInfo,
  SaveScheduleDoctor,
  getScheduleByDate,
  getListPatient,
  SendBill,
  getCountSlot,
  getlistAcceptedBooking
};
