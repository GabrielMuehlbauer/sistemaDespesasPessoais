// 1. IMPORTAÇÕES
const express = require('express');
const ExpenseView = require('./view/expense.js');

// 2. INICIALIZAÇÃO
const app = express();
const PORT = 3000;
const { version } = require('../package.json');


// 3. MIDDLEWARES (Configurações)
// Essa linha possibilita que o Express leia dados no formato JSON que virão nas requisições POST/PUT
app.use(express.json());

// 4. ROTAS
// Rota de teste
app.get('/', (req, res) => {
    res.status(200).json({ projeto: "Expenses Control",
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
app.delete('/api/expenses/:id', ExpenseView.delete);

// 5. LIGANDO O SERVIDOR
app.listen(PORT, () => {
    console.log(`Servidor rodando em: http://localhost:${PORT}/`);
});