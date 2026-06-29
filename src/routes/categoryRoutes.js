const express = require('express');
const CategoryView = require('../views/category.js');

const router = express.Router();

/* ROTAS PARA CATEGORIAS */
// Rota CREATE
router.post('/', CategoryView.create);

// Rota READ (Listar)
router.get('/api/categories', CategoryView.getAll);

// Rota READ (Obter por ID)
router.get('/:id', CategoryView.getById);

// Rota UPDATE
router.put('/:id', CategoryView.update);

// Rota DELETE
router.delete('/:id', CategoryView.remove);

module.exports = router;