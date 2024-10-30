const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const User = require('../models/user-model');
const { handleGoogleLogin } = require('../controllers/auth');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user);
  });
});

const callbackURL =
  process.env.NODE_ENV === 'production'
    ? process.env.CALLBACK_URL_PROD
    : process.env.CALLBACK_URL_DEV;

passport.use(
  new GoogleStrategy(
    {
      //options for the google strategy
      callbackURL,
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const user = await handleGoogleLogin(profile);
        console.log('User authenticated:', user);
        done(null, user);
      } catch (error) {
        console.error('Error during Google authentication:', error);
        done(error, null);
      }
    }
  )
);
