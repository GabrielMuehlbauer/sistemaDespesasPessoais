// Importa os Operadores
const { Op } = require('sequelize');

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
    },
    status: {
        type: DataTypes.ENUM('PENDENTE', 'PAGA'),
        allowNull: false,
        defaultValue: 'PENDENTE'
    }
});

// CREATE
async function create(title, amount, categoryId, date, description, userId, status) {
    return await Expense.create({ title, amount, categoryId, date, description, userId, status });
}

// READ (Listar)
async function getAll(userId, filtros) {
    // Toda busca obrigatoriamente tem que ser do usuário logado
    const onde = { userId }; 

    // 1. Filtro por Status (Se foi enviado)
    if (filtros.status) {
        onde.status = filtros.status;
    }

    // 2. Filtro por Categoria (Se foi enviado)
    if (filtros.categoryId) {
        onde.categoryId = filtros.categoryId;
    }

    // 3. Filtro por Valores (Mínimo e Máximo)
    if (filtros.minAmount || filtros.maxAmount) {
        onde.amount = {};
        if (filtros.minAmount) {
            onde.amount[Op.gte] = parseFloat(filtros.minAmount); // gte = Greater Than or Equal (>=)
        }
        if (filtros.maxAmount) {
            onde.amount[Op.lte] = parseFloat(filtros.maxAmount); // lte = Less Than or Equal (<=)
        }
    }

    // 4. Filtro por Período/Data (Início e Fim)
    if (filtros.startDate || filtros.endDate) {
        onde.date = {};
        if (filtros.startDate) {
            onde.date[Op.gte] = new Date(filtros.startDate);
        }
        if (filtros.endDate) {
            onde.date[Op.lte] = new Date(filtros.endDate);
        }
    }

    // Executa a busca passando o objeto "where" dinâmico que acabamos de montar
    return await Expense.findAll({ where: onde });
}

// Valor Total das Despesas
async function getTotal(userId) {
    return await Expense.sum('amount', { where: {userId} }) || 0; // Se não houver despesas, retorna 0
}

// Quantidade de Despesas
async function getCount(userId) {
    return await Expense.count({ where: { userId } });
}

// Valor por Categoria
async function getByCategory(userId) {
    const totalPorCategoria = await Expense.findAll({
        where: { userId },
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
async function getById(id, userId) {
    const despesaEncontrada = await Expense.findOne({ where: { id, userId } });

    if (!despesaEncontrada) {
        const erro = new Error("Despesa não encontrada.");
        erro.statusCode = 404;
        throw erro;
    }
    return despesaEncontrada;
}

// UPDATE
async function update(id, dadosNovos, userId) {
    // Encontramos o id da despesa que será atualizada
    const despesaAtualizada = await getById(id, userId);

    // Atualização dos dados
    despesaAtualizada.title = dadosNovos.title || despesaAtualizada.title;
    despesaAtualizada.amount = dadosNovos.amount || despesaAtualizada.amount;
    despesaAtualizada.categoryId = dadosNovos.categoryId || despesaAtualizada.categoryId;
    despesaAtualizada.date = dadosNovos.date || despesaAtualizada.date;
    despesaAtualizada.description = dadosNovos.description || despesaAtualizada.description;
    despesaAtualizada.status = dadosNovos.status || despesaAtualizada.status;

    await despesaAtualizada.save();
    return despesaAtualizada;
}

// DELETE
async function remove(id, userId) {
    const despesaEncontrada = await getById(id, userId);
    await despesaEncontrada.destroy();
    return null;
}

module.exports = {
    Expense,
    create,
    getAll,
    getTotal,
    getCount,
    getByCategory,
    getById,
    update,
    remove
};