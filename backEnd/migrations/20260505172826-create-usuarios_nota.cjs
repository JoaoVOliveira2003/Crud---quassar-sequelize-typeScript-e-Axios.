"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Usuario_notas", {
      id_nota:  {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      desc_nota: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      id_tipo_nota: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      finalizada_nota: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
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

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Usuario_notas");
  },
};
