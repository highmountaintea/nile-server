const dbapi = require('./dbapi');

let db;

async function start() {
    db = await dbapi.loadDB();
}

function listHotitems() {
    return db.products.filter(prod => db.hotitems.includes(prod.isbn));
}

exports.start = start;
exports.listHotitems = listHotitems;
