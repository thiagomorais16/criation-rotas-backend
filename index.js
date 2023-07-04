const express = require('express');
const app = express();
const routes = require('./routes');

app.use(express.json());
app.use('/', routes);
app.get('/', (req, res) => {
    res.send("hola, tudo bem");
});

app.listen(4000, () => {
    console.log("funcionando na porta 4000")
});