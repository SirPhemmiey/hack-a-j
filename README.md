# Phonebook Application API

## Prerequisites

* [Node.JS (10.12 or higher)](https://nodejs.org/en/)
* [MySQL (5.7 or higher)](https://www.mysql.com/downloads/)

### Installing
* Run: ```git clone https://github.com/SirPhemmiey/hack-a-j.git```
* Navigate to the project directory ```cd hack-a-j```
* Run: ```npm install``` or ```yarn``` to install dependencies
* Create a .env file in your root directory and copy content from ```.env.sample``` file to ```.env``` file and set environment variables with the appropriate values
* Check ```/src/database/database.sql``` for the sql scripts to create the tables needed

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


