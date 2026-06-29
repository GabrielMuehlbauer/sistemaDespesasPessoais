// Arquivo: src/models/database.js
const { Sequelize } = require('sequelize');

// Importa as credenciais que definimos no arquivo de config
const dbConfig = require('../config/database.js'); 

// Pega apenas as configurações do ambiente de desenvolvimento
const configDeAcesso = dbConfig.development;

console.log('Iniciando conexão com:', configDeAcesso.database);

// Fazer conexão com MySQL repassando os dados do config
const sequelize = new Sequelize(
  configDeAcesso.database,
  configDeAcesso.username,
  configDeAcesso.password,
  {
    dialect: configDeAcesso.dialect,
    host: configDeAcesso.host,
    port: configDeAcesso.port
  }
);

module.exports = { sequelize };