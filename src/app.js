// IMPORTAÇÕES
const express = require('express');
const { sequelize } = require('./model/database.js');
const ExpenseView = require('./view/expense.js');

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

// Rota CREATE
app.post('/api/expenses', ExpenseView.create);

// Rota READ (Listar)
app.get('/api/expenses', ExpenseView.getAll);

// Rota Valor Total das Despesas
app.get('/api/expenses/summary/total', ExpenseView.getTotal);

// Rota Valor por Categoria
app.get('/api/expenses/summary/category', ExpenseView.getByCategory);

// Buscar por ID
app.get('/api/expenses/:id', ExpenseView.getById);

// Rota UPDATE
app.put('/api/expenses/:id', ExpenseView.update);

// Rota DELETE
app.delete('/api/expenses/:id', ExpenseView.remove);

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
