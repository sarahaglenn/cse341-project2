const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('./database/connect');
const passport = require('passport');
require('./config/passport-setup');
const session = require('express-session');

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

swaggerUi.initOAuth({
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  authorizationUrl: process.env.GOOGLE_AUTH_URL,
  tokenUrl: process.env.GOOGLE_TOKEN_URL,
  scopes: ['https://www.googleapis.com/auth/userinfo.profile'],
  usePkceWithAuthorizationCodeGrant: true
});

const app = express();

const port = process.env.PORT || 8080;

app
  .use(
    session({
      secret: process.env.COOKIE_KEY,
      resave: false,
      saveUninitialized: false
    })
  )
  .use(passport.initialize())
  .use(passport.session());

app
  .use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
  .use(bodyParser.json())
  .use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
  })
  .use('/', require('./routes'));

mongodb.initDatabase((err) => {
  if (err) {
    console.error(err);
  } else {
    app.listen(port);
    console.log(`Connected to database and listening at port ${port}`);
  }
});
