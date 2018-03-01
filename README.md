# Nile

You are an ambitious software developer that wants to start an online bookstore. You want to create a proof of concept app using your favorite front-end framework. `nile-server` provides a sample back-end server to make it happen.

## Architecture

It stores the whole database in memory, so everything is wiped clean everytime the server is rebooted. A few JSON files are used to seed the database so it has some data to start with.

## Data tables

Each table is an array of simple objects. Here are the tables:

* Users - usernames, passwords and other preferences
* Products - available products for sale and their prices
* Hotitems - a list of ISBNs that should appear in front page
* Reviews - user reviews of products

# APIs

API will be growing. Here are the documented ones:

* `/listHotitems` - returns the list of products that should show up on front page
