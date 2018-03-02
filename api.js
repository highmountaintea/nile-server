const dbapi = require('./dbapi');

let db;

async function start() {
    db = await dbapi.loadDB();
}

function filterList(list, filters) {
    if (filters == null) return list;
    return list.filter(item => {
        let keys = Object.keys(filters);
        for (let key of keys) {
            let value = item[key];
            let filter = filters[key];
            if (Array.isArray(filter)) {
                if (!filter.includes(value)) return false;
            } else {
                if (!value.toString().match(filter)) return false;
            }
        }
        return true;
    });
}

function listHotitems() {
    return db.products.filter(prod => db.hotitems.includes(prod.isbn));
}

function listProducts(filters) {
    return filterList(db.products, filters);
}

function listReviews(filters) {
    return filterList(db.reviews, filters);
}

exports.start = start;
exports.listHotitems = listHotitems;
exports.listProducts = listProducts;
exports.listReviews = listReviews;
