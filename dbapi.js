const fs = require('fs-extra');

async function loadDB() {
    let db = {};
    db.users = JSON.parse(await fs.readFile('./db/users.json', 'utf8'));
    db.products = JSON.parse(await fs.readFile('./db/products.json', 'utf8'));
    db.reviews = JSON.parse(await fs.readFile('./db/reviews.json', 'utf8'));
    db.hotitems = JSON.parse(await fs.readFile('./db/hotitems.json', 'utf8'));
    return db;
}

exports.loadDB = loadDB;
