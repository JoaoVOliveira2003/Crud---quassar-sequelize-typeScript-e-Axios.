"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("Cidades", "cod_estado", {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: "Estados",
        //  unique: true, // <- garante 1:1
        key: "cod_estado",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("Cidades", "cod_estado");
  },
};
