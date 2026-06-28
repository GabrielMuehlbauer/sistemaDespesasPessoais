const DashboardController = require('../controller/dashboard');

class DashboardView {
    async getTotalExpenses(req, res) {
        try {
            const userId = req.user.id;
            const total = await DashboardController.getTotalExpenses(userId);
            res.status(200).json({ total });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getExpensesCount(req, res) {
        try {
            const userId = req.user.id;
            const quantidade = await DashboardController.getExpensesCount(userId);
            res.status(200).json({ quantidade });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getExpensesByCategory(req, res) {
        try {
            const userId = req.user.id;
            const dadosformatados = await DashboardController.getExpensesByCategory(userId);
            res.status(200).json(dadosformatados);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = new DashboardView();