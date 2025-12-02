"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasOne(models.MarkDown, { foreignKey: "doctorId" });
      User.hasOne(models.DoctorInfo, {
        foreignKey: "doctorId",
        targetKey: "id",
        as: "infoData",
      });
      User.hasMany(models.Schedule, {
        foreignKey: "id",
        targetKey: "doctorId",
        as: "doctorData",
      });
    }
  }
  User.init(
    {
      fullName: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      role: DataTypes.STRING,
      phone: DataTypes.STRING,
      position: DataTypes.STRING,
      image: DataTypes.TEXT("long"),
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
