'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const tableExists = await queryInterface.sequelize.query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public'
        AND table_name = 'Usuarios'
      );
    `);

    const exists = tableExists[0][0].exists;

    if (!exists) {
      await queryInterface.createTable('Usuarios', {
        id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
        },

        nome: {
          type: Sequelize.STRING,
          allowNull: false,
        },

        dataDeNascimento: {
          type: Sequelize.DATE,
          allowNull: true,
        },

        peso: {
          type: Sequelize.INTEGER,
          allowNull: true,
        },

        altura: {
          type: Sequelize.DOUBLE,
          allowNull: true,
        },

        createdAt: {
          type: Sequelize.DATE,
          allowNull: false,
        },

        updatedAt: {
          type: Sequelize.DATE,
          allowNull: false,
        },

        id_tipo_usuario: {
          type: Sequelize.INTEGER,
          allowNull: true,
        },
      });
    }
  },

  async down(queryInterface) {
    await queryInterface.dropTable('Usuarios');
  },
};