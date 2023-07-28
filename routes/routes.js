const express = require('express');
const router = express.Router();
const Cadastro = require('../models/models');



router.get('/livros', async (req, res) => {
    try {
        let livros = await Cadastro.find()
        res.status(200).json(livros);
    } catch (error) {
        res.status(500).json(error);
    }
});
router.get('/livros/:id', async (req, res) => {
    try {
        let livros = await Cadastro.findOne({ id: req.params.id })
        res.status(200).json(livros);
    } catch (error) {
        res.status(500).json(error);
    }
});

router.post('/livros', async (req, res) => {

    try {
        const { id, titulo, num_paginas, isbn, editora } = req.body;

        // Verificar se o titulo já existe
        const livro = await Cadastro.findOne({ titulo });
        if (livro) {
            return res.status(400).json({ message: 'o numero de paginas precisa ser um número válido' });
        }
        // verificar se o número de páginas é um número válido
        if (typeof num_paginas !== 'number' || isNaN(num_paginas) || num_paginas <= 0) {
            return res.status(400).json({ message: ' O número de paginas precisa ser um número válido' })
        }


        // Todos os dados estão válidos, pode prosseguir com o cadastro
        const livroNovo = new Cadastro(req.body);
        await livroNovo.save();
        res.status(201).json(livro);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
router.put('/livros/:id', async (req, res) => {
    console.log(req.body);
    try {
        const id = req.params.id;
        const novosDados = req.body;

        // Verificar se o livro com o ID existe
        const existenteId = await Cadastro.findOneAndUpdate({ id }, { $set: req.body });

        if (!existenteId) {
            return res.status(404).json({ message: 'Id não encontrado' });
        }

        res.json(existenteId);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


router.delete('/livros/:id', async (req, res) => {
    try {
        const cadastroEncontrado = await Cadastro.findOneAndDelete({ id: req.params.id });
        res.json({ message: 'Cadastro Deletado' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;