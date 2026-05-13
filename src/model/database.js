// Importar o Sequelize
const { Sequelize } = require('sequelize');

// Fazer conexão com MySQL
const sequelize = new Sequelize('expenses_control', 'root', '', { dialect: 'mysql' });

// Exportar
module.exports = {
    sequelize
};