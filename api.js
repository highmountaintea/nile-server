const dbapi = require('./dbapi');
const required = require('required-pm').throw;

let db;

async function start() {
    db = await dbapi.loadDB();
}

function reverseString(str) {
    return str.split('').reverse().join('');
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

function generateLoginToken(username, expiration) {
    return reverseString('' + expiration + '|' + username);
}

function parseLoginToken(token) {
    let [expiration, username] = reverseString(token).split('|');
    return ({ username: username, expiration: parseInt(expiration) });
}

function testLoginToken(token) {
    let { username, expiration } = parseLoginToken(token);
    required({ username, expiration });
    let now = new Date();
    if (expiration < now.getTime()) throw new Error("login token expired");
    let user = db.users.find(u => u.username === username);
    if (user == null) throw new Error("no user found");
    return user;
}

function login(username, password) {
    required({ username, password });
    let user = db.users.find(u => u.username === username && u.password === password);
    if (user == null) throw new Error("Login failed");
    let now = new Date();
    let expiration = now.getTime() + 60 * 60000;
    return generateLoginToken(user.username, expiration);
}

function profile(token) {
    let user = testLoginToken(token);
    let prof = Object.assign({}, user);
    delete prof.password;
    return prof;
}

exports.start = start;
exports.listHotitems = listHotitems;
exports.listProducts = listProducts;
exports.listReviews = listReviews;
exports.login = login;
exports.profile = profile;
