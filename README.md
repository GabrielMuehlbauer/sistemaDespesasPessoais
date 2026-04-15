# Sistema de Despesas Pessoais (Expenses Control)

## 📖 Visão Geral do Projeto

O **Expenses Control** é uma API REST desenvolvida em Node.js para facilitar o gerenciamento de finanças pessoais. Ele permite aos usuários realizar as operações clássicas de um CRUD (Criar, Ler, Atualizar e Deletar) sobre despesas do dia a dia. 

Além das operações padrão, a API também fornece endpoints analíticos simples, como o cálculo de totais gastos e totais agrupados por categoria. Para facilitar e manter a simplicidade estrutural neste momento do projeto, a persistência de dados (banco de dados) é feita em um arquivo de texto local formato `.json`.

Este projeto é fruto de um trabalho da Unidade Curricular de Back End.

---

## 🚀 Principais Tecnologias Utilizadas

- **Node.js**: Ambiente de execução JavaScript para construção do servidor back-end.
- **Express.js**: Framework minimalista que facilita a criação das rotas HTTP e gerenciamento de middlewares.
- **Nodemon**: Ferramenta de desenvolvimento que reinicia automaticamente o servidor ao identificar alterações no código.
- **Módulos Nativos do Node.js**:
  - `fs` (File System): Utilizado para ler e escrever dados de forma persistente no arquivo `expenses.json`.
  - `crypto`: Utilizado através da função `randomUUID()` para criar Identificadores Únicos seguros para as despesas registradas.

---

## ⚙️ Instruções para Funcionamento

### Pré-requisitos
* Ter o **Node.js** e o gerenciador de pacotes **npm** instalados na sua máquina.

### Rodando o Projeto
1. Clone o repositório para a sua máquina:
   ```bash
   git clone https://github.com/GabrielMuehlbauer/sistemaDespesasPessoais.git
   ```
2. Acesse a pasta do projeto:
   ```bash
   cd sistemaDespesasPessoais
   ```
3. Instale todas as dependências do projeto listadas no `package.json`:
   ```bash
   npm install
   ```
4. *Importante:* Certifique-se de que a estrutura de pastas e arquivo `src/data/expenses.json` exista na raiz com um array vazio `[]` para evitar erros de leitura.
5. Inicie o servidor:
   * Para iniciar no modo de desenvolvimento (o servidor vai reiniciar sozinho quando você alterar algum código):
     ```bash
     npm run dev
     ```
   * Para iniciar o servidor no modo padrão:
     ```bash
     npm start
     ```
6. A aplicação estará rodando em: `http://localhost:3000/`

---

## 🔀 Rotas da API e Exemplos

Abaixo estão as rotas disponíveis na aplicação, os seus respectivos métodos e exemplos de envios de dados (body) para quando necessários.

### 1. Mensagem de Boas-vindas
* **Método**: `GET`
* **Rota**: `/`
* **Descrição**: Rota de teste. Retorna uma mensagem confirmando que a API está no ar e funcionando.

### 2. Criar uma nova Despesa (CREATE)
* **Método**: `POST`
* **Rota**: `/expenses`
* **Descrição**: Registra uma nova despesa. Os campos `title` (Título) e `amount` (Valor maior que zero) são obrigatórios.
* **Exemplo de Body (JSON)**:
  ```json
  {
    "title": "Mercado mensal",
    "amount": 450.50,
    "category": "Alimentação",
    "date": "2023-11-20",
    "description": "Compras do mês no atacadista"
  }
  ```

### 3. Listar Todas as Despesas (READ)
* **Método**: `GET`
* **Rota**: `/expenses`
* **Descrição**: Busca no arquivo local e retorna a lista com todas as despesas cadastradas.

### 4. Buscar Despesa por ID
* **Método**: `GET`
* **Rota**: `/expenses/:id`
* **Descrição**: Busca uma despesa específica na base de dados com base no `:id` fornecido na URL.

### 5. Resumo: Valor Total
* **Método**: `GET`
* **Rota**: `/expenses/summary/total`
* **Descrição**: Realiza a soma de todos os valores de despesas registrados e retorna o valor total.

### 6. Resumo: Gasto por Categoria
* **Método**: `GET`
* **Rota**: `/expenses/summary/category`
* **Descrição**: Agrupa todas as despesas por sua categoria e retorna o total gasto em cada uma delas.

### 7. Atualizar Despesa (UPDATE)
* **Método**: `PUT`
* **Rota**: `/expenses/:id`
* **Descrição**: Atualiza as informações de uma despesa específica. Você não precisa enviar a despesa completa, apenas os campos que deseja alterar (o `id` e a data de criação são mantidos pela API de forma segura).
* **Exemplo de Body (JSON)**:
  ```json
  {
    "amount": 500.00
  }
  ```

### 8. Remover Despesa (DELETE)
* **Método**: `DELETE`
* **Rota**: `/expenses/:id`
* **Descrição**: Localiza a despesa correspondente ao `:id` na URL e a remove permanentemente da base de dados.
