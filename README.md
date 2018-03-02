# Nile

You are an ambitious software developer that wants to start an online bookstore. You want to create a proof of concept, code named `Nile Project`, using your favorite front-end framework. `nile-server` provides a sample back-end server to make it happen.

## Architecture

`nile-server` tries to provide a simple yet complete API to allow development of a sample online bookstore. It stores the whole database in memory, so everything is wiped clean everytime the server is rebooted. A few JSON files are used to seed the database so it has some data to start with.

## Data tables

Each table is an array of simple objects. Here are the tables:

* Users - usernames, passwords and other preferences
* Products - available products for sale and their prices
* Hotitems - a list of ISBNs that should appear in front page
* Reviews - user reviews of products
* ShoppingHistory - list of previous purchases

## APIs

`nile-server` only provides rudimentary APIs such as login/logout, simple filtering and CRUD operations. Here are the documented API endpoints:

* GET `/listhotitems` - returns the list of products that should show up on front page
* POST `/listproducts` - returns the list of products. (POST body: filters)
* POST `/listreviews` - returns the list of reviews. (POST body: filters)
* POST `/login` - returns the login token if successful. (POST body: { username, password })
* POST `/profile` - returns the user profile. (POST body: { token })
* POST `/purchase` - purchase items. (POST body: { token, items, payment })
* POST `/listshoppinghistory` - returns the list of purchase history for the logged in user. (POST body: { token })

### Shopping cart

No API is provided for storing shopping carts. Store them in memory or web storage for now.

### Security

`nile-server` simulates token based authentication, which is a versatile security model. However, the token is not encrypted, so it is only suitable for a sample app, and please don't put any sensitive data into this database.

## Filtering

When requesting a list of items, such as a list of products, a filtering object can be passed in to narrow down the result. The object specifies the key(s) that should be filtered on, and the qualifying value(s). For example:

```js
// if the following filters are supplied when calling /listProducts, the API would return only books written by Dave that are in either mystery or computer categories.
{
    "category": ["mystery", "computer"],
    "author": "^Dave"
}
```

As shown above, a criteria can be a list of values or a regular expression. Ordinal comparison is not supported for now.
