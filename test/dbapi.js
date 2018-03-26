/* eslint-env mocha */
const expect = require('chai').expect;
const dbapi = require('../dbapi');

describe('ensure all items are arrays', () => {
  let db;

  before(async () => {
    db = await dbapi.loadDB();
  });

  it('everything is array', () => {
    expect(db.users).to.be.a('array');
    expect(db.products).to.be.a('array');
    expect(db.reviews).to.be.a('array');
    expect(db.hotitems).to.be.a('array');
    expect(db.shoppinghistory).to.be.a('array');
  });
});
