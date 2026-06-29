const CategoryController = require('../controllers/category');

class Category {
    constructor() {}

    async create(req, res) {
        try {
            const { name, description } = req.body;
            const userId = req.user.id; // Captura o ID do usuário logado

            const novaCategoria = (await CategoryController.create(name, description, userId)).toJSON();

            novaCategoria._links = [
                {
                    rel: "self",
                    method: "GET",
                    href: `http://localhost:3000/api/categories/${novaCategoria.id}`
                },
                {
                    rel: "update",
                    method: "PUT",
                    href: `http://localhost:3000/api/categories/${novaCategoria.id}`
                },
                {
                    rel: "delete",
                    method: "DELETE",
                    href: `http://localhost:3000/api/categories/${novaCategoria.id}`
                },
                {
                    rel: "all_categories",
                    method: "GET",
                    href: "http://localhost:3000/api/categories"
                }
            ];

            res.status(201).json(novaCategoria);
        } catch (error) {
            res.status(error.statusCode || 500).json({ error: error.message });
        }
    }

    async getAll(req, res) {
        try {
            const userId = req.user.id; // Filtra as categorias pelo usuário logado

            const categorias = await CategoryController.getAll(userId);

            const categoriasComLinks = categorias.map(categoria => {
                const categoriaFormatada = categoria.toJSON();
                categoriaFormatada._links = [
                    {
                        rel: "self",
                        method: "GET",
                        href: `http://localhost:3000/api/categories/${categoriaFormatada.id}`
                    },
                    {
                        rel: "update",
                        method: "PUT",
                        href: `http://localhost:3000/api/categories/${categoriaFormatada.id}`
                    },
                    {
                        rel: "delete",
                        method: "DELETE",
                        href: `http://localhost:3000/api/categories/${categoriaFormatada.id}`
                    }
                ];
                return categoriaFormatada;
            });

            res.status(200).json(categoriasComLinks);
        } catch (erro) {
            // Pega o status que veio do Controller/Model, ou usa 500 se for um erro inesperado do sistema
            const status = erro.statusCode || 500;

            // Devolve a resposta dinâmica
            return res.status(status).json({ error: erro.message });
        }
    }

    async getById(req, res) {
        try {
            const { id } = req.params;
            const userId = req.user.id; // Filtra as categorias pelo usuário logado

            const categoria = await CategoryController.getById(id, userId);

            if (!categoria) {
                return res.status(404).json({ error: "Categoria não encontrada" });
            }

            const categoriaFormatada = categoria.toJSON();

            categoriaFormatada._links = [
                {
                    rel: "self",
                    method: "GET",
                    href: `http://localhost:3000/api/categories/${categoriaFormatada.id}`
                },
                {
                    rel: "update",
                    method: "PUT",
                    href: `http://localhost:3000/api/categories/${categoriaFormatada.id}`
                },
                {
                    rel: "delete",
                    method: "DELETE",
                    href: `http://localhost:3000/api/categories/${categoriaFormatada.id}`
                }
            ];

            res.status(200).json(categoriaFormatada);
        } catch (erro) {
            // Pega o status que veio do Controller/Model, ou usa 500 se for um erro inesperado do sistema
            const status = erro.statusCode || 500;

            // Devolve a resposta dinâmica
            return res.status(status).json({ error: erro.message });
        }
    }

    async update(req, res) {
        try {
            const { id } = req.params;
            const { name, description } = req.body;
            const userId = req.user.id; // Filtra as categorias pelo usuário logado

            const categoriaAtualizada = await CategoryController.update(id, name, description, userId);

            if (!categoriaAtualizada) {
                return res.status(404).json({ error: "Categoria não encontrada" });
            }

            const categoriaFormatada = categoriaAtualizada.toJSON();
            categoriaFormatada._links = [
                {
                    rel: "self",
                    method: "GET",
                    href: `http://localhost:3000/api/categories/${categoriaFormatada.id}`
                },
                {
                    rel: "update",
                    method: "PUT",
                    href: `http://localhost:3000/api/categories/${categoriaFormatada.id}`
                },
                {
                    rel: "delete",
                    method: "DELETE",
                    href: `http://localhost:3000/api/categories/${categoriaFormatada.id}`
                }
            ];

            res.status(200).json(categoriaFormatada);
        } catch (erro) {
            // Pega o status que veio do Controller/Model, ou usa 500 se for um erro inesperado do sistema
            const status = erro.statusCode || 500;

            // Devolve a resposta dinâmica
            return res.status(status).json({ error: erro.message });
        }
    }

    async remove(req, res) {
        try {
            const { id } = req.params;

            const userId = req.user.id; // Filtra as categorias pelo usuário logado

            const categoriaExcluida = await CategoryController.remove(id, userId);

            if (!categoriaExcluida) {
                return res.status(404).json({ error: "Categoria não encontrada" });
            }

            const respostaDelete = { message: "Categoria excluída com sucesso!",
                _links: [
                    {
                        rel: "all_categories",
                        method: "GET",
                        href: "http://localhost:3000/api/categories"
                    }
                ]};

            res.status(200).json(respostaDelete);
        } catch (erro) {
            // Pega o status que veio do Controller/Model, ou usa 500 se for um erro inesperado do sistema
            const status = erro.statusCode || 500;

            // Devolve a resposta dinâmica
            return res.status(status).json({ error: erro.message });
        }
    }
}

module.exports = new Category();