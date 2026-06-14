"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Cidades", [
      {
        desc_cidade: "Curitiba",
        cod_estado: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        desc_cidade: "Buenos aires",
        cod_estado: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        desc_cidade: "Medellín",
        cod_estado: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {},
};
