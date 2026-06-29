const ExpenseModel = require('../models/expense.js');

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
        const dadosbrutos = await ExpenseModel.getByCategory(userId);

        return dadosbrutos.map(item => {
            return {
                categoria: item.categoryName ? item.categoryName : "Sem Categoria",
                total: parseFloat(item.total)
            };
        });
    }

}

module.exports = new DashboardController();