const Product = require('../models/product-model')
const { ObjectId } = require('mongodb');

const getProducts = async (req, res) => {
  try {
    const result = await Product.find();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving products', detail: error.message });
  }
};

const findProduct = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ error: 'Must use a valid product id to find a product.' });
  }
  const productId = req.params.id;
  try {
    const product = await Product.findById(productId);
    if (product) {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(product);
    } else {
      res.status(404).json({ error: 'No product exists with that id' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving product.', detail: error.message });
  }
};

const createProduct = async (req, res) => {
  const { category, name, description, brand, sizes, price, discount, colors } = req.body;
  const product = new Product({
    category,
    name,
    description,
    brand,
    sizes,
    price,
    discount,
    colors
  });
  try {
    const savedProduct = await product.save();
    if (savedProduct) {
      res.setHeader('Content-Type', 'application/json');
      res
        .status(201)
        .json({ message: 'Product successfully added.', productId: savedProduct._id });
    } else {
      res.status(500).json({ error: 'Product could not be added.' });
    }
    } catch (error) {
    res.status(500).json({ error: 'Error adding product.', details: error.message });
  }
};

const updateProduct = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ error: 'Must use a valid product id to update a product.' });
  }
  const productId = req.params.id;

  let updates = {};
  if (req.body.category) updates.category = req.body.category;
  if (req.body.name) updates.name = req.body.name;
  if (req.body.description) updates.description = req.body.description;
  if (req.body.brand) updates.brand = req.body.brand;
  if (req.body.price) updates.price = req.body.price;
  if (req.body.size) updates.size = req.body.size;
  if (req.body.discount) updates.discount = req.body.discount;

  if (Object.keys(updates).length === 0) {
    return res.status(400).json({ error: 'No fields to update.' });
  }

  try {
    const updatedProduct = await Product.findByIdAndUpdate(productId, updates, { new: true });
    if (updatedProduct) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Product not found or nothing was updated.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error updating product.', details: error.message });
  }
};

const deleteProduct = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ error: 'Must use a valid product id to delete a product.' });
  }
  const productId = req.params.id;
  try {
    const deletedProduct = await Product.findByIdAndDelete(productId);
    if (deletedProduct) {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json({ message: 'Product deleted', productId });
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
