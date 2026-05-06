'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn("Tipo_nota", "id_hex_Cor", {
      type: Sequelize.STRING,
      allowNull: true,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn("Tipo_nota", "id_hex_Cor", {
      type: Sequelize.INTEGER,
      allowNull: true,
    });
  }
};