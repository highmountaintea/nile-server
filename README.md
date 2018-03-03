# Nile Project

You are an ambitious software developer that wants to start an online bookstore. You want to create a proof of concept, code named `Nile Project`, using your favorite frontend framework. `nile-server` provides a sample backend server to make it happen.

## Impetus

With each frontend framework, such as React, mithril, and Vue, comes with the obligatory demo apps like TodoMVC. Sometimes it's a little difficult progressing from demo apps to the real world. The `Nile Project` is different. It comes with a fully functional backend that supports multiple authenticated users, with real time interactivity. You can write a product review that can be viewed by other users; when you make a purchase, it is stored in your shopping history and impacts the inventory; when you are viewing a product page, the background AJAX can check the real time inventory to see if it's low. `nile-server` handles all the backend API so you can write a good application that solves problems faced in the real world.

## Usage

To run nile-server, run this in terminal:
```js
npx nile-server
```

It pulls nile-server from npm and runs it on port 3570. Now you can use Postman to make request against it and start writing your SPA.

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
* GET `/listcategories` - returns the list of product categories
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

If the SPA wants to support text search, it needs to convert the search terms into regular expression. Let's say a user typed `albert einstein` in the search field. This can be converted into regular expression string "albert[^]+einstein". If you want to search `albert einstein` across all fields instead of just author or title, you should use the special field `textContent`. The following filter would perform a case insensitive search across all product fields:

```js
{
    "textContent": "albert[^]+einstein"
}
```
