const mongodb = require('../database/connect');
const { ObjectId } = require('mongodb');

const getOrders = async (req, res) => {
  const result = await mongodb.getDatabase().db().collection('orders').find();
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  });
};

const findOrder = async (req, res) => {
  const orderId = new ObjectId(req.params.id);
  try {
    const result = await mongodb.getDatabase().db().collection('orders').findOne({ _id: orderId });
    if (result) {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(result);
    } else {
      res.status(404).json({ error: 'No order exists with that id' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving order.', detail: error.message });
  }
};

const createOrder = async (req, res) => {
  const order = {
    items: req.body.items,
    customer_id: req.body.customer_id,
    total_price: req.body.total_price
  };
  
  try {
    const response = await mongodb.getDatabase().db().collection('orders').insertOne(order);
    if (response.acknowledged) {
      res.setHeader('Content-Type', 'application/json');
      res.status(201).json({ message: 'Order successfully added.', orderId: response.insertedId });
    } else {
      res.status(500).json({ error: 'Order could not be added.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error adding order.', details: error.message });
  }
};

const updateOrder = async (req, res) => {
  const orderId = new ObjectId(req.params.id);

  let updates = {};
  if (req.body.items) updates.items = req.body.items;
  if (req.body.customer) updates.customer = req.body.customer;
  if (req.body.total) updates.total = req.body.total;

  try {
    const response = await mongodb
      .getDatabase()
      .db()
      .collection('orders')
      .updateOne({ _id: orderId }, { $set: updates });
    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Order not found or nothing was updated.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error updating order.', details: error.message });
  }
};

const deleteOrder = async (req, res) => {
  const orderId = new ObjectId(req.params.id);
  try {
    const response = await mongodb
      .getDatabase()
      .db()
      .collection('orders')
      .deleteOne({ _id: orderId });
    if (response.deletedCount > 0) {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json({ message: 'Order deleted', orderId: orderId });
    } else {
      res.status(404).json({ error: 'Order not found or could not be deleted.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error deleting order', details: error.message });
  }
};

module.exports = {
  getOrders,
  findOrder,
  createOrder,
  updateOrder,
  deleteOrder
};
