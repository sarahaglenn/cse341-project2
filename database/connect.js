const dotenv = require('dotenv');
const mongoose = require('mongoose');
dotenv.config();
// const MongoClient = require('mongodb').MongoClient;

// let _db;

const initDatabase = (callback) => {
  mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
    .then(() => {
      console.log('Connected to MongoDB');
      callback(null);
    })
    .catch((err) => {
      console.error('MongoDB connection error:', err);
      callback(err);
    });
};


//   if (_db) {
//     console.log('Database has already been initialized.');
//     return callback(null, _db);
//   }
//   mongoose
//     .connect(process.env.MONGODB_URI)
//     .then(() => {
//       _db = mongoose.connection;
//       callback(null, _db);
//     })
//     .catch((err) => {
//       callback(err);
//     });
// };

const getDatabase = () => {
  return mongoose.connection;
  // if (!_db) {
  //   throw Error('Database not initialized.');
  // }
  // return _db;
};
module.exports = {
  initDatabase,
  getDatabase
};
