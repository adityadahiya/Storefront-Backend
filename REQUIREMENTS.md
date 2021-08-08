# API Requirements
```
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 
```
## API Endpoints

#### Authenticate
 POST /users/authenticate
Send username and password to get an authentication token.
```
Request Data: { username: string, password: string }
```

#### Products
```
- POST "/products/" (Required Authorization Header)
Create a new product by sending its name and price.
Request Data: { name: string, price: number }
```
```
- GET "/products"
Receive a list of all the products in the products table.
```
```
- GET "/product/:id/"
Receive details of a product using its id.
```
```
- DELETE "/product/:id/" (Required Authorization Header)
Remove a product from the products table using its id. 
```

#### Users
```
- POST "/users/"
Create a new user by sending its details.
Request Data: { firstname: string, lastname: string, username: string, password: string }
```
```
- GET "/users" (Required Authorization Header)
Receive a list of all the users in the users table.
```
```
- GET "/users/:id/" (Required Authorization Header)
Receive details of a user using its id.
```
```
- DELETE "/users/:id/" (Required Authorization Header)
Remove a user from the users table using its id. 
```

#### Orders
```
- POST "/orders/" (Required Authorization Header)
Create a new order by sending its status and userId.
Request Data: { status: string, userId: number }
```
```
- POST "/orders/:id/products" (Required Authorization Header)
Create a new user by sending its status and userId.
Request Data: { productId: number, quantity: number }
```
```
- DELETE "/orders/:id/products" (Required Authorization Header)
Create a new user by sending its status and userId.
Request Data: {productId: number }
```
```
- GET "/orders" (Required Authorization Header)
Receive a list of all the orders in the orders table.
```
```
- GET "/orders/:id/" (Required Authorization Header)
Receive details of an order using its id.
```
```
- DELETE "/orders/:id/" (Required Authorization Header)
Remove an order from the orders table using its id. 
```

## Database Schema
```
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(100),
    firstname VARCHAR(100),
    lastname VARCHAR(100),
    password_digest VARCHAR
);

CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(64) NOT NULL,
    price integer NOT NULL,
    category VARCHAR(64)
);

CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    status VARCHAR(15),
    userId bigint REFERENCES users(id)
);

CREATE TABLE order_products (
    id SERIAL PRIMARY KEY,
    quantity integer NOT NULL,
    order_id bigint REFERENCES orders(id) NOT NULL,
    product_id bigint REFERENCES products(id) NOT NULL
);
```

## Data Shapes
```
Product
- id: number
- name: string
- price: number
- category: string

User
- id: string
- firstname: string
- lastname: string
- username: string
- password: string

Order
- id: number
- status: string
- products: [{ product_id: number, quantity: number }]
- user_id: string

Order_Products
- id: number
- orderId: string
- productId: number
```
