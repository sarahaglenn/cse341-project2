const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
  items: {
    type: [String],
    required: true
  },
  customer_id: {
    type: String,
    required: true
  },
  total_price: {
    type: Number,
    required: true
  }
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
