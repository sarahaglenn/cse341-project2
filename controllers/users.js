const User = require('../models/user-model');
const { ObjectId } = require('mongodb');

const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving users', detail: error.message });
  }
};

const findUser = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ error: 'Must use a valid user id to find a user.' });
  }
  const userId = req.params.id;
  try {
    const user = await User.findById(userId);
    if (user) {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(user);
    } else {
      res.status(404).json({ error: 'No user exists with that id' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving user.', detail: error.message });
  }
};

const createUser = async (req, res) => {
  const { firstName, lastName, email, address, phone, googleId } = req.body;
  const user = new User({
    firstName,
    lastName,
    email,
    address,
    phone,
    ...(googleId && { googleId }) // only include googleId if it is provided
  });

  try {
    const savedUser = await user.save();
    if (savedUser) {
      res.setHeader('Content-Type', 'application/json');
      res.status(201).json({ message: 'User successfully added.', userId: savedUser._id });
    } else {
      res.status(500).json({ error: 'User could not be added.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error adding user.', details: error.message });
  }
};

const updateUser = async (req, res) => {
  console.log('Request body:', req.body);
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ error: 'Must use a valid user id to find a user.' });
  }
  const userId = req.params.id;

  let updates = {};
  if (req.body.firstName) updates.firstName = req.body.firstName;
  if (req.body.lastName) updates.lastName = req.body.lastName;
  if (req.body.email) updates.email = req.body.email;
  if (req.body.address) updates.address = req.body.address;
  if (req.body.phone) updates.phone = req.body.phone;

  if (Object.keys(updates).length === 0) {
    return res.status(400).json({ error: 'No fields to update.' });
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(userId, updates, { new: true });
    if (updatedUser) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'User not found or nothing was updated.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error updating user.', details: error.message });
  }
};

const deleteUser = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ error: 'Must use a valid user id to find a user.' });
  }
  const userId = req.params.id;
  try {
    const deletedUser = await User.findByIdAndDelete(userId);
    if (deletedUser) {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json({ message: 'User deleted', userId });
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
