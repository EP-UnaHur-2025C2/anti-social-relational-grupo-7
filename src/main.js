require('dotenv').config();
const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerOptions = require('../config/swagger');
const cors = require('cors');
const path = require('path');
const db = require('./db/models');

const app = express();
const PORT = process.env.PORT || 3000;


// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Conectar a la base de datos
db.sequelize.authenticate()
  .then(() => {
    console.log('Conexión a la base de datos exitosa');
    console.log('Base de datos:', db.sequelize.config.database);
  })
  .catch(err => {
    console.error('Error conectando a la base de datos:', err);
    process.exit(1);
  });

// Servir archivos estáticos (imágenes subidas)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
const swaggerDocs = swaggerJSDoc(swaggerOptions);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Rutas
try {
  const routes = require('./routes');
  app.use('/api', routes);
  console.log('Rutas cargadas correctamente');
} catch (error) {
  console.error('Error cargando rutas:', error);
  process.exit(1);
}

// Ruta de prueba
app.get('/', (req, res) => {
  res.json({ message: 'UnaHur - Anti-Social Net API' });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
  console.log("Documentación en http://localhost:3000/api-docs");
});
