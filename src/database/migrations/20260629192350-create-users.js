'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // O método 'up' diz o que a migration deve fazer no banco de dados.
    // Neste caso, criar a tabela 'users'.
    await queryInterface.createTable('users', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true // Garante que não teremos dois usuários com o mesmo e-mail
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false
      },
      role: {
        type: Sequelize.STRING,
        defaultValue: 'user'
      },
      // createdAt e updatedAt são obrigatórios nas migrations do Sequelize
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false
      }
    });
  },

  async down (queryInterface, Sequelize) {
    // O método 'down' é acionado caso você precise reverter (desfazer) a migration.
    // Ele simplesmente apaga a tabela 'users' que o método 'up' criou.
    await queryInterface.dropTable('users');
  }
};