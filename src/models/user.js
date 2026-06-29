// Importa o Sequelize
const { sequelize } = require('../config/database.js');

// Importa o bcrypt
const bcrypt = require('bcrypt');

// Importa a função de DataTypes do Sequelize
const { DataTypes } = require('sequelize');

// Modelo de Usuário
const User = sequelize.define('user', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    role: {
        type: DataTypes.STRING,
        defaultValue: 'user',
    },
});

// Criptografa a senha antes de criar um novo usuário
User.beforeCreate(async (user) => {
    if (user.password) {
        // O número 10 (saltRounds) define a complexidade matemática da encriptação
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
    }
});

// CREATE
async function create(name, email, password, role = 'user') {
    return await User.create({ name, email, password, role });
}

// READ (Listar)
async function getAll() {
    return await User.findAll();
}

// READ (Obter por ID)
async function getById(id) {
    return await User.findByPk(id);
}

// READ (Obter por Email)
async function getByEmail(email) {
    return await User.findOne({ where: { email } });
}

// UPDATE
async function update(id, name, email, password, role) {
    const user = await User.findByPk(id);
    if (!user) {
        const erro = new Error("Usuário não encontrado.");
        erro.statusCode = 404;
        throw erro;
    }
    // Atualiza os campos se forem fornecidos, ou mantém os valores atuais
    user.name = name || user.name;
    user.email = email || user.email;

    // Se a senha for fornecida, criptografa antes de salvar
    if (password) {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
    }
    // Atualiza o papel do usuário se for fornecido
    user.role = role || user.role;
    return await user.save();
}

// DELETE
async function remove(id) {
    const user = await User.findByPk(id);
    if (!user) {
        const erro = new Error("Usuário não encontrado.");
        erro.statusCode = 404;
        throw erro;
    }
    return await user.destroy();
}

module.exports = {
    User,
    create,
    getAll,
    getById,
    getByEmail,
    update,
    remove
};