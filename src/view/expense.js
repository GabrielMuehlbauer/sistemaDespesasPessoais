const ExpenseController = require("../controller/expense.js");

class Expense {
    constructor() {
    }

    create(req, res) {
        try {
            ExpenseController.create(title, amount, category, date, description);

            // Extrai os dados do body
            const { title, amount, category, date, description } = req.body;

            // Status 201 (Created)
            res.status(201).json(novaDespesa);
        } catch (erro) {
            res.status(400).json({ error: erro.message })
            // Se der algum problema na leitura/escrita do arquivo, avisamos aqui
            res.status(500).json({ error: "Erro interno no servidor ao tentar salvar a despesa." });
        }
    }

    // READ (Listar)
    getAll(req, res) {
        try {
            ExpenseController.getAll();

            res.status(200).json(despesas);
        } catch (erro) {
            // Se o arquivo não existir ou der erro, aparece a seguinte mensagem
            res.status(500).json({ error: "Erro interno ao buscar as despesas." });
        }
    }

    getTotal(req, res) {
        try {
            ExpenseController.getTotal();

            // Devolvendo a resposta
            res.status(200).json({ total: total });
        } catch (erro) {
            res.status(500).json({ error: "Erro interno ao calcular o total." });
        }
    }

    getByCategory(req, res) {
        try {
            ExpenseController.getByCategory();

            res.status(200).json(totalPorCategoria);
        } catch (erro) {
            res.status(500).json({ error: "Erro interno ao calcular os totais por categoria." });
        }
    }

    // Buscar por ID
    getById(req, res) {
        ExpenseController.getById(id);

        // Capturamos o ID dinâmico requisitado na URL
        const { id } = req.params;

        try {
            // Se encontrar o id requisitado, retorna a respectiva despesa
            res.status(200).json(despesaEncontrada);
        } catch (erro) {
            res.status(400).json({ error: erro.message });
            res.status(500).json({ error: "Erro interno ao buscar a despesa." });
        }
    }

    // UPDATE
    update(req, res) {
        ExpenseController.update(id, dadosNovos);

        // Capturamos o ID dinâmico requisitado na URL
        const { id } = req.params;

        // Captura os novos dados do body
        const dadosNovos = req.body;

        try {
            // Retorna o status OK
            res.status(200).json(despesaAtualizada);
        } catch (erro) {
            res.status(400).json({ error: erro.message });
            res.status(404).json({ error: erro.message });
            res.status(500).json({ error: "Erro interno ao atualizar a despesa." });
        }
    }

    // DELETE
    delete(req, res) {
        ExpenseController.delete(id, indexDespesa);

        // Capturamos o ID que será apagado
        const { id } = req.params;

        try {
            // Retorna status OK
            res.status(200).json({ message: "Despesa removida com sucesso!" });
        } catch (erro) {
            res.status(404).json({ error: erro.message });
            res.status(500).json({ error: "Erro interno ao tentar remover a despesa." });
        }
    }
}