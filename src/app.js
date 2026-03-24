// 1. IMPORTAÇÕES
const express = require('express');
const fs = require('fs'); // Ferramenta para manipular arquivos JSON (expenses.json)
const crypto = require('crypto'); // Ferramenta para gerar IDs únicos

// 2. INICIALIZAÇÃO
const app = express();
const PORT = 3000;

// 3. MIDDLEWARES (Configurações)
// Essa linha possibilita que o Express leia dados no formato JSON que virão nas requisições POST/PUT
app.use(express.json());

// 4. ROTAS
// Rota de teste
app.get('/', (req, res) => {
    res.status(200).json({ mensagem: "Seja bem vindo a API de Despesas Pessoais! Essa API foi construida por Gabriel Müehlbauer. Para mais detalhes leia o arquivo README.md no repositório do projeto (https://github.com/GabrielMuehlbauer/sistemaDespesasPessoais.git)." });
});

// Rota CREATE
app.post('/expenses', (req, res) => {
    // Extrai os dados do body
    const { title, amount, category, date, description } = req.body;

    // Validação dos dados
    if (!title) {
        return res.status(400).json({ error: "O título da despesa é obrigatório." });
    }
    if (amount <= 0) {
        return res.status(400).json({ error: "O valor da despesa deve ser maior que zero." });
    }

    // Cria o objeto "despesa"
    const novaDespesa = {
        id: crypto.randomUUID(), // Gera um ID aleatório super seguro
        title: title,
        amount: amount,
        category: category,
        date: date,
        description: description,
        createdAt: new Date().toISOString() // Pega a data/hora atual e formata como texto
    };

    try {
        // Lemos o arquivo atual e convertemos para Array do JavaScript
        const dadosBrutos = fs.readFileSync('./src/data/expenses.json', 'utf-8');
        const despesas = JSON.parse(dadosBrutos);

        // Adicionamos a nova despesa no Array
        despesas.push(novaDespesa);

        // Convertemos o Array de volta para texto e salvamos
        fs.writeFileSync('./src/data/expenses.json', JSON.stringify(despesas, null, 2), 'utf-8');

        // Status 201 (Created)
        res.status(201).json(novaDespesa);

    } catch (erro) {
        // Se der algum problema na leitura/escrita do arquivo, avisamos aqui
        res.status(500).json({ error: "Erro interno no servidor ao tentar salvar a despesa." });
    }
});

// Rota READ (Listar)
app.get('/expenses', (req, res) => {
    try {
        // Lemos o arquivo de texto
        const dadosBrutos = fs.readFileSync('./src/data/expenses.json', 'utf-8');

        // Convertemos o texto para um Array do JavaScript
        const despesas = JSON.parse(dadosBrutos);

        // Retorna a lista completa com o status 200 (OK)
        res.status(200).json(despesas);
    } catch (erro) {
        // Se o arquivo não existir ou der erro, aparece a seguinte mensagem
        res.status(500).json({ error: "Erro interno ao buscar as despesas." });
    }
});

// Rota Valor Total das Despesas
app.get('/expenses/summary/total', (req, res) => {
    try {
        // Lemos o ficheiro e convertemos para o Array
        const dadosBrutos = fs.readFileSync('./src/data/expenses.json', 'utf-8');
        const despesas = JSON.parse(dadosBrutos);

        // Somar todos os valores das despesas
        const total = despesas.reduce((acumulador, despesaAtual) => {
            return acumulador + despesaAtual.amount;
        }, 0); // O zero é o valor inicial do acumulador

        // Devolvendo a resposta
        res.status(200).json({ total: total });

    } catch (erro) {
        res.status(500).json({ error: "Erro interno ao calcular o total." });
    }
});

// Rota Valor por Categoria
app.get('/expenses/summary/category', (req, res) => {
    try {
        // Lemos o ficheiro e convertemos para Array
        const dadosBrutos = fs.readFileSync('./src/data/expenses.json', 'utf-8');
        const despesas = JSON.parse(dadosBrutos);

        // Criamos um objeto vazio para ser o nosso "organizador"
        const totalPorCategoria = {};

        // Agrupamento por categorias
        despesas.forEach(despesa => {
            // Se a categoria já existe no nosso objeto, apenas somamos o valor novo
            if (totalPorCategoria[despesa.category]) {
                totalPorCategoria[despesa.category] += despesa.amount;
            } else {
                // Se é a primeira vez que vemos esta categoria, criamo-la com o valor inicial
                totalPorCategoria[despesa.category] = despesa.amount;
            }
        });

        res.status(200).json(totalPorCategoria);

    } catch (erro) {
        res.status(500).json({ error: "Erro interno ao calcular os totais por categoria." });
    }
});

