# Image Processing API
An API that can be used in two different ways. As a simple placeholder API, the first allows you to place images into your frontend with the size set via URL parameters (and additional stylization if you choose) for rapid prototyping. The second use case is as a library to serve properly scaled versions of your images to the front end to reduce page load size. Rather than needing to resize and upload multiple copies of the same image to be used throughout your site, the API you create will handle resizing and serving stored images for you.

### Dependencies

* [Node JS](https://nodejs.org/en/download/)  
* PostgreSQL Database

### Database Setup
1. Create a new user and a database in PostgreSQL.
```
CREATE USER store_manager WITH PASSWORD 'password';
CREATE DATABASE store_front;
GRANT ALL PRIVILEGES ON DATABASE shopping TO store_manager;
```

### Installation

1. Clone or download this repository and change directory (cd) to this repository - [Storefront-Backend].
2. To install the dependencies run command [npm install].
3. Create a .env file in the root of the directory and add following content: 
	```
	POSTGRES_HOST=127.0.0.1
	POSTGRES_DB=  /* PostgreSQL DB name*/
	POSTGRES_USER= /* PostgreSQL User name*/
	POSTGRES_PASSWORD= /* PostgreSQL User password*/
	BCRYPT_PASSWORD=secret_password
	SALT_ROUNDS=10
	TOKEN_SECRET=secret_token
	```
4. Run command [db-migrate up] in cmd.
5. To start the server run command [npm run start].

## Testing

 To run included tests:

1. Run command [npm run test].



