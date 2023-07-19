const mongoose = require('mongoose');
const dotenv = require("dotenv");
dotenv.config();


const conectarDados = async () => {
    try {
        await mongoose.connect(process.env.MONGO_DB, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log("conectado no banco de dados")
        return mongoose
    }
    catch (error) {
        console.log(error)
    }


};

module.exports = conectarDados()