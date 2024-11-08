const router = require('express').Router();
const passport = require('passport');


// auth login
// maybe create a login endpoint?

// auth logout
router.get('/logout', (req, res, next) => {
  // handle with passport
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.clearCookie('authToken');
    res.redirect('/');
  });
});

// auth with google
router.get(
  '/google',
  passport.authenticate('google', {
    scope: ['profile']
  })
);

// callback route for google to redirect to
router.get('/google/redirect', passport.authenticate('google', {failureRedirect: '/',
}), (req, res) => {
  const accessToken = req.user.accessToken;
  console.log("access Token that comes from user", accessToken);
  res.cookie('authToken', accessToken, {
    maxAge: 3600000,
  });
  res.redirect('/');
});

module.exports = router;