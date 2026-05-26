'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const tableExists = await queryInterface.sequelize.query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public'
        AND table_name = 'Enderecos'
      );
    `);

    const exists = tableExists[0][0].exists;

    if (!exists) {
      await queryInterface.createTable('Enderecos', {
        id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
        },

        rua: {
          type: Sequelize.STRING,
          allowNull: false,
        },

        numero: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },

        cod_cidade: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },

        id_usuario: {
          type: Sequelize.INTEGER,
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
    await queryInterface.dropTable('Enderecos');
  },
};