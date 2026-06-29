const UserController = require('../controllers/user');

class UserView {

    // Função de Cadastro
    async create(req, res) {
        try {
            // Extrai os dados do corpo da requisição
            const { name, email, password } = req.body;

            // Chama o método de criação do usuário no controller
            const user = await UserController.create(name, email, password);

            // Retorna os dados do usuário criado (sem a senha)
            res.status(201).json({ id: user.id, name: user.name, email: user.email });
        } catch (error) {
            const status = error.status || 500;
            res.status(status).json({ error: error.message });
        }
    }

    // Função de Login
    async login(req, res) {
        try {
            // Extrai os dados do corpo da requisição
            const { email, password } = req.body;

            // Chama o método de login do controller
            const result = await UserController.login(email, password);

            // Retorna os dados do usuário
            res.status(200).json(result);
        } catch (error) {
            const status = error.status || 500;
            res.status(status).json({ error: error.message });
        }
    }
}

module.exports = new UserView();