const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const cadastroSchema = new Schema({
    id: Number,
    titulo: String,
    num_paginas: Number,
    isbn: Number,
    editora: String
});

const Cadastro = mongoose.model('Cadastro', cadastroSchema);

module.exports = Cadastro;