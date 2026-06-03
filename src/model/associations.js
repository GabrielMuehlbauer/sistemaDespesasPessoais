const ExpenseModel = require('../model/expense');
const CategoryModel = require('../model/category');

const Expense = ExpenseModel.Expense;
const Category = CategoryModel.Category;

Expense.belongsTo(Category, {
    foreignKey: 'categoryId',
    as: 'category'
});

Category.hasMany(Expense, {
    foreignKey: 'categoryId',
    as: 'expenses'
});