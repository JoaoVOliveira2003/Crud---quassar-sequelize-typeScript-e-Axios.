"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Usuario_notas", [
      {
        desc_nota: "Comprar arroz e feijão",
        id_tipo_nota: 1,
        finalizada_nota: false,
        id_usuario: 1,
        titulo_nota: "Lista de compras",
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      {
        desc_nota: "Estudar Sequelize por 2 horas",
        id_tipo_nota: 2,
        finalizada_nota: false,
        id_usuario: 1,
        titulo_nota: "Meta de estudo",
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      {
        desc_nota: "Treino de pernas concluído",
        id_tipo_nota: 3,
        finalizada_nota: true,
        id_usuario: 1,
        titulo_nota: "Academia",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Usuario_notas", null, {});
  },
};
