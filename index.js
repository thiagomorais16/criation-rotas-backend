const express = require('express');
const cors = require('cors');
const app = express();
const router = require('./routes/routes');
const db = require('./bancoDados/db.js')



app.use(express.json());
app.use(cors());
app.use(router);
app.get('/', (req, res) => {
    res.send("hola, tudo bem");
});

db.then(() => {
    app.listen(3000, () => {
        console.log("funcionando na porta 3000")
    });
})
    .catch((error) => {
        res.status(400)
    });
