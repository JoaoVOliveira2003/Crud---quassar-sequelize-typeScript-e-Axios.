'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
 async up(queryInterface, Sequelize) {
  await queryInterface.addColumn("Usuario_notas", "titulo_nota", {
    type: Sequelize.STRING,
    allowNull: true,
  });
},
async down(queryInterface, Sequelize) {
  await queryInterface.removeColumn("Usuario_notas", "titulo_nota");
}
};
