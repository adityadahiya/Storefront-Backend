# Image Processing API
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

### Dependencies

* [Node JS](https://nodejs.org/en/download/)  
* PostgreSQL Database

### Database Setup
1. Connect to the default postgres database as the server's root user psql -U postgres.
2. Create a new user using the following command.
```
CREATE USER store_manager WITH PASSWORD 'password';
```
3. Create a dev and test database using the following command.
```
CREATE DATABASE store_front;
CREATE DATABASE store_front_test;
```
4.Connect to the databases and grant all privileges using the following command.
```
\c store_front
GRANT ALL PRIVILEGES ON DATABASE store_front TO store_manager;
\c store_front_test
GRANT ALL PRIVILEGES ON DATABASE store_front_test TO store_manager;
```

### Installation

1. Clone or download this repository and change directory (cd) to the root of the repository - [Storefront-Backend].
2. To install the dependencies run command [npm install].
3. Create a .env file in the root of the directory and add following content: 
	```
	POSTGRES_HOST=127.0.0.1
	POSTGRES_DB=store_front
	POSTGRES_TEST_DB=store_front_test
	POSTGRES_USER=store_manager
	POSTGRES_PASSWORD=password
	BCRYPT_PASSWORD=secret_password
	SALT_ROUNDS=10
	TOKEN_SECRET=secret_token
	ENV=dev
	```
4. Run command [db-migrate up] in cmd.
5. To start the server run command [npm run start].

## Testing

 To run included tests:

1. Start the server using [npm run start].
1. In a separate terminal run command [npm run test].

## Running Ports
After start up, the server will start on port 3000 and the database on port 5432
