const validator = require('../helpers/validate');
const { ObjectId } = require('mongodb');

const saveUser = async (req, res, next) => {
  const validationRule = {
    firstName: 'required|string',
    lastName: 'required|string',
    email: 'required|email',
    address: 'required|string',
    phone: 'string'
  };
  await validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      return res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    } else {
      next();
    }
  });
};

const updateUser = async (req, res, next) => {
  const validationRule = {
    firstName: 'string',
    lastName: 'string',
    email: 'email',
    address: 'string',
    phone: 'string'
  };
  await validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      return res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    } else {
      next();
    }
  });
};

const saveProduct = async (req, res, next) => {
  const validationRule = {
    category: 'required|string',
    name: 'required|string',
    description: 'required|string',
    brand: 'required|string',
    sizes: 'required|array',
    price: ['required', 'numeric', 'regex:/^\\d+(\\.\\d{1,2})?$/'],
    discount: ['numeric', 'regex:/^\\d+(\\.\\d{1,2})?$/'],
    colors: 'required|array'
  };
  await validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      return res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    } else {
      next();
    }
  });
};

const updateProduct = async (req, res, next) => {
  const validationRule = {
    category: 'string',
    name: 'string',
    description: 'string',
    brand: 'string',
    sizes: 'array',
    price: ['numeric', 'regex:/^\\d+(\\.\\d{1,2})?$/'],
    discount: ['numeric', 'regex:/^\\d+(\\.\\d{1,2})?$/'],
    colors: 'array'
  };
  await validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      return res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    } else {
      next();
    }
  });
};

const saveOrder = async (req, res, next) => {
  const validationRule = {
    items: 'required|array',
    customer_id: 'required|string',
    total_price: ['required', 'numeric', 'regex:/^\\d+(\\.\\d{1,2})?$/']
  };
  await validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      return res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    }
    if (!ObjectId.isValid(req.body.customer_id)) {
      return res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: { customer_id: ['Invalid customer id format'] }
      });
    } else {
      next();
    }
  });
};

const updateOrder = async (req, res, next) => {
  const validationRule = {
    items: 'array',
    customer_id: 'string',
    total_price: ['numeric', 'regex:/^\\d+(\\.\\d{1,2})?$/']
  };
  await validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      return res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    }

    if (req.body.customer_id && !ObjectId.isValid(req.body.customer_id)) {
      return res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: { customer_id: ['Invalid customer id format'] }
      });
    } else {
      next();
    }
  });
};

module.exports = {
  saveUser,
  updateUser,
  saveProduct,
  updateProduct,
  saveOrder,
  updateOrder
};
