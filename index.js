const express = require('express');
const cors = require('cors');
const app = express();
const router = require('./routes');
const mongo = require('./db');


app.use(express.json());
app.use(cors());
app.use(mongo);
app.use(router);
app.get('/', (req, res) => {
    res.send("hola, tudo bem");
});

app.listen(4000, () => {
    console.log("funcionando na porta 4000")
});