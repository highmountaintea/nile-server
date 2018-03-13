#!/usr/bin/env node

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const api = require('./api');

let port = process.env.PORT || 3570;

let app = express();
app.use(cors());

app.use(bodyParser.json());

app.get('/listhotitems', (req, res) => {
    let result = api.listHotitems();
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(result));
});

app.get('/listcategories', (req, res) => {
    let result = api.listCategories();
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

app.post('/login', (req, res) => {
    let result = api.login(req.body.username, req.body.password);
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(result));
});

app.post('/profile', (req, res) => {
    let result = api.profile(req.body.token);
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(result));
});

app.post('/purchase', (req, res) => {
    let { token, items, payment } = req.body;
    api.purchase(token, items, payment);
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({ success: true }));
});

app.post('/supplyinventory', (req, res) => {
    let { items } = req.body;
    api.supplyInventory(items);
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({ success: true }));
});

app.post('/listshoppinghistory', (req, res) => {
    let { token } = req.body;
    let history = api.listShoppingHistory(token);
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(history));
});

app.post('/addreview', (req, res) => {
    let { token, isbn, rating, title, text } = req.body;
    api.addReview(token, isbn, rating, title, text);
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({ success: true }));
});

app.use((err, req, res, next) => {
    res.status(500);
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({ error: err.toString() }));
});

async function start() {
    api.start();
    app.listen(port, () => console.log('nile-server listening on port ' + port + '!'));
}

start();
