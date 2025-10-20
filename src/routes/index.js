const express = require('express');
const router = express.Router();

const userRoutes = require('./userRoutes');
const postRoutes = require('./postRoutes');
const commentRoutes = require('./commentRoutes');
const tagRoutes = require('./tagRoutes');


router.use('/users', userRoutes); // CRUD de usuarios
router.use('/posts', postRoutes); // CRUD de posts + gestión de imágenes y tags
router.use('/comments', commentRoutes); // CRUD de comentarios con visibilidad por meses
router.use('/tags', tagRoutes); // CRUD de tags

module.exports = router;