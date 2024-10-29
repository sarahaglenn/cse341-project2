const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const User = require('../models/user-model');

passport.use(
  new GoogleStrategy(
    {
      //options for the google strategy
      callbackURL: '/auth/google/redirect',
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    },
    (accessToken, refreshToken, profile, done) => {
      // check if user already exists in our database
      User.findOne({ googleId: profile.id }).then((currentUser) => {
        if (currentUser) {
            // already have the user
            console.log('user is:', currentUser);
        } else {
          //if not, create user in our database
          new User({
            username: profile.displayName,
            googleId: profile.id
          })
            .save()
            .then((newUser) => {
              console.log('new user created:' + newUser);
            });
        }
      });
    }
  )
);
