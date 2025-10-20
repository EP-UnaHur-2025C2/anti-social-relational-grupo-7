// swagger.js
const swaggerJSDoc = require('swagger-jsdoc');

const options = {
 definition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Anti-Social',
      version: '1.0.0',
      description: 'Documentación de la API con Swagger',
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
    tags: [
      {
        name: 'Usuarios',
        description: 'Operaciones relacionadas con los usuarios y sus seguidores.',
      },
      {
        name: 'Posts',
        description: 'Endpoints para crear, ver y gestionar posts.',
      },
      {
        name: 'Comentarios',
        description: 'Endpoints para la gestión de comentarios en los posts.',
      },
      {
        name: 'Tags',
        description: 'Operaciones para administrar los tags o etiquetas.',
      },
    ],
  },
  apis: ['./docs/*.yaml'], 
};

module.exports = options;