#!/usr/bin/env node

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const api = require('./api');

let app = express();
app.use(cors());

app.use(bodyParser.json());

app.get('/listHotitems', async function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(api.listHotitems()));
});

async function start() {
    api.start();
    app.listen(3570, () => console.log('nile-server listening on port 3570!'));
}

start();
