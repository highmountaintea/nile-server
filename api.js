const dbapi = require('./dbapi');
const required = require('required-pm').throw;

let db;

async function start() {
  db = await dbapi.loadDB();
}

function reverseString(str) {
  return str.split('').reverse().join('');
}

function textContent(obj) {
  let result = '';
  let keys = Object.keys(obj);
  for (let key of keys) { // eslint-disable-line
    result += '' + key + ':\n' + obj[key] + '\n';
  }
  return result;
}

function filterList(list, filters) {
  if (filters == null) return list;
  return list.filter((item) => {
    let keys = Object.keys(filters);
    for (let key of keys) { // eslint-disable-line
      let value = key === 'textContent' ? textContent(item) : item[key];
      let filter = filters[key];
      if (Array.isArray(filter)) {
        if (!filter.includes(value)) return false;
      } else {
        if (!value.toString().match(new RegExp(filter, 'i'))) return false; // eslint-disable-line
      }
    }
    return true;
  });
}

function listHotitems() {
  return db.products.filter(prod => db.hotitems.includes(prod.isbn));
}

function listCategories() {
  let keys = {};
  for (let product of db.products) { // eslint-disable-line
    keys[product.category] = true;
  }
  return Object.keys(keys);
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
  if (expiration < now.getTime()) throw new Error('login token expired');
  let user = db.users.find(u => u.username === username);
  if (user == null) throw new Error('no user found');
  return user;
}

function login(username, password) {
  required({ username, password });
  let user = db.users.find(u => u.username === username && u.password === password);
  if (user == null) throw new Error('Login failed');
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

function randomlyResupply() {
  let i = Math.floor(Math.random() * db.products.length);
  let product = db.products[i];
  if (product.inventory <= 2) {
    product.inventory += (2 + Math.floor(Math.random() * 7));
  }
}

function purchase(token, items, payment) {
  let user = testLoginToken(token);
  // check balance
  if (payment > user.balance) throw new Error('' + user.username + ' has insufficient fund. Balance = ' + user.balance);
  // verify item list and inventory, and ensure payment matches sum
  let sum = 0;
  for (let item of items) {   // eslint-disable-line
    let { isbn, quantity } = item;
    required({ isbn, quantity });
    let product = db.products.find(p => p.isbn === isbn);
    if (product == null) throw new Error('Item ' + isbn + ' not found');
    if (product.inventory < quantity) throw new Error('Item ' + isbn + ' has insufficient inventory');
    sum += product.price * quantity;
  }
  if (sum !== payment) throw new Error('Cart total of ' + sum + ' does not match payment');
  // reduce inventory and push shopping to history
  let now = new Date();
  for (let item of items) {   // eslint-disable-line
    let { isbn, quantity } = item;
    let product = db.products.find(p => p.isbn === isbn);
    product.inventory -= quantity;
  }
  user.balance -= payment;
  db.shoppinghistory.push({ username: user.username, timestamp: now.getTime(), items: items, payment });
  // randomly respply
  randomlyResupply();
}

function supplyInventory(items) {
  // ensure all items are valid
  for (let item of items) { // eslint-disable-line
    let { isbn, quantity } = item;
    required({ isbn, quantity });
    let product = db.products.find(p => p.isbn === isbn);
    if (product == null) throw new Error('Item ' + isbn + ' not found');
  }
  // now add inventory
  for (let item of items) { // eslint-disable-line
    let { isbn, quantity } = item;
    let product = db.products.find(p => p.isbn === isbn);
    product.inventory += quantity;
  }
}

function addBalance(token, cardNo, amount) {
  required({ token, cardNo, amount });
  let user = testLoginToken(token);
  if (cardNo !== '5555666677778888') throw new Error('Invalid credit card');
  user.balance += amount;
}

function listShoppingHistory(token) {
  required({ token });
  let user = testLoginToken(token);
  return db.shoppinghistory.filter(row => row.username === user.username);
}

function addReview(token, isbn, rating, title, text) {
  required({ token, isbn, rating, title, text });
  let user = testLoginToken(token);
  if (!(rating >= 1 && rating <= 5)) throw new Error('invalid rating');
  let now = new Date();
  db.reviews.push({ username: user.username, timestamp: now.getTime(), isbn, rating, title, text });
}

exports.start = start;
exports.listHotitems = listHotitems;
exports.listCategories = listCategories;
exports.listProducts = listProducts;
exports.listReviews = listReviews;
exports.login = login;
exports.profile = profile;
exports.purchase = purchase;
exports.supplyInventory = supplyInventory;
exports.addBalance = addBalance;
exports.listShoppingHistory = listShoppingHistory;
exports.addReview = addReview;
