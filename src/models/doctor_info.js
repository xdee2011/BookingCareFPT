"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class DoctorInfo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      DoctorInfo.belongsTo(models.User, { foreignKey: "doctorId",targetKey:'id',as:'infoData' });
    }
  }
  DoctorInfo.init(
    {
      doctorId: DataTypes.INTEGER,
      specialtyId: DataTypes.INTEGER,
      clinicId: DataTypes.INTEGER,
      price: DataTypes.STRING,
      province: DataTypes.STRING,
      payment: DataTypes.STRING,
      addressClinic:DataTypes.STRING,
      nameClinic:DataTypes.STRING,
      note:DataTypes.STRING,           
      clinicId: DataTypes.INTEGER,
      topDoc:DataTypes.STRING,
      note:DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "DoctorInfo",
    }
  );
  return DoctorInfo;
};
