const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/user-model');
const { handleGoogleLogin } = require('../controllers/auth');

passport.serializeUser((user, done) => {
  done(null, { id: user.id, accessToken: user.accessToken });
});

passport.deserializeUser(async (obj, done) => {
  try {
    const user = await User.findById(obj.id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});
// (id, done) => {
//   User.findById(id).then((user) => {
//     done(null, user);
//   }).catch((error) => done(error, null));
// });

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
      // console.log('access token', accessToken);
      // console.log('refresh token', refreshToken);
      try {
        let user = await handleGoogleLogin(profile);
        // console.log('User authenticated:', user);
        user.accessToken = accessToken;
        done(null, user);
      } catch (error) {
        console.error('Error during Google authentication:', error);
        done(error, false);
      }
    }
  )
);
