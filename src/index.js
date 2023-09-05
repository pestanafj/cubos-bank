const express = require('express');
const app = express();

const roteador = require('./roteador');

const PORTA = 3000;

app.use(express.json());

app.use(roteador);

app.listen(PORTA, () => {
    console.log(`🚀 O Servidor foi iniciado em http://localhost:${PORTA}`);
});