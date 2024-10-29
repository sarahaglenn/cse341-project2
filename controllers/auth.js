const User = require('../models/user-model'); // Adjust the path as necessary

const handleGoogleLogin = async (profile) => {
  const { sub: googleId, given_name: firstName, family_name: lastName, email } = profile;

  try {
    let user = await User.findOne({ googleId });

    if (!user) {
      // Create new user
      user = new User({
        googleId,
        firstName,
        lastName,
        email
      });
      await user.save();
    } else {
      // Update existing user
      user.firstName = firstName;
      user.lastName = lastName;
      user.email = email;
      await user.save();
    }

    return user; // Return the user object as needed
  } catch (error) {
    console.error("Error handling Google login:", error);
    throw error; // Handle the error appropriately
  }
};


const authCheck = (req, res, next) => {
  if (!req.user) {
    // if user is not logged in
      return res.status(401).json({ error: 'Unauthorized access. Please log in.' });
  } else {
    // if the user is logged in
    next();
  }
};

module.exports = {
    handleGoogleLogin,
    authCheck
};
