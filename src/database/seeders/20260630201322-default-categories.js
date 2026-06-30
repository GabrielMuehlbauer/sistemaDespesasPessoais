'use strict';

const crypto = require('crypto');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // 1. BUSCA: Fazemos uma consulta SQL pura para pegar o ID do Admin
    const [users] = await queryInterface.sequelize.query(
      `SELECT id FROM users WHERE email = 'admin@expensescontrol.com';`
    );

    // Proteção: Se o admin não existir, paramos o processo para não dar erro
    if (!users || users.length === 0) {
      console.log('Admin não encontrado. Impossível vincular categorias.');
      return;
    }

    // Extraímos o ID do primeiro resultado da busca
    const adminId = users[0].id;

    // 2. INSERÇÃO: Criamos as categorias já atreladas ao adminId
    await queryInterface.bulkInsert('categories', [
      {
        id: crypto.randomUUID(),
        name: 'Alimentação',
        description: 'Gastos com mercado, padaria, restaurantes e lanches.',
        userId: adminId,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: crypto.randomUUID(),
        name: 'Transporte',
        description: 'Combustível, ônibus, Uber, manutenção do veículo.',
        userId: adminId,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: crypto.randomUUID(),
        name: 'Lazer',
        description: 'Cinema, viagens, assinaturas de streaming, etc.',
        userId: adminId,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    // Para desfazer, buscamos o ID do admin novamente...
    const [users] = await queryInterface.sequelize.query(
      `SELECT id FROM users WHERE email = 'admin@expensescontrol.com';`
    );

    if (users && users.length > 0) {
      const adminId = users[0].id;
      // ...e apagamos apenas as categorias que pertencem a ele
      await queryInterface.bulkDelete('categories', { userId: adminId }, {});
    }
  }
};