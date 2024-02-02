const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'BackEnd Test Eigen Tri Mathema',
      version: '1.0.0',
      description: 'API for managing a library',
    },
    servers: [
      { url: 'http://localhost:3000' },
    ],
  },
  apis: ['./routes/routes.js'],
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);

module.exports = {
  swaggerUi,
  swaggerDocs,
};