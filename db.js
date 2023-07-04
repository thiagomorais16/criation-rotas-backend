const mongoose = require('mongoose');
const { db } = require('./models');
require('dotenv').config();

const MONGO_DB = process.env.MONGO_DB;
mongoose.connect(MONGO_DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

    .then(() => {
        console.log('Conectado no MongoDB');
    })
    .catch((error) => {
        console.error('Error connection to MongoDB', error);
    });

module.exports = mongo;