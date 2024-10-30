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
router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
  // res.send(req.user);
  res.redirect('/users');
});

module.exports = router;
