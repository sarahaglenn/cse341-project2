const mongodb = require('../database/connect');
const { ObjectId } = require('mongodb');

const getUsers = async (req, res) => {
  const result = await mongodb.getDatabase().db().collection('users').find();
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  });
};

const findUser = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  try {
    const result = await mongodb.getDatabase().db().collection('users').findOne({ _id: userId });
    if (result) {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(result);
    } else {
      res.status(404).json({ error: 'No user exists with that id' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving user.', detail: error.message });
  }
};

const createUser = async (req, res) => {
  const user = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    address: req.body.address,
    phone: req.body.phone
  };
  try {
    const response = await mongodb.getDatabase().db().collection('users').insertOne(user);
    if (response.acknowledged) {
      res.setHeader('Content-Type', 'application/json');
      res.status(201).json({ message: 'User successfully added.', userId: response.insertedId });
    } else {
      res.status(500).json({ error: 'User could not be added.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error adding user.', details: error.message });
  }
};

const updateUser = async (req, res) => {
  const userId = new ObjectId(req.params.id);

  let updates = {};
  if (req.body.firstName) updates.firstName = req.body.firstName;
  if (req.body.lastName) updates.lastName = req.body.lastName;
  if (req.body.email) updates.email = req.body.email;
  if (req.body.address) updates.address = req.body.address;
  if (req.body.phone) updates.phone = req.body.phone;

  try {
    const response = await mongodb
      .getDatabase()
      .db()
      .collection('users')
      .updateOne({ _id: userId }, { $set: updates });
    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'User not found or nothing was updated.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error updating user.', details: error.message });
  }
};

const deleteUser = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  try {
    const response = await mongodb
      .getDatabase()
      .db()
      .collection('users')
      .deleteOne({ _id: userId });
    if (response.deletedCount > 0) {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json({ message: 'User deleted', userId: userId });
    } else {
      res.status(404).json({ error: 'User not found or could not be deleted.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error deleting user', details: error.message });
  }
};

module.exports = {
  getUsers,
  findUser,
  createUser,
  updateUser,
  deleteUser
};
