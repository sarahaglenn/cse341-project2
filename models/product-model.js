const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    category: {
        type: String,
        default: null
    },
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: null
  },
  brand: {
    type: String,
    default: null
  },
  sizes: {
    type: [String],
    default: null
  },
  price: {
    type: Number,
    required: true
  },
  discount: {
    type: Number,
    default: null
    },
    colors: {
        type: [String],
        default: null
    }
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
