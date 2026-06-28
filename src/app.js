// IMPORTAÇÕES
const express = require('express');
const { sequelize } = require('./model/database.js');
const ExpenseView = require('./view/expense.js');
const CategoryView = require('./view/category.js');
const UserView = require('./view/user.js');
const authMiddleware = require('./middleware/auth.js');
const DashboardView = require('./view/dashboard');

require('./model/associations.js'); // Importa as associações entre os modelos

// INICIALIZAÇÃO
const app = express();
const PORT = 3000;
const { version } = require('../package.json');


// MIDDLEWARES (Configurações)
// Essa linha possibilita que o Express leia dados no formato JSON que virão nas requisições POST/PUT
app.use(express.json());

// ROTAS
// Rota de teste
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

/* ROTAS PARA AUTENTICAÇÃO */
// Rota CREATE (Cadastro)
app.post('/api/users', UserView.create);

// Rota LOGIN
app.post('/api/auth/login', UserView.login);

app.use(authMiddleware); // Aplica o middleware de autenticação para as rotas abaixo, garantindo que apenas usuários autenticados possam acessá-las

/* ROTAS PARA DASHBOARD */  
// Rota Valor Total das Despesas
app.get('/dashboard/total-expenses', DashboardView.getTotalExpenses);

// Rota Quantidade de Despesas
app.get('/dashboard/expenses-count', DashboardView.getExpensesCount);

// Rota Valor por Categoria
app.get('/dashboard/expenses-by-category', DashboardView.getExpensesByCategory);

/* ROTAS PARA DESPESAS */
// Rota CREATE
app.post('/api/expenses', ExpenseView.create);

// Rota READ (Listar)
app.get('/api/expenses', ExpenseView.getAll);

// Buscar por ID
app.get('/api/expenses/:id', ExpenseView.getById);

// Rota UPDATE
app.put('/api/expenses/:id', ExpenseView.update);

// Rota DELETE
app.delete('/api/expenses/:id', ExpenseView.remove);

/* ROTAS PARA CATEGORIAS */
// Rota CREATE
app.post('/api/categories', CategoryView.create);

// Rota READ (Listar)
app.get('/api/categories', CategoryView.getAll);

// Rota READ (Obter por ID)
app.get('/api/categories/:id', CategoryView.getById);

// Rota UPDATE
app.put('/api/categories/:id', CategoryView.update);

// Rota DELETE
app.delete('/api/categories/:id', CategoryView.remove);

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
