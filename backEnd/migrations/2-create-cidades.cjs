'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const tableExists = await queryInterface.sequelize.query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public'
        AND table_name = 'Cidades'
      );
    `);

    const exists = tableExists[0][0].exists;

    if (!exists) {
      await queryInterface.createTable('Cidades', {
        cod_cidade: {
          type: Sequelize.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
        },

        desc_cidade: {
          type: Sequelize.STRING,
          allowNull: false,
        },

        createdAt: {
          type: Sequelize.DATE,
          allowNull: false,
        },

        updatedAt: {
          type: Sequelize.DATE,
          allowNull: false,
        },
      });
    }
  },

  async down(queryInterface) {
    await queryInterface.dropTable('Cidades');
  },
};