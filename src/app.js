// 1. IMPORTAÇÕES
const express = require('express');
const fs = require('fs'); // Ferramenta para manipular arquivos JSON (expenses.json)
const crypto = require('crypto'); // Ferramenta para gerar IDs únicos
const ExpenseView = require('./view/expense.js');

// 2. INICIALIZAÇÃO
const app = express();
const PORT = 3000;

// 3. MIDDLEWARES (Configurações)
// Essa linha possibilita que o Express leia dados no formato JSON que virão nas requisições POST/PUT
app.use(express.json());

// 4. ROTAS
// Rota de teste
app.get('/', (req, res) => {
    res.status(200).json({ mensagem: "Seja bem vindo a API de Despesas Pessoais! Essa API foi construida por Gabriel Müehlbauer. Para mais detalhes leia o arquivo README.md no repositório do projeto (https://github.com/GabrielMuehlbauer/sistemaDespesasPessoais.git)." });
});

// Rota CREATE
app.post('/expenses', ExpenseView.create());

// Rota READ (Listar)
app.get('/expenses', ExpenseView.getAll());

// Rota Valor por Categoria
app.get('/expenses/summary/category', ExpenseView.getByCategory());

// Buscar por ID
app.get('/expenses/:id', ExpenseView.getById());

// Rota UPDATE
app.put('/expenses/:id', ExpenseView.update());

// Rota DELETE
app.delete('/expenses/:id', ExpenseView.delete());

// 5. LIGANDO O SERVIDOR
app.listen(PORT, () => {
    console.log(`Servidor rodando em: http://localhost:${PORT}/`);
});