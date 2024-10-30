const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  googleId: {
    type: String,
    unique: true
  },
  firstName: {
    type: String,
    default: null
  },
  lastName: {
    type: String,
    default: null
  },
  email: {
    type: String,
    default: null
  },
  address: {
    type: String,
    default: null
  },
  phone: {
    type: String,
    default: null
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
