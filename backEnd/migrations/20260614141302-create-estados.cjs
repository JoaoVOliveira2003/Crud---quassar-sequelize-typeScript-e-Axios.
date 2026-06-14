'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
      await queryInterface.createTable('Estados', {
        cod_estado: {
          type: Sequelize.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
        },

        desc_estado: {
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

        cod_pais:{
          type:Sequelize.INTEGER,
          allowNull:false,
        references: {
          model: "Paises",
          key: "cod_pais",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        }
      });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable("paises");
  }
};
