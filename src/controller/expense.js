const ExpenseModel = require("../model/expense.js");

class Expense {
    constructor() {
    }

    // CREATE
    create(title, amount, category, date, description) {
        // Validação dos dados
        if (!title) {
            throw new Exception({ message: "O título da despesa é obrigatório." });
        }

        if (amount <= 0) {
            throw new Exception({ message: "O valor da despesa deve ser maior que zero." });
        }

        if (date) {
            const dataDespesa = new Date(date);
            const dataAtual = new Date();

            if (dataDespesa > dataAtual) {
                throw new Exception({ message: "A data da despesa não pode ser no futuro." });
            }
        }
        
        return ExpenseModel.create(title, amount, category, date, description);
    }

    // READ (Listar)
    getAll() {
        return ExpenseModel.getAll();
    }

    // Valor Total das Despesas
    getTotal() {
        return ExpenseModel.getTotal();
    }

    // Valor por Categoria
    getByCategory() {
        return ExpenseModel.getByCategory
    }

    // Buscar por ID
    getById(id) {
        // Buscamos no Array a despesa que tem o ID exato
        const despesaEncontrada = despesas.find(despesa => despesa.id === id);
        
        // Se não encontrar o id requisitado, retorna erro 404
        if (!despesaEncontrada) {
            throw new Exception({ message: "Despesa não encontrada." });
        }
        return ExpenseModel.getById
    }

    // UPDATE
    update(id, dadosNovos) {
        // Encontramos o id da despesa que será atualizada
        const indexDespesa = this.despesas.findIndex(despesa => despesa.id === id);

        // Se não achar, erro 404
        if (indexDespesa === -1) {
            throw new Exception({ message: "Despesa não encontrada." });
        }

        // Validação do valor, assim como em CREATE
        if (dadosNovos.amount !== undefined && dadosNovos.amount <= 0) {
            throw new Exception({ message: "O valor da despesa deve ser maior que zero." });
        }

        // Validação a data não pode ser no futuro
        if (dadosNovos.date) {
            const dataDespesa = new Date(dadosNovos.date);
            const dataAtual = new Date();
            
            if (dataDespesa > dataAtual) {
                throw new Exception({ message: "A data da despesa não pode ser no futuro." });
            }
        }

        return ExpenseModel.update
    }

    // DELETE
    delete(id, indexDespesa) {
        // Procuramos a POSIÇÃO (índice) da despesa no Array
        indexDespesa = despesas.findIndex(despesa => despesa.id === id);

        // Se o id requisitado não for encontrado, retorna 404
        if (indexDespesa === -1) {
            throw new Exception({ message: "Despesa não encontrada." });
        }
    }
}

module.exports = new Expense();