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
router.delete('/livros/:id', async (req, res) => {
    try {
        console.log("oi");
        await Cadastro.findByIdAndDelete(req.params.id);
        res.json({ message: 'Cadastro Deletado' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;