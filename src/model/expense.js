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

        // Adicionamos a nova despesa no Array
        this.despesas.push(novaDespesa);

        // Lemos o arquivo atual e convertemos para Array do JavaScript
        const dadosBrutos = fs.readFileSync('./src/data/expenses.json', 'utf-8');
        this.despesas = JSON.parse(dadosBrutos);

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

        return this.despesas.find(despesa => despesa.id === id);
    }

    // UPDATE
    update(id, dadosNovos) {
        // Lemos o arquivo JSON
        const dadosBrutos = fs.readFileSync('./src/data/expenses.json', 'utf-8');
        this.despesas = JSON.parse(dadosBrutos);

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
    delete(indexDespesa) {
        // Lemos o arquivo e convertemos para Array
        const dadosBrutos = fs.readFileSync('./src/data/expenses.json', 'utf-8');
        this.despesas = JSON.parse(dadosBrutos);

        // Removemos a despesa do Array
        this.despesas.splice(indexDespesa, 1);

        // Salvamos o Array atualizado de volta no arquivo JSON
        fs.writeFileSync('./src/data/expenses.json', JSON.stringify(this.despesas, null, 2), 'utf-8');

        return null
    }
}

module.exports = new Expense();