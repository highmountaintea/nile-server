# nile-server API Examples

This document demonstrates a few API requests a typical Nile application would make

### Home page - list hot items

`GET localhost:3570/listhotitems`

### Home page - list categories

`GET localhost:3570/listcategories`

### Product list - list computer books

`POST localhost:3570/listproducts`

```js
{
	"category": ["computer"]
}
```

### Product Search - search for phrase "program"

`POST localhost:3570/listproducts`

```js
{
	"textContent": "program"
}
```

### Login

`POST localhost:3570/login`

```js
{
	"username": "mozart",
	"password": "mozart2"
}
```

### View Profile

`POST localhost:3570/profile` (please use token returned from /login request)

```js
{
	"token": "trazom|1327951630251"
}
```

### Purchase

`POST localhost:3570/purchase`

```js
{
	"token": "trazom|1327951630251",
	"items": [
		{ "isbn": "0451489608", "quantity": 2 },
		{ "isbn": "1496706412", "quantity": 1 }
		],
	"payment": 43.1
}
```

### List Shopping History

`POST localhost:3570/listshoppinghistory`

```js
{
	"token": "trazom|1327951630251"
}
```
