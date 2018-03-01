const path = require('path');
const fs = require('fs-extra');

async function loadDB() {
    let db = {};
    db.users = JSON.parse(await fs.readFile(path.join(__dirname, 'db/users.json'), 'utf8'));
    db.products = JSON.parse(await fs.readFile(path.join(__dirname, 'db/products.json'), 'utf8'));
    db.reviews = JSON.parse(await fs.readFile(path.join(__dirname, 'db/reviews.json'), 'utf8'));
    db.hotitems = JSON.parse(await fs.readFile(path.join(__dirname, 'db/hotitems.json'), 'utf8'));
    return db;
}

exports.loadDB = loadDB;
