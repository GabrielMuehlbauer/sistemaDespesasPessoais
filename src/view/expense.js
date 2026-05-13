const ExpenseController = require("../controller/expense.js");

class Expense {
    constructor() {
    }

    // CREATE
    async create(req, res) {
        try {
            // Extrai os dados do body
            const { title, amount, category, date, description } = req.body;

            const novaDespesa = (await ExpenseController.create(title, amount, category, date, description)).toJSON();

            novaDespesa._links = [
                {
                    rel: "self",
                    method: "GET",
                    href: `http://localhost:3000/api/expenses/${novaDespesa.id}`
                },
                {
                    rel: "update",
                    method: "PUT",
                    href: `http://localhost:3000/api/expenses/${novaDespesa.id}`
                },
                {
                    rel: "delete",
                    method: "DELETE",
                    href: `http://localhost:3000/api/expenses/${novaDespesa.id}`
                },
                {
                    rel: "all_expenses",
                    method: "GET",
                    href: "http://localhost:3000/api/expenses"
                }
            ];

            // Status 201 (Created)
            return res.status(201).json({
                message: "Despesa adicionada com sucesso!",
                expense: novaDespesa
            });
        } catch (erro) {
            // Pega o status que veio do Controller/Model, ou usa 500 se for um erro inesperado do sistema
            const status = erro.statusCode || 500;

            // Devolve a resposta dinâmica
            return res.status(status).json({ error: erro.message });
        }
    }

    // READ (Listar)
    async getAll(req, res) {
        try {
            const despesas = await ExpenseController.getAll();

            const despesasComLinks = despesas.map(despesa => {
                const despesaFormatada = despesa.toJSON(); // Converte a instância do Sequelize para um objeto JavaScript simples

                despesaFormatada._links = [
                    {
                        rel: "self",
                        method: "GET",
                        href: `http://localhost:3000/api/expenses/${despesa.id}`
                    },
                    {
                        rel: "update",
                        method: "PUT",
                        href: `http://localhost:3000/api/expenses/${despesa.id}`
                    },
                    {
                        rel: "delete",
                        method: "DELETE",
                        href: `http://localhost:3000/api/expenses/${despesa.id}`
                    }
                ];

                return despesaFormatada;
            });

            res.status(200).json(despesasComLinks);
        } catch (erro) {
            // Pega o status que veio do Controller/Model, ou usa 500 se for um erro inesperado do sistema
            const status = erro.statusCode || 500;

            // Devolve a resposta dinâmica
            return res.status(status).json({ error: erro.message });
        }
    }

    async getTotal(req, res) {
        try {
            const total = await ExpenseController.getTotal();

            const valorTotal = { total: total };

            valorTotal._links = [
                {
                    rel: "all_expenses",
                    method: "GET",
                    href: "http://localhost:3000/api/expenses"
                }
            ];

            // Devolvendo a resposta
            res.status(200).json(valorTotal);
        } catch (erro) {
            // Pega o status que veio do Controller/Model, ou usa 500 se for um erro inesperado do sistema
            const status = erro.statusCode || 500;

            // Devolve a resposta dinâmica
            return res.status(status).json({ error: erro.message });
        }
    }

    async getByCategory(req, res) {
        try {
            const totalPorCategoria = await ExpenseController.getByCategory();

            res.status(200).json({
                categorias: totalPorCategoria,
                _links: [
                    {
                        rel: "all_expenses",
                        method: "GET",
                        href: "http://localhost:3000/api/expenses"
                    }
                ]
            });
        } catch (erro) {
            // Pega o status que veio do Controller/Model, ou usa 500 se for um erro inesperado do sistema
            const status = erro.statusCode || 500;

            // Devolve a resposta dinâmica
            return res.status(status).json({ error: erro.message });
        }
    }

    // Buscar por ID
    async getById(req, res) {
        // Capturamos o ID dinâmico requisitado na URL
        const { id } = req.params;

        try {
            const despesaEncontrada = (await ExpenseController.getById(id)).toJSON();

            // Adicionando os links dinâmicos com opções de "próximos passos"
            // "_links" é uma das convenções padrões do mercado, faz parte do padrão de design HAL
            despesaEncontrada._links = [
                {
                    rel: "self",
                    method: "GET",
                    href: `http://localhost:3000/api/expenses/${id}`
                },
                {
                    rel: "update",
                    method: "PUT",
                    href: `http://localhost:3000/api/expenses/${id}`
                },
                {
                    rel: "delete",
                    method: "DELETE",
                    href: `http://localhost:3000/api/expenses/${id}`
                },
                {
                    rel: "all_expenses",
                    method: "GET",
                    href: "http://localhost:3000/api/expenses"
                }
            ];

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
    async update(req, res) {
        // Capturamos o ID dinâmico requisitado na URL
        const { id } = req.params;

        // Captura os novos dados do body
        const dadosNovos = req.body;

        try {
            const despesaAtualizada = (await ExpenseController.update(id, dadosNovos)).toJSON();

            despesaAtualizada._links = [
                {
                    rel: "self",
                    method: "GET",
                    href: `http://localhost:3000/api/expenses/${id}`
                },
                {
                    rel: "delete",
                    method: "DELETE",
                    href: `http://localhost:3000/api/expenses/${id}`
                },
                {
                    rel: "all_expenses",
                    method: "GET",
                    href: "http://localhost:3000/api/expenses"
                }
            ];

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
    async remove(req, res) {
        // Capturamos o ID que será apagado
        const { id } = req.params;

        try {
            await ExpenseController.remove(id);

            const respostaDelete = {
                message: "Despesa excluída com sucesso!",
                _links: [
                    {
                        rel: "all_expenses",
                        method: "GET",
                        href: "http://localhost:3000/api/expenses"
                    }
                ]
            };

            // Retorna status OK
            res.status(200).json({ respostaDelete });
        } catch (erro) {
            // Pega o status que veio do Controller/Model, ou usa 500 se for um erro inesperado do sistema
            const status = erro.statusCode || 500;

            // Devolve a resposta dinâmica
            return res.status(status).json({ error: erro.message });
        }
    }
}

module.exports = new Expense();