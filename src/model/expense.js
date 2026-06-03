// Importa o Sequelize
const { sequelize } = require('./database');

// Importa a função de DataTypes do Sequelize
const { DataTypes } = require('sequelize');

const CategoryModel = require("./category.js");

// Modelo de Despesa
const Expense = sequelize.define('expense', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    amount: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    categoryId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'categories',
            key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true,
    }
});

// CREATE
async function create(title, amount, categoryId, date, description) {
    return await Expense.create({ title, amount, categoryId, date, description });
}

// READ (Listar)
async function getAll() {
    return await Expense.findAll();
}

// Valor Total das Despesas
async function getTotal() {
    return await Expense.sum('amount') || 0; // Se não houver despesas, retorna 0
}

// Valor por Categoria
async function getByCategory() {
    const totalPorCategoria = await Expense.findAll({
        attributes: [
            [sequelize.fn('SUM', sequelize.col('amount')), 'total'],

            [sequelize.col('category.name'), 'categoryName']
        ],
        include: [
            {
                model: CategoryModel.Category,
                as: 'category',
                attributes: []
            }
        ],
            
        group: ['categoryId', 'category.id'],
        raw: true
    });

    return totalPorCategoria;
}

// Buscar por ID
async function getById(id) {
    const despesaEncontrada = await Expense.findByPk(id);

    if (!despesaEncontrada) {
        const erro = new Error("Despesa não encontrada.");
        erro.statusCode = 404;
        throw erro;
    }
    return despesaEncontrada;
}

// UPDATE
async function update(id, dadosNovos) {
    // Encontramos o id da despesa que será atualizada
    const despesaAtualizada = await getById(id);

    // Atualização dos dados
    despesaAtualizada.title = dadosNovos.title || despesaAtualizada.title;
    despesaAtualizada.amount = dadosNovos.amount || despesaAtualizada.amount;
    despesaAtualizada.categoryId = dadosNovos.categoryId || despesaAtualizada.categoryId;
    despesaAtualizada.date = dadosNovos.date || despesaAtualizada.date;
    despesaAtualizada.description = dadosNovos.description || despesaAtualizada.description;

    await despesaAtualizada.save();
    return despesaAtualizada;
}

// DELETE
async function remove(id) {
    const despesaEncontrada = await getById(id);
    await despesaEncontrada.destroy();
    return null;
}

module.exports = {
    Expense,
    create,
    getAll,
    getTotal,
    getByCategory,
    getById,
    update,
    remove
};