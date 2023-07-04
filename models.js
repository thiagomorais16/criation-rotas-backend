const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const exemploSchema = new Schema({
    nome: String,
    idade: Number
});

const Exemplo = mongoose.model('Exemplo', exemploSchema);

module.exports = Exemplo;