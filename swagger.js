const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'All Things Running Store API',
    description:
      'This API retrieves and updates information related to products, customers, and orders for the All Things Running store'
  },
  // host: 'localhost:8080'
  host: 'https://cse341-project2-5caz.onrender.com/'
};

const outputFile = './swagger.json';
const endpointFile = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointFile, doc);
