# Installation
Clone the repo and run `npm install`

# To use the API
Run `mongod`\
Run `npm start`

These are all the routes that you can use, described in this format :

**METHOD** `route` -> description 
```
request params
```

## User
**POST** `/api/auth/register`-> Add a user to the database
```
first_name
last_name
email
password
```
**POST** `/api/auth/login` -> Connect and get a token
```
email
password
```

## Messages
*To use these routes, you need to be connected, meaning sending the token in the request body*

**POST** `/api/message` -> Post a message
```
content
token
```
**DELETE** `/api/message/:id` -> Delete the message of id :id
```
token
```
**GET** `/api/message/:id` -> Get the message of id :id
```
token
```
**GET** `/api/message` -> Get all the messages
```
token
```


