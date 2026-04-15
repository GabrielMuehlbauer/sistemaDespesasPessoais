const ExpenseController = require("../controller/expense.js");

class Expense {
    constructor() {
    }

    create(req, res) {
        try {
            // Extrai os dados do body
            const { title, amount, category, date, description } = req.body;

            const novaDespesa = ExpenseController.create(title, amount, category, date, description);

            // Status 201 (Created)
            return res.status(201).json(novaDespesa);
        } catch (erro) {
            // Pega o status que veio do Controller/Model, ou usa 500 se for um erro inesperado do sistema
            const status = erro.statusCode || 500;

            // Devolve a resposta dinâmica
            return res.status(status).json({ error: erro.message });
        }
    }

    // READ (Listar)
    getAll(req, res) {
        try {
            const despesas = ExpenseController.getAll();

            res.status(200).json(despesas);
        } catch (erro) {
            // Pega o status que veio do Controller/Model, ou usa 500 se for um erro inesperado do sistema
            const status = erro.statusCode || 500;

            // Devolve a resposta dinâmica
            return res.status(status).json({ error: erro.message });
        }
    }

    getTotal(req, res) {
        try {
            const total = ExpenseController.getTotal();

            // Devolvendo a resposta
            res.status(200).json({ total: total });
        } catch (erro) {
            // Pega o status que veio do Controller/Model, ou usa 500 se for um erro inesperado do sistema
            const status = erro.statusCode || 500;

            // Devolve a resposta dinâmica
            return res.status(status).json({ error: erro.message });
        }
    }

    getByCategory(req, res) {
        try {
            const totalPorCategoria = ExpenseController.getByCategory();

            res.status(200).json(totalPorCategoria);
        } catch (erro) {
            // Pega o status que veio do Controller/Model, ou usa 500 se for um erro inesperado do sistema
            const status = erro.statusCode || 500;

            // Devolve a resposta dinâmica
            return res.status(status).json({ error: erro.message });
        }
    }

    // Buscar por ID
    getById(req, res) {
        // Capturamos o ID dinâmico requisitado na URL
        const { id } = req.params;

        try {
            const despesaEncontrada = ExpenseController.getById(id);
            // Se encontrar o id requisitado, retorna a respectiva despesa
            res.status(200).json(despesaEncontrada);
        } catch (erro) {
            // Pega o status que veio do Controller/Model, ou usa 500 se for um erro inesperado do sistema
            const status = erro.statusCode || 500;

            // Devolve a resposta dinâmica
            return res.status(status).json({ error: erro.message });
        }
    }

    // UPDATE
    update(req, res) {
        // Capturamos o ID dinâmico requisitado na URL
        const { id } = req.params;

        // Captura os novos dados do body
        const dadosNovos = req.body;

        try {
            const despesaAtualizada = ExpenseController.update(id, dadosNovos);

            // Retorna o status OK
            res.status(200).json(despesaAtualizada);
        } catch (erro) {
            // Pega o status que veio do Controller/Model, ou usa 500 se for um erro inesperado do sistema
            const status = erro.statusCode || 500;

            // Devolve a resposta dinâmica
            return res.status(status).json({ error: erro.message });
        }
    }

    // DELETE
    delete(req, res) {
        // Capturamos o ID que será apagado
        const { id } = req.params;

        try {
            ExpenseController.delete(id);

            // Retorna status OK
            res.status(200).json({ message: "Despesa removida com sucesso!" });
        } catch (erro) {
            // Pega o status que veio do Controller/Model, ou usa 500 se for um erro inesperado do sistema
            const status = erro.statusCode || 500;

            // Devolve a resposta dinâmica
            return res.status(status).json({ error: erro.message });
        }
    }
}

module.exports = new Expense();