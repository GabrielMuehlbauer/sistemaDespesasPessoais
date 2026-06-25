const ExpenseModel = require('../model/expense');
const CategoryModel = require('../model/category');
const UserModel = require('../model/user');

const Expense = ExpenseModel.Expense;
const Category = CategoryModel.Category;
const User = UserModel.User;

// Uma Despesa pertence a uma Categoria
Expense.belongsTo(Category, {
    foreignKey: 'categoryId',
    as: 'category'
});

// Uma Categoria tem muitas Despesas
Category.hasMany(Expense, {
    foreignKey: 'categoryId',
    as: 'expenses'
});

// Um Usuário tem muitas Despesas
User.hasMany(Expense, {
    foreignKey: 'userId',
    as: 'expenses'
});

// Um Usuário tem muitas categorias
User.hasMany(Category, { 
    foreignKey: 'userId', 
    as: 'categories' 
});

// Uma Categoria pertence a um Usuário
Category.belongsTo(User, { 
    foreignKey: 'userId', 
    as: 'user' 
});

// Uma Despesa pertence a um Usuário
Expense.belongsTo(User, {
    foreignKey: 'userId',
    as: 'user'
});