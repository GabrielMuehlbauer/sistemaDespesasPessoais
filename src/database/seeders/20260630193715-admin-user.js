'use strict';

// Importamos as bibliotecas necessárias
const bcrypt = require('bcrypt');
const crypto = require('crypto'); // Módulo nativo do Node.js para gerar UUIDs

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    
    // Criptografando a senha manualmente antes de inserir
    // O número 10 define o "saltRounds", a mesma complexidade usada no seu Model
    const hashedPassword = await bcrypt.hash('admin123', 10);

    // 2. Inserindo os dados na tabela 'users'
    await queryInterface.bulkInsert('users', [
      {
        id: crypto.randomUUID(), // Gera o ID único dinamicamente
        name: 'Administrador',
        email: 'admin@expensescontrol.com',
        password: hashedPassword, // Injetando a senha já protegida
        role: 'admin',
        createdAt: new Date(),    // Carimbo exato do momento da inserção
        updatedAt: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    // 3. Revertendo a ação: apaga apenas o usuário que tenha este e-mail específico
    await queryInterface.bulkDelete('users', { email: 'admin@expensescontrol.com' }, {});
  }
};