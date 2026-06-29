// Importa o Sequelize
const { sequelize } = require('../config/database.js');

// Importa a função de DataTypes do Sequelize
const { DataTypes } = require('sequelize');

// Modelo de Categoria
const Category = sequelize.define('category', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    userId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'users',
            key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    }
});

// CREATE
async function create(name, description, userId) {
    return await Category.create({ name, description, userId });
}

// READ (Listar)
async function getAll(userId) {
    return await Category.findAll({ where: { userId } });
}

// READ (Obter por ID)
async function getById(id, userId) {
    return await Category.findOne({ where: { id, userId } });
}

// UPDATE
async function update(id, name, description, userId) {
    const category = await Category.getById(id, userId);
    if (!category) {
        const erro = new Error("Categoria não encontrada.");
        erro.statusCode = 404;
        throw erro;
    }
    category.name = name;
    return await category.save();
}

// DELETE
async function remove(id, userId) {
    const category = await Category.getById(id, userId);
    if (!category) {
        const erro = new Error("Categoria não encontrada.");
        erro.statusCode = 404;
        throw erro;
    }
    return await category.destroy();
}

module.exports = {
    Category,
    create,
    getAll,
    getById,
    update,
    remove
}