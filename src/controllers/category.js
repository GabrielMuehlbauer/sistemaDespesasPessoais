const ExpenseModel = require('../models/expense.js');
const CategoryModel = require('../models/category.js');

class Category {
    constructor() {}

    async create(name, description, userId) {
        // Validação dos dados
        // Obrigatoriedade do campo nome
        if (!name) {
            const erro = new Error("O nome da categoria é obrigatório.");
            erro.statusCode = 400;
            throw erro;
        }
        return await CategoryModel.create(name, description, userId);
    }
    
    async getAll(userId) {
        return await CategoryModel.getAll(userId);
    }

    async getById(id, userId) {
        return await CategoryModel.getById(id, userId);
    }

    async update(id, name, description, userId) {
        // Validação dos dados
        if (!name) {
            const erro = new Error("O nome da categoria é obrigatório.");
            erro.statusCode = 400;
            throw erro;
        }
        return await CategoryModel.update(id, name, description, userId);
    }

    async remove(id, userId) {
        // Verificar se a categoria tem despesas associadas
        const despesasAssociadas = await ExpenseModel.Expense.findAll({ where: { categoryId: id, userId } });
        if (despesasAssociadas.length > 0) {
            const erro = new Error("Não é possível excluir uma categoria que possui despesas associadas.");
            erro.statusCode = 400;
            throw erro;
        }
        return await CategoryModel.remove(id, userId);
    }
}

module.exports = new Category();