const UserModel = require('../model/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth');

class UserController {

    // Função de Cadastro
    async create(name, email, password) {
        // Verifica se o email já existe
        const existingUser = await UserModel.getByEmail(email);
        if (existingUser) {
            const erro = new Error("Email já cadastrado.");
            erro.status = 400;
            throw erro;
        }

        // Cria o novo usuário
        return await UserModel.create(name, email, password);
    }

    // Função de Login
    async login(email, password) {
        const user = await UserModel.getByEmail(email);
        if (!user) {
            const erro = new Error("Email ou senha inválidos.");
            erro.status = 401;
            throw erro;
        }

        // Verifica a senha digitada com a senha armazenada (que está criptografada)
        const senhaValida = await bcrypt.compare(password, user.password);
        if (!senhaValida) {
            const erro = new Error("Email ou senha inválidos.");
            erro.status = 401;
            throw erro;
        }

        // Gera o token JWT
        const token = jwt.sign(
            { id: user.id, email: user.email, role: user.role }, // Credenciais do usuário a serem incluídas no token
            authConfig.jwt.secret, // Chave para assinar o token
            { expiresIn: authConfig.jwt.expiresIn } // Tempo de expiração do token
        );

        return { user: { id: user.id, name: user.name, email: user.email }, token };
    }
}

module.exports = new UserController();