const mongodb = require('../database/connect');
const { ObjectId } = require('mongodb');

const getProducts = async (req, res) => {
  const result = await mongodb.getDatabase().db().collection('products').find();
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  });
};

const findProduct = async (req, res) => {
  const productId = new ObjectId(req.params.id);
  try {
    const result = await mongodb
      .getDatabase()
      .db()
      .collection('products')
      .findOne({ _id: productId });
    if (result) {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(result);
    } else {
      res.status(404).json({ error: 'No product exists with that id' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving product.', detail: error.message });
  }
};

const createProduct = async (req, res) => {
  const product = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    address: req.body.address,
    phone: req.body.phone
  };
  try {
    const response = await mongodb.getDatabase().db().collection('products').insertOne(product);
    if (response.acknowledged) {
      res.setHeader('Content-Type', 'application/json');
      res
        .status(201)
        .json({ message: 'Product successfully added.', productId: response.insertedId });
    } else {
      res.status(500).json({ error: 'Product could not be added.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error adding product.', details: error.message });
  }
};

const updateProduct = async (req, res) => {
  const productId = new ObjectId(req.params.id);

  let updates = {};
  if (req.body.category) updates.category = req.body.category;
  if (req.body.name) updates.name = req.body.name;
  if (req.body.description) updates.description = req.body.description;
  if (req.body.brand) updates.brand = req.body.brand;
  if (req.body.price) updates.price = req.body.price;
  if (req.body.size) updates.size = req.body.size;
  if (req.body.discount) updates.discount = req.body.discount;

  try {
    const response = await mongodb
      .getDatabase()
      .db()
      .collection('products')
      .updateOne({ _id: productId }, { $set: updates });
    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Product not found or nothing was updated.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error updating product.', details: error.message });
  }
};

const deleteProduct = async (req, res) => {
  const productId = new ObjectId(req.params.id);
  try {
    const response = await mongodb
      .getDatabase()
      .db()
      .collection('products')
      .deleteOne({ _id: productId });
    if (response.deletedCount > 0) {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json({ message: 'Product deleted', productId: productId });
    } else {
      res.status(404).json({ error: 'Product not found or could not be deleted.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error deleting product', details: error.message });
  }
};

module.exports = {
  getProducts,
  findProduct,
  createProduct,
  updateProduct,
  deleteProduct
};
