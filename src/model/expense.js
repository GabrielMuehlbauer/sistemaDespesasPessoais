const fs = require('fs'); // Ferramenta para manipular arquivos JSON (expenses.json)
const crypto = require('crypto'); // Ferramenta para gerar IDs únicos

class Expense {
    constructor() {
        this.despesas = [];
    }

    // CREATE
    create(title, amount, category, date, description) {
        const novaDespesa = {
            id: crypto.randomUUID(), // Gera um ID aleatório super seguro
            title: title,
            amount: amount,
            category: category,
            date: date,
            description: description,
            createdAt: new Date().toISOString() // Pega a data/hora atual e formata como texto
        };

        // Lemos o arquivo atual e convertemos para Array do JavaScript
        const dadosBrutos = fs.readFileSync('./src/data/expenses.json', 'utf-8');
        this.despesas = JSON.parse(dadosBrutos);

        // Adicionamos a nova despesa no Array
        this.despesas.push(novaDespesa);

        // Convertemos o Array de volta para texto e salvamos
        fs.writeFileSync('./src/data/expenses.json', JSON.stringify(this.despesas, null, 2), 'utf-8');

        return novaDespesa;
    }

    // READ (Listar)
    getAll() {
        // Lemos o arquivo de texto
        const dadosBrutos = fs.readFileSync('./src/data/expenses.json', 'utf-8');

        // Convertemos o texto para um Array do JavaScript
        this.despesas = JSON.parse(dadosBrutos);

        return this.despesas;
    }

    // Valor Total das Despesas
    getTotal() {
        // Lemos o ficheiro e convertemos para o Array
        const dadosBrutos = fs.readFileSync('./src/data/expenses.json', 'utf-8');
        this.despesas = JSON.parse(dadosBrutos);

        // Somar todos os valores das despesas
        const total = this.despesas.reduce((acumulador, despesaAtual) => {
            return acumulador + despesaAtual.amount;
        }, 0); // O zero é o valor inicial do acumulador

        return total;
    }

    // Valor por Categoria
    getByCategory() {
        // Lemos o ficheiro e convertemos para Array
        const dadosBrutos = fs.readFileSync('./src/data/expenses.json', 'utf-8');
        this.despesas = JSON.parse(dadosBrutos);

        // Criamos um objeto vazio para ser o nosso "organizador"
        const totalPorCategoria = {};

        // Agrupamento por categorias
        this.despesas.forEach(despesa => {
            // Se a categoria já existe no nosso objeto, apenas somamos o valor novo
            if (totalPorCategoria[despesa.category]) {
                totalPorCategoria[despesa.category] += despesa.amount;
            } else {
                // Se é a primeira vez que vemos esta categoria, criamo-la com o valor inicial
                totalPorCategoria[despesa.category] = despesa.amount;
            }
        });

        return totalPorCategoria;
    }

    // Buscar por ID
    getById(id) {
        // Lemos o arquivo JSON
        const dadosBrutos = fs.readFileSync('./src/data/expenses.json', 'utf-8');
        this.despesas = JSON.parse(dadosBrutos);

        // Buscamos no Array a despesa que tem o ID exato
        const despesaEncontrada = this.despesas.find(despesa => despesa.id === id);
        
        // Se não encontrar o id requisitado, retorna erro 404
        if (!despesaEncontrada) {
            const erro = new Error("Despesa não encontrada.");
            erro.statusCode = 404;
            throw erro;
        }

        return despesaEncontrada;
    }

    // UPDATE
    update(id, dadosNovos) {
        // Lemos o arquivo JSON
        const dadosBrutos = fs.readFileSync('./src/data/expenses.json', 'utf-8');
        this.despesas = JSON.parse(dadosBrutos);

        // Encontramos o id da despesa que será atualizada
        const indexDespesa = this.despesas.findIndex(despesa => despesa.id === id);

        // Se não achar, erro 404
        if (indexDespesa === -1) {
            const erro = new Error("Despesa não encontrada.");
            erro.statusCode = 404;
            throw erro;
        }
        
        // Atualização dos dados
        const despesaAtualizada = {
            ...this.despesas[indexDespesa], // Pega a despesa selecionada
            ...dadosNovos // Sobrescreve apenas com os dados novos que vieram
        };

        // Mantém dados que devem ser imutáveis (id e data de criação da despesa)
        despesaAtualizada.id = this.despesas[indexDespesa].id;
        despesaAtualizada.createdAt = this.despesas[indexDespesa].createdAt;

        // Trocamos a despesa velha pela atualizada dentro do Array
        this.despesas[indexDespesa] = despesaAtualizada;

        // Salvamos o Array inteiro de volta no arquivo JSON
        fs.writeFileSync('./src/data/expenses.json', JSON.stringify(this.despesas, null, 2), 'utf-8');

        return this.despesas[indexDespesa];
    }

    // DELETE
    delete(id) {
        // Lemos o arquivo e convertemos para Array
        const dadosBrutos = fs.readFileSync('./src/data/expenses.json', 'utf-8');
        this.despesas = JSON.parse(dadosBrutos);

        // Procuramos a POSIÇÃO (índice) da despesa no Array
        const indexDespesa = this.despesas.findIndex(despesa => despesa.id === id);

        // Se o id requisitado não for encontrado, retorna 404
        if (indexDespesa === -1) {
            const erro = new Error("Despesa não encontrada.");
            erro.statusCode = 404;
            throw erro;
        }

        // Removemos a despesa do Array
        this.despesas.splice(indexDespesa, 1);

        // Salvamos o Array atualizado de volta no arquivo JSON
        fs.writeFileSync('./src/data/expenses.json', JSON.stringify(this.despesas, null, 2), 'utf-8');

        return null
    }
}

module.exports = new Expense();