export default {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkUpdate(
      'Tipo_nota',
      { id_hex_Cor: '#00FF00' },
      { id_tipo_nota: 1 }
    );

    await queryInterface.bulkUpdate(
      'Tipo_nota',
      { id_hex_Cor: '#FFFF00' }, 
      { id_tipo_nota: 2 }
    );

    await queryInterface.bulkUpdate(
      'Tipo_nota',
      { id_hex_Cor: '#FF0000' }, 
      { id_tipo_nota: 3 }
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkUpdate(
      'Tipo_nota',
      { id_hex_Cor: null },
      { id_tipo_nota: [1, 2, 3] }
    );
  }
};