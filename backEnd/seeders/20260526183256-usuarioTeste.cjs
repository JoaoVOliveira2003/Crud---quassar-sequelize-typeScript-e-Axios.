"use strict";

const CryptoJS = require("crypto-js");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert("Usuarios", [
      {
        nome: "Juliano",
        dataDeNascimento: new Date(),
        peso: 67,
        altura: 1.67,
        createdAt: new Date(),
        updatedAt: new Date(),
        criadoPor: 1,
        id_tipo_usuario: 1,
      },
    ]);

    await queryInterface.bulkInsert("Login", [
      {
        email: "senha@gmail.com",
        senha: CryptoJS.HmacSHA256(
          "senha",
          "chaveSecreta"
        ).toString(),

        createdAt: new Date(),
        updatedAt: new Date(),
        id_usuario: 1,
      },
    ]);

    await queryInterface.bulkInsert("Enderecos", [
      {
        rua: "Rua do caqui",
        numero: 2,
        cod_cidade: 1,
        id_usuario: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("Enderecos", null, {});
    await queryInterface.bulkDelete("Login", null, {});
    await queryInterface.bulkDelete("Usuarios", null, {});
  },
};