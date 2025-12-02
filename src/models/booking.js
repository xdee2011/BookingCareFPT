"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {

    }
  }
  Booking.init(
    {
      status: DataTypes.STRING,
      doctorId: DataTypes.INTEGER,
      fullName: DataTypes.STRING,
      email: DataTypes.STRING,
      phoneNumber: DataTypes.STRING,
      address: DataTypes.STRING,
      date: DataTypes.STRING,
      timeType: DataTypes.STRING,
      token: DataTypes.STRING,
      address: DataTypes.STRING,
      reason: DataTypes.STRING
    },
    {
      sequelize,
      modelName: "Booking",
    }
  );
  return Booking;
};
