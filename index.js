#!/usr/bin/env node

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const api = require('./api');

let app = express();
app.use(cors());

app.use(bodyParser.json());

app.get('/listhotitems', (req, res) => {
    let result = api.listHotitems();
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(result));
});

app.post('/listproducts', (req, res) => {
    let result = api.listProducts(req.body);
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(result));
});

app.post('/listreviews', (req, res) => {
    let result = api.listReviews(req.body);
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(result));
});

app.use((err, req, res, next) => {
    res.status(500);
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({ error: err.toString() }));
});

async function start() {
    api.start();
    app.listen(3570, () => console.log('nile-server listening on port 3570!'));
}

start();
