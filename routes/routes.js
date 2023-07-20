const express = require('express');
const router = express.Router();
const Cadastro = require('../models/models');



router.get('/cadastro', async (req, res) => {
    try {
        let livros = await Cadastro.find()
        res.status(200).json(livros);
    } catch (error) {
        res.status(500).json(error);
    }
});

router.post('/cadastro', async (req, res) => {

    try {
        const { id, titulo, numeroPaginas, codigoISBN, editora } = req.body;

        //Verificar se todos os campos obrigatórios estão presentes
        if (!id || !titulo || !numeroPaginas || !codigoISBN || !editora) {
            return res.status(400).json({ message: 'Todos os campos são obrigatórios' });
        }
        // Verificar se o titulo já existe
        const livro = await Cadastro.findOne({ titulo });
        if (livro) {
            return res.status(400).json({ message: 'o numero de paginas precisa ser um número válido' });
        }
        // verificar se o número de páginas é um número válido
        if (typeof numeroPaginas !== 'number' || isNaN(numeroPaginas) || numeroPaginas <= 0) {
            return res.status(400).json({ message: ' O número de paginas precisa ser um número válido' })
        }

        // Verificar se o código ISBN é válido
        if (codigoISBN === 0 || typeof codigoISBN !== 'number') {
            return res.status(400).json({ message: 'O código ISBN precisa ser um número válido e diferente de zero' });
        }
        // Verificar se o id é valido
        if (id === 0 || typeof id !== 'number') {
            return res.status(400).json({ message: 'O id precisa ser um número válido e diferente de zero' })
        }
        // Todos os dados estão válidos, pode prosseguir com o cadastro
        const livroNovo = new Cadastro(req.body);
        await livroNovo.save();
        res.status(201).json(livro);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
router.put('/cadastro/:id', async (req, res) => {
    try {
        const updateId = req.params.id;
        const novosDados = req.body;

        const existenteId = await Cadastro.findById(updateId);

        // verificar se o id existe
        if (!existenteId) {
            return res.status(404).json({ message: 'Id não encontrado' });
        }

        // Realizar a atualizações dos dados
        const atualizadoId = await Cadastro.findByIdAndUpdate(updateId, novosDados, { new: true });
        res.json(atualizadoId);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
router.delete('/cadastro/:id', async (req, res) => {
    try {
        await Cadastro.findByIdAndDelete(req.params.id);
        res.json({ message: 'Cadastro Deletado' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;