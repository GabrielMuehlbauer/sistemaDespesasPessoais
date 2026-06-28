ExpenseModel = require('../model/expense.js');

class DashboardController {
    async getTotalExpenses(userId) {
        // Chamando a função getTotal
        return await ExpenseModel.getTotal(userId);
    }

    async getExpensesCount(userId) {
        // Chamando a função getCount
        return await ExpenseModel.getCount(userId);
    }

    async getExpensesByCategory(userId) {
        // Chamando a função getByCategory
        const dadosBrutos = await ExpenseModel.getByCategory(userId);

        return dadosbrutos.map(item => {
            const json = item.toJSON();
            return {
                categoria: json.category ? json.category.name : "Sem Categoria",
                total: parseFloat(json.total)
            };
        });
    }

}

module.exports = new DashboardController();