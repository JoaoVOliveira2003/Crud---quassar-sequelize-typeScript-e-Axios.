"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Cidades", [
      {
        desc_cidade: "São Paulo",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        desc_cidade: "Ivaipora",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        desc_cidade: "Marte",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {},
};
