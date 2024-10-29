const dotenv = require('dotenv');
dotenv.config();
const mongoose = require("mongoose");
// const MongoClient = require('mongodb').MongoClient;

let _db;

const initDatabase = (callback) => {
  if (_db) {
    console.log('Database has already been initialized.');
    return callback(null, _db);
  }
  mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
      _db = mongoose.connection;
      callback(null, _db);
    })
    .catch((err) => {
      callback(err);
    });
};

const getDatabase = () => {
  if (!_db) {
    throw Error('Database not initialized.');
  }
  return _db;
};
module.exports = {
  initDatabase,
  getDatabase
};
