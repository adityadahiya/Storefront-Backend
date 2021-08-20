/* Replace with your SQL commands */

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(100) NOT NULL,
    firstname VARCHAR(100) NOT NULL,
    lastname VARCHAR(100),
    password_digest VARCHAR
);

CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(64) NOT NULL,
    price integer NOT NULL,
    category VARCHAR(64),
    imageURL VARCHAR(512)
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

INSERT INTO products (name, price, category, imageURL) VALUES('Book', 25, 'Milk and Honey by Rupi Kaur', 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80');
INSERT INTO products (name, price, category, imageURL) VALUES('Headphones', 250, 'JBL Infinity', 'https://images.unsplash.com/photo-1583394838336-acd977736f90?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80');
INSERT INTO products (name, price, category, imageURL) VALUES('Backpack', 50, 'Adidas Backpack', 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80');
INSERT INTO products (name, price, category, imageURL) VALUES('Glasses', 100, 'Rayban Frameless Glasses', 'https://images.unsplash.com/photo-1591076482161-42ce6da69f67?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80');
INSERT INTO products (name, price, category, imageURL) VALUES('Cup', 10, '250ml Mug', 'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80');
INSERT INTO products (name, price, category, imageURL) VALUES('Shirt', 50, 'Plain white round-neck T-Shirt', 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=800&q=80');

COMMIT;