const db = require("../models/index");
let createSpecialty = async (data) => {
  try {
    if (
      !data.name ||
      !data.imageBase64 ||
      !data.descriptionHtml ||
      !data.descriptionMarkdown
    ) {
      return {
        errCode: 1,
        errMessage: "Missing input parameter",
      };
    } else {
      await db.Specialty.create({
        name: data.name,
        image: data.imageBase64,
        descriptionHtml: data.descriptionHtml,
        descriptionMarkdown: data.descriptionMarkdown,
      });

      return {
        errCode: 0,
        errMessage: "Ok",
      };
    }
  } catch (e) {
    return e;
  }
};

let getAllSpecialties = async () => {
  try {
    let doctor = await db.Specialty.findAll();
    return {
      errCode: 0,
      data: doctor,
    };
  } catch (e) {
    return e;
  }
};

let getDetailbyId = async (id, location) => {
  try {
    if (!id || !location) {
      return {
        errCode: 1,
        errMessage: "Missing input parameter",
      };
    } else {
      if (location === "ALL") {
        let data = await db.Specialty.findOne({
          where: { id: id },
          attributes: ["descriptionHtml", "descriptionMarkdown"],
        });

        let doctorSpecialty = await db.DoctorInfo.findAll({
          where: { specialtyId: id },
          attributes: ["doctorId", "province"],
        });
        data.doctorSpecialty = doctorSpecialty;
        return {
          errCode: 0,
          errMessage: "Ok",
          data: {
            data,
            doctorSpecialty,
          },
        };
      } else {
        let data = await db.Specialty.findOne({
          where: { id: id },
          attributes: ["descriptionHtml", "descriptionMarkdown"],
        });

        if (data) {
          let doctorSpecialty = await db.DoctorInfo.findAll({
            where: { specialtyId: id, province: location },
            attributes: ["doctorId", "province"],
          });
          data.doctorSpecialty = doctorSpecialty;
          return {
            errCode: 0,
            errMessage: "Ok",
            data: {
              data,
              doctorSpecialty,
            },
          };
        }
      }
    }
  } catch (e) {
    return e;
  }
};
module.exports = { createSpecialty, getAllSpecialties, getDetailbyId };
