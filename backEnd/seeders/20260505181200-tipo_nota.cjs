'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('Tipo_nota', [
      { desc_tipo_nota: 'Verde', createdAt: new Date(), updatedAt: new Date() },
      { desc_tipo_nota: 'Amarelo', createdAt: new Date(), updatedAt: new Date() },
      { desc_tipo_nota: 'Vermelho', createdAt: new Date(), updatedAt: new Date() },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Tipo_nota', null, {});
  }
};
