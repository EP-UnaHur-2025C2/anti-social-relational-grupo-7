// swagger.js
const swaggerJSDoc = require('swagger-jsdoc');
const userSwagger = require('./usersSwagger'); 
const commentsSwagger = require('./commentsSwagger'); 
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API de Anti-Social",
      version: "1.0.0",
      description: "Documentación de la API con Swagger",
    },
    servers: [
      {
        url: "http://localhost:3000", 
      },
    ],
       paths: {
      ...userSwagger, 
      ...commentsSwagger,
    },
  },
  apis: ["./src/routes/*.js"], 
};

module.exports = options;