"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Estados", [
      {
        desc_estado: "Paraná",
        cod_pais: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        desc_estado: "La plata",
        cod_pais: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        desc_estado: "Antioquia",
        cod_pais: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
