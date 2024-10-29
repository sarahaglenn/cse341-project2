const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const User = require('../models/user-model');
const { handleGoogleLogin } = require("../controllers/auth");

passport.serializeUser((user, done) => {
    done(null, user.id)
})

passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => {
        done(null, user);
    })
});

passport.use(
    new GoogleStrategy(
        {
            //options for the google strategy
            callbackURL: '/auth/google/redirect',
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                const user = await handleGoogleLogin(profile);
                console.log('User authenticated:', user);
                done(null, user);
            } catch (error) {
                console.error("Error during Google authentication:", error);
                done(error, null);
            }
        }
    )
);
//       // check if user already exists in our database
//       User.findOne({ googleId: profile.id }).then((currentUser) => {
//         if (currentUser) {
//             // already have the user
//             console.log('user is:', currentUser);
//             done(null, currentUser);
//         } else {
//           //if not, create user in our database
//           new User({
//             username: profile.displayName,
//             googleId: profile.id
//           })
//             .save()
//             .then((newUser) => {
//                 console.log('new user created:' + newUser);
//                 done(null, newUser);
//             });
//         }
//       });
//     }
//   )
// );
