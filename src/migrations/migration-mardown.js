"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("MarkDowns", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      contentHtml: {
        type: Sequelize.TEXT('long'),
      },
      contentMarkdown: {
        type: Sequelize.TEXT('long'),
      },
      doctorId: {
        type: Sequelize.INTEGER,
      },
      specialtyId: {
        type: Sequelize.INTEGER,
      },
      clinicId: {
        type: Sequelize.INTEGER,
      },
      description: {
        type: Sequelize.TEXT('long'),
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("MarkDowns");
  },
};
