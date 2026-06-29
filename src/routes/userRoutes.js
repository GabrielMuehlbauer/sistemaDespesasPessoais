const express = require('express');
const UserView = require('../views/user.js');

const router = express.Router();

/* ROTAS PARA AUTENTICAÇÃO */
// Rota CREATE (Cadastro)
router.post('/users', UserView.create);

// Rota LOGIN
router.post('/auth/login', UserView.login);

module.exports = router;