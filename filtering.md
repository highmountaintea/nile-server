# nile-server Filtering

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
