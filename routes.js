const express = require('express');
const router = express.Router();
const Cadastro = require('./models');

router.get('/cadastro', async (req, res) => {
    try {
        let livros = await Cadastro.find()
        res.status(200).json(livros);
    } catch (error) {
        res.status(500).json(error);
    }
});

router.post('/cadastro', async (req, res) => {
    const livro = new Cadastro(req.body);
    await livro.save()
        .then(() => {
            res.status(201).json(livro);
        })
        .catch((error) => {
            res.status(500).json({ error: error.message });
        });
});
router.put('/cadastro/:id', (req, res) => {
    Cadastro.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then((Cadastro) => {
            res.json(livros);
        })
        .catch((error) => {
            res.status(500).json({ error: error.message });
        });
});
router.delete('/cadastro/:id', (req, res) => {
    Cadastro.findByIdAndDelete(req.params.id)
        .then((Cadastro) => {
            res.json({ message: 'livro deletado' });
        })
        .catch((error) => {
            res.status(500).json({ error: error.message });
        });
});

module.exports = router;