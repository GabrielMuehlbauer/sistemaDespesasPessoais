const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth');

module.exports = (req, res, next) => {
    // Verifica se o token de autenticação foi fornecido no cabeçalho da requisição
    const authHeader = req.headers.authorization;

    // Se o token não for fornecido, retorna um erro de autenticação
    if (!authHeader) {
        return res.status(401).json({ error: 'Token de autenticação não fornecido.' });
    }

    // O token deve estar no formato "Bearer <token>", então dividimos o valor do cabeçalho para extrair o token
    const parts = authHeader.split(' ');

    // O token deve estar no formato "Bearer <token>", então verificamos se ele tem duas partes
    if (parts.length !== 2) {
        return res.status(401).json({ error: 'Token inválido.' });
    }

    // Extrai o esquema (Bearer) e o token propriamente dito
    const [scheme, token] = parts;

    // Verifica se o esquema é "Bearer" (ignorando maiúsculas/minúsculas)
    if (!/^Bearer$/i.test(scheme)) {
        return res.status(401).json({ error: 'Token mal formatado.' });
    }

    // Verifica o token usando a chave secreta definida na configuração de autenticação
    jwt.verify(token, authConfig.jwt.secret, (err, decoded) => {
        if (err) {
            return res.status(401).json({ error: 'Token inválido.' });
        }

        req.user = decoded; // Armazena as informações do usuário decodificadas no objeto de requisição

        return next(); // Continua para a próxima etapa do processamento da requisição
    });

};
