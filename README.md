# Phonebook Application API

An API challenge by <h><a><j>

## Prerequisites

* [Node.JS (10.12 or higher)](https://nodejs.org/en/)
* [MySQL (5.7 or higher)](https://www.mysql.com/downloads/)

### Installing
* Run: ```git clone https://github.com/SirPhemmiey/hack-a-j.git```
* Navigate to the project directory ```cd hack-a-j```
* Run: ```npm install``` or ```yarn``` to install dependencies
* Create a .env file in your root directory and copy content from ```.env.sample``` file to ```.env``` file and set environment variables with the appropriate values
* Check ```/src/database/database.sql``` for the sql scripts to create the tables needed
* Populate the database with a test account which can be found in the ```/src/database/database.sql``` file

### Running
* Run: ```npm start``` or ```yarn start```

## Endpoints

### Authentication:

`POST /api/v1/loginUser`

Example Request body:
```
{
	"username": "username",
	"password": "password"
}
```
No authentication required, authenticates a user then returns a token.

Required fields: `username`, `password`

## Registration:

`POST /api/v1/createUser`

Example Request body:
```
{
	"username": "newuser",
	"password": "newpassword"
}
```
No authentication required, returns a success message

Required fields: `username`, `password`

## Create a record:

`POST /api/v1/createRecord`

Example Request body:
```
{
	"firstname": "firstname",
	"lastname": "lastname",
	"email": "email@gmail.com",
	"phone": "07023456091",
	"mobile": "08072212439",
	"company": "Google",
	"title": "Software Engineer"
}
```

Authentication required, returns a success message

Required fields: `firstname`, `lastname`, `email`, `phone`

## Get a single record:

`GET /api/v1/getRecord/<recordId>`

Authentication required, returns a success message and a phonebook record object

## Get all records:

`GET /api/v1/getAllRecords`

Query parameters:

Filter by page and limit(default page=1 and limit=10):

`?page=1&limit=5`

Search by firstname:

`?firstname=Arc`

Authentication required, returns a success message and a phonebook record object

## Update a record: 

`PUT /api/v1/updateRecord/<recordId>`

Example Request body:
```
{
	"firstname": "firstname",
	"lastname": "lastname",
	"email": "email@gmail.com",
	"phone": "07023456091",
	"mobile": "08072212439",
	"company": "Google",
	"title": "Software Engineer"
}
```
Authentication required, returns a success message

Accepted fields: `firstname`, `lastname`, `email`, `phone`, `mobile`, `company`, `mobile`, `company`, `title`

## Delete a record

`DELETE /api/v1/deleteRecord/<recordId>`

Authentication required, deletes a record from the database

### Running Test

* Run the command `yarn test` OR `npm test` to run the test



