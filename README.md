# Money.io Backend

This project is live here [https://money-io.vercel.app](https://money-io.vercel.app/)

Money.io is a financing app that allows users to keep track of their spendings as well as debts and loans.



## Table of Contents

1. [Usage](#Usage)
3. [Development](#development)
   1. [Overview](#Overview)
   2. [Authentication](#Authentication)
   3. [Libraries](#Libraries)
4. [Team](#team)

## Usage

Users can signup using money.io or login with their google accounts for faster access
![Image of Money.Io signin page](./signinPage.png)

Once logged in, users can keep track of their spendings from the transactions page
![Image of Money.Io transactions page](./transactions.png)

Once logged in, users can keep track of debts due and lowned by adding them from the debts page
![Image of Money.Io debts page](./debts.png)


## Development

### Overview
Money.io backend is built using an Nodejs server built using Express js routes for CRUD operations to 
the MYSQL database. The routes are protected by an Passport js middleware and gets the user Redis session


### Authentication

Authentication is provided using 2 patterns:
1. Using local signup/signin
  1. User sends a signup POST request to /signup with username, email, password in authorization header
  2. The user info is stored in the MYSQL database with the password hashed and an active field as false
  3. An email is sent to the user using nodemailer with a jwt token link pointing to /verifyemail
  4. When the user clicks the link, it sends a get request to /verifyemail with the jsonwebtoken as a url parameter
  5. Once the token is verified, the user's active field is set to true
  6. The user can then signin by sending a POST request to /signin with the username and password in the header
  7. If the username, password hash match, and the active status is true, a new Passport/Redis session is created and username is returned with a status 200 indicating to the client to redirect the user into the transactions page
2.  Using google's signin flow [Google signin](https://developers.google.com/identity/sign-in/web/backend-auth)
  1. User logsin with their google details and provides consent
  2. Google returns a token for the user
  3. The token is sent to the backend using the authorization header to the /verifygoogle endpoint
  4. Upon token verification redis session is started using passport.js and username is returned with a status 200 indicating to the client to redirect the user into the transactions page



### Libraries

Money.IO is built using the following libraries to provide a safe, easy to use
and easy to maintain user and development experience.
Backend:
1. [Node.js](https://nodejs.org/en/) which provides javascript runtime bult using V8 to run javascript
2. [Express.js](https://expressjs.com/) which provides a web application framework to help build a server
3. [MYSQL](https://www.mysql.com/) which provides a database to store user's information, transactions, and debts
4. [Passport.js](http://www.passportjs.org/) which provides an authentication framework
5. [Redis.io](https://redis.io/) which provides a datastore to hold user session data
6. [passport-local](https://github.com/jaredhanson/passport-local) which provides a local passport strategy to
start a server-side session on successful authentication
7. [passport-google-strategy](https://github.com/humaidk2/passport-google-strategy#readme) which provides a google strategy
to start a server-side session on successful token verification
8. [Heroku](https://www.heroku.com/) which allows easy deployment through git

Frontend:
1. [Next.js](https://nextjs.org/) which provides faster loads time using server side rendering
2. [React.js](https://reactjs.org/) which provides a safer, scalable viewing experience
, as well as much shorter code using the new React hooks api
3. [Redux.js](https://redux.js.org/) which stores state in a much more manageable layout
4. [react-google-login](https://github.com/anthonyjgrove/react-google-login) which provides an easy to use login
button based on google's signin recommended practice
4. [Vercel](https://vercel.com/) which provides a free and easy way to host nextjs apps
5. [avataaars](https://github.com/fangpenlin/avataaars) which allows for an easy way to generate avataaars


## Team

Project was rewritten by Humaid Khan

[Original Project](https://github.com/humaidk2/Money-io)

original Team:
- **Product Owner**: Jonathan Wu
- **Scrum Master**: Humaid Khan
- **Development Team Members**: Dunstan Zheng, Chris Lu
