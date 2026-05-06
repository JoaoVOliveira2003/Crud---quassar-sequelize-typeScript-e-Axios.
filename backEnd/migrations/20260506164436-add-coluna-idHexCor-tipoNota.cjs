'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
 async up(queryInterface, Sequelize) {
  await queryInterface.addColumn("Tipo_nota", "id_hex_Cor", {
    type: Sequelize.INTEGER,
    allowNull: true,
  });
},
async down(queryInterface, Sequelize) {
  await queryInterface.removeColumn("Tipo_nota", "id_hex_Cor");
}
};
