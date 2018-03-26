/* eslint-env mocha */
const expect = require('chai').expect;
const api = require('../api');

describe('test some API functions', () => {
  before(async () => {
    await api.start();
  });

  it('has hotitems', () => {
    let hotitems = api.listHotitems();
    let isbn = hotitems[0].isbn;
    let items = api.listProducts({ isbn: isbn });
    expect(items.length).to.equal(1);
  });

  it('has categories', () => {
    expect(api.listCategories()[0]).to.be.a('string');
  });

  it('can add balance', () => {
    let token = api.login('newton', 'newton2');
    let balance = api.profile(token).balance;
    api.addBalance(token, '5555666677778888', 50);
    expect(api.profile(token).balance - balance).to.equal(50);
  });

  it('can purchase', () => {
    let token = api.login('newton', 'newton2');
    let balance = api.profile(token).balance;
    let items = api.listProducts();
    let total = items[0].price + items[1].price;
    api.purchase(token, [
      { isbn: items[0].isbn, quantity: 1 },
      { isbn: items[1].isbn, quantity: 1 },
    ], total);
    expect(balance - api.profile(token).balance).to.equal(total);
  });
});
