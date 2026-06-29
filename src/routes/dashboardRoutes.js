const express = require('express');
const DashboardView = require('../views/dashboard.js');

const router = express.Router();

/* ROTAS PARA DASHBOARD */  
// Rota Valor Total das Despesas
router.get('/total-expenses', DashboardView.getTotalExpenses);

// Rota Quantidade de Despesas
router.get('/expenses-count', DashboardView.getExpensesCount);

// Rota Valor por Categoria
router.get('/expenses-by-category', DashboardView.getExpensesByCategory);

module.exports = router;