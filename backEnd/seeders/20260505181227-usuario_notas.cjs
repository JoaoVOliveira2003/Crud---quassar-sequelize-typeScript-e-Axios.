'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Usuario_notas', [
      {
        id_usuario: 337,
        finalizada_nota: false,
        id_tipo_nota: 1,
        desc_nota: 'Usuário solicitou atualização de cadastro.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id_usuario: 337,
        finalizada_nota: true,
        id_tipo_nota: 2,
        desc_nota: 'Documento enviado e validado com sucesso.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id_usuario: 337,
        finalizada_nota: false,
        id_tipo_nota: 3,
        desc_nota: 'Pendente retorno do setor responsável.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id_usuario: 337,
        finalizada_nota: true,
        id_tipo_nota: 1,
        desc_nota: 'Revisão de dados concluída sem inconsistências.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id_usuario: 337,
        finalizada_nota: false,
        id_tipo_nota: 2,
        desc_nota: 'Aguardando aprovação do gestor para prosseguir.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id_usuario: 337,
        finalizada_nota: true,
        id_tipo_nota: 3,
        desc_nota: 'Contato realizado e situação regularizada.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id_usuario: 337,
        finalizada_nota: false,
        id_tipo_nota: 1,
        desc_nota: 'Verificação de histórico em andamento.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id_usuario: 337,
        finalizada_nota: true,
        id_tipo_nota: 2,
        desc_nota: 'Nota de acompanhamento registrada conforme solicitado.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id_usuario: 337,
        finalizada_nota: false,
        id_tipo_nota: 3,
        desc_nota: 'Divergência identificada, análise iniciada.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id_usuario: 337,
        finalizada_nota: true,
        id_tipo_nota: 1,
        desc_nota: 'Processo encerrado após validação completa.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Usuario_notas', {
      id_usuario: 337,
    });
  },
};