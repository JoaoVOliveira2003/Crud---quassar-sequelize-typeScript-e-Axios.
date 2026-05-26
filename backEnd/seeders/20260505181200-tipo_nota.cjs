'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('Tipo_nota', [
      { desc_tipo_nota: 'Tranquilo', createdAt: new Date(), updatedAt: new Date() },
      { desc_tipo_nota: 'Atenção', createdAt: new Date(), updatedAt: new Date() },
      { desc_tipo_nota: 'Urgente', createdAt: new Date(), updatedAt: new Date() },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Tipo_nota', null, {});
  }
};
