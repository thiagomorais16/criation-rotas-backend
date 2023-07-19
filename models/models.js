const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const cadastroSchema = new Schema({
    nome: String,
    titulo: String,
    numeroPaginas: Number,
    codigoISBN: Number,
    editora: String
});

const Cadastro = mongoose.model('Cadastro', cadastroSchema);

module.exports = Cadastro;