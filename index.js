const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('./database/connect');
const passport = require('passport');
require('./config/passport-setup');
const session = require('express-session');

const app = express();

const port = process.env.PORT || 8080;

const cors = require('cors');
const allowedOrigins = [
  'http://localhost:8080', // Local development
  'https://cse341-project2-5caz.onrender.com' 
];

// CORS configuration
const corsOptions = {
  origin: (origin, callback) => {

    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true); 
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], 
  allowedHeaders: ['Content-Type', 'Authorization'], 
  credentials: true
};

app.use(cors(corsOptions));

app.options('*', cors(corsOptions));

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

app
  .use(
    session({
      secret: process.env.COOKIE_KEY,
      resave: false,
      saveUninitialized: false,
      cookie: {
        // httpOnly: true,
        secure: false,
        sameSite: 'lax'
      }
    })
  )
  .use(passport.initialize())
  .use(passport.session());

app
  .use(
    '/api-docs',
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocument, {
      oauth2RedirectUrl:
        process.env.NODE_ENV === 'production'
          ? 'https://cse341-project2-5caz.onrender.com/api-docs/oauth2-redirect.html'
          : 'http://localhost:8080/api-docs/oauth2-redirect.html',
      requestInterceptor: (req) => {
        // Get token from localStorage
        const token = req.cookies['authToken'];
        if (token) {
          req.headers['Authorization'] = `Bearer ${token}`;
        }
        return req;
      },
      initOAuth: {
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        appName: 'Running Store API',
        scopes: ['profile'],
        usePkceWithAuthorizationCodeGrant: true
      }
    })
  )
  .use(bodyParser.json())
  .use('/', require('./routes'));

mongodb.initDatabase((err) => {
  if (err) {
    console.error(err);
  } else {
    app.listen(port);
    console.log(`Connected to database and listening at port ${port}`);
  }
});
