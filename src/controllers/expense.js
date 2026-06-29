const ExpenseModel = require("../models/expense.js");
const CategoryModel = require("../models/category.js");

class Expense {
    constructor() {
    }

    // CREATE
    async create(title, amount, categoryId, date, description, userId, status) {
        // Validação dos dados
        // Se o campo title foi preenchido
        if (!title) {
            const erro = new Error("O título da despesa é obrigatório.");
            erro.statusCode = 400;
            throw erro;
        }

        // Se a categoria foi informada
        if (!categoryId) {
            const erro = new Error("É necessário informar a categoria da despesa.");
            erro.statusCode = 400;
            throw erro;
        }

        // Se a categoria existe
        const categoriaEncontrada = await CategoryModel.getById(categoryId, userId);

        if (!categoriaEncontrada) {
            const erro = new Error("A categoria informada não existe.");
            erro.statusCode = 400;
            throw erro;
        }

        // Se o valor da despesa é maior que 0
        if (amount <= 0) {
            const erro = new Error("O valor da despesa deve ser maior que zero.");
            erro.statusCode = 400;
            throw erro;
        }

        // Se a data da despesa é no futuro
        if (date) {
            const dataDespesa = new Date(date);
            const dataAtual = new Date();

            if (dataDespesa > dataAtual) {
                const erro = new Error("A data da despesa não pode ser no futuro.");
                erro.statusCode = 400;
                throw erro;
            }
        }

        // Bloqueia se enviarem um status inventado
        if (status && status !== 'PENDENTE' && status !== 'PAGA') {
            const erro = new Error("O status deve ser apenas 'PENDENTE' ou 'PAGA'.");
            erro.statusCode = 400;
            throw erro;
        }

        return await ExpenseModel.create(title, amount, categoryId, date, description, userId, status);
    }

    // READ (Listar)
    async getAll(userId, filtros = {}) {
        return await ExpenseModel.getAll(userId, filtros);
    }

    // Valor Total das Despesas
    async getTotal(userId) {
        return await ExpenseModel.getTotal(userId);
    }

    // Valor por Categoria
    async getByCategory(userId) {
        return await ExpenseModel.getByCategory(userId);
    }

    // Buscar por ID
    async getById(id, userId) {
        return await ExpenseModel.getById(id, userId);
    }

    // UPDATE
    async update(id, dadosNovos, userId) {
        // Validação do valor, assim como em CREATE
        // Se o valor da despesa é maior que 0
        if (dadosNovos.amount !== undefined && dadosNovos.amount <= 0) {
            const erro = new Error("O valor da despesa deve ser maior que zero.");
            erro.statusCode = 400;
            throw erro;
        }

        // Se a data é no futuro
        if (dadosNovos.date) {
            const dataDespesa = new Date(dadosNovos.date);
            const dataAtual = new Date();

            if (dataDespesa > dataAtual) {
                const erro = new Error("A data da despesa não pode ser no futuro.");
                erro.statusCode = 400;
                throw erro;
            }
        }

        // Se a categoria existe
        const categoriaEncontrada = await CategoryModel.getById(dadosNovos.categoryId, userId);

        if (!categoriaEncontrada) {
            const erro = new Error("A categoria informada não existe.");
            erro.statusCode = 400;
            throw erro;
        }

        // Bloqueia se enviarem um status inventado
        if (status && status !== 'PENDENTE' && status !== 'PAGA') {
            const erro = new Error("O status deve ser apenas 'PENDENTE' ou 'PAGA'.");
            erro.statusCode = 400;
            throw erro;
        }


        return await ExpenseModel.update(id, dadosNovos, userId);
    }

    // DELETE
    async remove(id, userId) {
        return await ExpenseModel.remove(id, userId);
    }
}

module.exports = new Expense();