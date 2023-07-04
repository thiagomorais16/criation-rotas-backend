const express = require('express');
const router = express.Router();
const Exemplo = require('./models');

router.get('/exemplos', (req, res) => {
    Exemplo.find()
    .then((Exemplo) => {
        res.json (exemplos);
    })
    .catch((error) => {
        res.status(500).json({ error: error.message});
    
    });
});
router.post('/exemplos', (req, res) => {
    const exemplo = new Exemplo (req.body);
    exemplo.save()
    .then(() => {
        res.status(201).json (exemplo);
    })
    .catch((error) => {
        res.status(500).json({ error: error.message });
    });
})

module.exports = router;