// Buscar por ID
app.get('/expenses/:id', (req, res) => {
    // Capturamos o ID dinâmico requisitado na URL
    const { id } = req.params;

    try {
        // Lemos o arquivo JSON
        const dadosBrutos = fs.readFileSync('./src/data/expenses.json', 'utf-8');
        const despesas = JSON.parse(dadosBrutos);

        // Buscamos no Array a despesa que tem o ID exato
        const despesaEncontrada = despesas.find(despesa => despesa.id === id);

        // Se não encontrar o id requisitado, retorna erro 404
        if (!despesaEncontrada) {
            return res.status(404).json({ error: "Despesa não encontrada." });
        }

        // Se encontrar o id requisitado, retorna a respectiva despesa
        res.status(200).json(despesaEncontrada);

    } catch (erro) {
        res.status(500).json({ error: "Erro interno ao buscar a despesa." });
    }
});

// Rota UPDATE
app.put('/expenses/:id', (req, res) => {
    // Capturamos o ID dinâmico requisitado na URL
    const { id } = req.params;

    // Captura os novos dados do body
    const dadosNovos = req.body;

    try {
        // Lemos o arquivo JSON
        const dadosBrutos = fs.readFileSync('./src/data/expenses.json', 'utf-8');
        const despesas = JSON.parse(dadosBrutos);

        // Encontramos o id da despesa que será atualizada
        const indexDespesa = despesas.findIndex(despesa => despesa.id === id);

        // Se não achar, erro 404
        if (indexDespesa === -1) {
            return res.status(404).json({ error: "Despesa não encontrada." });
        }

        // Validação do valor, assim como em CREATE
        if (dadosNovos.amount !== undefined && dadosNovos.amount <= 0) {
            return res.status(400).json({ error: "O valor da despesa deve ser maior que zero." });
        }

        // Atualização dos dados
        const despesaAtualizada = {
            ...despesas[indexDespesa], // Pega a despesa selecionada
            ...dadosNovos // Sobrescreve apenas com os dados novos que vieram
        };

        // Mantém dados que devem ser imutáveis (id e data de criação da despesa)
        despesaAtualizada.id = despesas[indexDespesa].id;
        despesaAtualizada.createdAt = despesas[indexDespesa].createdAt;

        // Trocamos a despesa velha pela atualizada dentro do Array
        despesas[indexDespesa] = despesaAtualizada;

        // Salvamos o Array inteiro de volta no arquivo JSON
        fs.writeFileSync('./src/data/expenses.json', JSON.stringify(despesas, null, 2), 'utf-8');

        // Retorna o status OK
        res.status(200).json(despesaAtualizada);

    } catch (erro) {
        res.status(500).json({ error: "Erro interno ao atualizar a despesa." });
    }
});

// Rota DELETE
app.delete('/expenses/:id', (req, res) => {
    // Capturamos o ID que será apagado
    const { id } = req.params;

    try {
        // Lemos o arquivo e convertemos para Array
        const dadosBrutos = fs.readFileSync('./src/data/expenses.json', 'utf-8');
        const despesas = JSON.parse(dadosBrutos);

        // Procuramos a POSIÇÃO (índice) da despesa no Array
        const indexDespesa = despesas.findIndex(despesa => despesa.id === id);

        // Se o id requisitado não for encontrado, retorna 404
        if (indexDespesa === -1) {
            return res.status(404).json({ error: "Despesa não encontrada." });
        }

        // Removemos a despesa do Array
        despesas.splice(indexDespesa, 1);

        // Salvamos o Array atualizado de volta no arquivo JSON
        fs.writeFileSync('./src/data/expenses.json', JSON.stringify(despesas, null, 2), 'utf-8');

        // Retorna status OK
        res.status(200).json({ message: "Despesa removida com sucesso!" });

    } catch (erro) {
        res.status(500).json({ error: "Erro interno ao tentar remover a despesa." });
    }
});

// 5. LIGANDO O SERVIDOR
app.listen(PORT, () => {
    console.log(`Servidor rodando em: http://localhost:${PORT}/`);
});