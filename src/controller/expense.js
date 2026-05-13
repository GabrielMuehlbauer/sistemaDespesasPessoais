const ExpenseModel = require("../model/expense.js");

class Expense {
    constructor() {
    }

    // CREATE
    async create(title, amount, category, date, description) {
        // Validação dos dados
        // Se o campo title foi preenchido
        if (!title) {
            const erro = new Error("O título da despesa é obrigatório.");
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
        
        return await ExpenseModel.create(title, amount, category, date, description);
    }

    // READ (Listar)
    async getAll() {
        return await ExpenseModel.getAll();
    }

    // Valor Total das Despesas
    async getTotal() {
        return await ExpenseModel.getTotal();
    }

    // Valor por Categoria
    async getByCategory() {
        return await ExpenseModel.getByCategory();
    }

    // Buscar por ID
    async getById(id) {
        return await ExpenseModel.getById(id);
    }

    // UPDATE
    async update(id, dadosNovos) {
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

        return await ExpenseModel.update(id, dadosNovos);
    }

    // DELETE
    async remove(id) {
        return await ExpenseModel.remove(id);
    }
}

module.exports = new Expense();