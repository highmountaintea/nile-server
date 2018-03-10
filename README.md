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

## More Documentations

* [Example API requests](https://github.com/johnfliu818/nile-server/blob/master/api-examples.md)
* [Filtering data](https://github.com/johnfliu818/nile-server/blob/master/filtering.md)

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
* POST `/supplyinventory` - replenish inventory items. (POST body: { items })
* POST `/listshoppinghistory` - returns the list of purchase history for the logged in user. (POST body: { token })
* POST `/addreview` - add a review. (POST body: { token, isbn, rating, title, text })

**API Examples**: [here](https://github.com/johnfliu818/nile-server/blob/master/api-examples.md) are some examples of using the API.

### Shopping cart

No API is provided for storing shopping carts. Store them in memory or web storage for now.

### Security

`nile-server` simulates token based authentication, which is a versatile security model. However, the token is not encrypted, so it is only suitable for a sample app, and please don't put any sensitive data into this database. Here are the username/password that would work for the `/login` endpoint:

* confucius / confucius2
* newton / newton2
* curie / curie2
* mozart / mozart2
* ada / ada2

### Sample Implementation

[nile-mithril](https://github.com/johnfliu818/nile-mithril) is a fully functioning sample application that uses nile-server. Go to [its GitHub Page](https://github.com/johnfliu818/nile-mithril) to view its source.