// IMPORTAÇÕES
const express = require('express');
const { sequelize } = require('./config/database.js');
const authMiddleware = require('./middleware/auth.js');
require('./models/associations.js'); // Importa as associações entre os modelos

const userRoutes = require('./routes/userRoutes.js');
const dashboardRoutes = require('./routes/dashboardRoutes.js');
const expenseRoutes = require('./routes/expenseRoutes.js');
const categoryRoutes = require('./routes/categoryRoutes.js');


// INICIALIZAÇÃO
const app = express();
const PORT = 3000;
const { version } = require('../package.json');


// MIDDLEWARES (Configurações)
// Essa linha possibilita que o Express leia dados no formato JSON que virão nas requisições POST/PUT
app.use(express.json());

// ROTAS
// Rota de boas vindas
app.get('/', (req, res) => {
    res.status(200).json({
        projeto: "Expenses Control",
        descricao: "API REST para gerenciamento de despesas.",
        versao: version,
        autor: "Gabriel Müehlbauer",
        status: "online",
        documentacao: "https://github.com/GabrielMuehlbauer/sistemaDespesasPessoais#readme"
    });
});

// Usuário (Pública)
app.use('/api', userRoutes);

// Autenticação
app.use(authMiddleware);

// Dashboard
app.use('/api/dashboard', dashboardRoutes);

// Despesas
app.use('/api/expenses', expenseRoutes);

// Categorias
app.use('/api/categories', categoryRoutes);

async function main() {
    try {
        // Testa se o login e a senha do banco de dados estão corretos
        await sequelize.authenticate();
        // Cria a tabela no banco de dados, caso ela ainda não exista
        await sequelize.sync( {alter: true} );
        console.log("Conexão com o banco de dados estabelecida com sucesso!");
        // LIGANDO O SERVIDOR
        app.listen(PORT, () => {
            console.log(`Servidor rodando em: http://localhost:${PORT}/`);
        });
    } catch (error) {
        console.error("Erro ao iniciar o servidor:", error);
    }
}

main();
