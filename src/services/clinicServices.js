const db = require("../models/index");
let createSpecialty = async (data) => {
  try {
    if (
      !data.name ||
      !data.address ||
      !data.imageBase64 ||
      !data.descriptionHtml ||
      !data.descriptionMarkdown
    ) {
      return {
        errCode: 1,
        errMessage: "Missing input parameter",
      };
    } else {
      await db.Clinic.create({
        name: data.name,
        address: data.address,
        imageMap: data.imageMap,
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

let getAllClinics = async () => {
  try {
    let doctor = await db.Clinic.findAll();
    return {
      errCode: 0,
      data: doctor,
    };
  } catch (e) {
    return e;
  }
};
let getDetailbyId = async (id) => {
  try {
    if (!id) {
      return {
        errCode: 1,
        errMessage: "Missing input parameter",
      };
    } else {
      let doctor = await db.Clinic.findOne({
        raw: false,
        where: { id: id },
      });
      return{
        errCode: 0,
        errMessage: "Ok",
        data: doctor,
      }
    }
  } catch (e) {
    return e;
  }
};

module.exports = { createSpecialty, getAllClinics, getDetailbyId };
