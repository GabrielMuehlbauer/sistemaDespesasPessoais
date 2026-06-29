const express = require('express');
const ExpenseView = require('../views/expense.js');

const router = express.Router();

/* ROTAS PARA DESPESAS */
// Rota CREATE
router.post('/', ExpenseView.create);

// Rota READ (Listar)
router.get('/', ExpenseView.getAll);

// Buscar por ID
router.get('/:id', ExpenseView.getById);

// Rota UPDATE
router.put('/:id', ExpenseView.update);

// Rota DELETE
router.delete('/:id', ExpenseView.remove);

module.exports = router;