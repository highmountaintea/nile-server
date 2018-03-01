var express = require('express');
var bodyParser = require('body-parser');
var api = require('./api');

var app = express();

app.use(bodyParser.json());

app.get('/listHotitems', async function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(api.listHotitems()));
});

async function start() {
    api.start();
    app.listen(3570, () => console.log('Example app listening on port 3570!'));
}

start();
