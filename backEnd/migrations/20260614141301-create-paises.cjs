'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
      await queryInterface.createTable('Paises', {
        cod_pais: {
          type: Sequelize.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
        },

        desc_pais: {
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

        id_tipo_usuario: {
          type: Sequelize.INTEGER,
          allowNull: true,
        },
      });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable("paises");
  }
};
