const express = require('express');
const cors = require('cors');
const app = express();
const router = require('./routes');
const db = require('./db.js')



app.use(express.json());
app.use(cors());
app.use(router);
app.get('/', (req, res) => {
    res.send("hola, tudo bem");
});

db.then(() => {
    app.listen(4000, () => {
        console.log("funcionando na porta 4000")
    });
})
    .catch((error) => {
        res.status(400)
    });
