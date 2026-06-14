"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Paises", [
      {
        desc_pais: "Brasil",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        desc_pais: "Argentina",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        desc_pais: "Colombia",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {

  },
};
