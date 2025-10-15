const express = require('express');
const router = express.Router();

const postController = require('../controllers/postController');
const { validate, createPostSchema, updatePostSchema } = require('../middlewares/validationMiddleware');

// Definir rutas CRUD
router.get('/', postController.getAllPosts);
router.get('/:id', postController.getPostById);
router.post('/', validate(createPostSchema), postController.createPost);
router.put('/:id', validate(updatePostSchema), postController.updatePost);
router.delete('/:id', postController.deletePost);

// Rutas para imágenes
router.post('/:id/images', postController.addImageToPost); // Para URLs externas
router.post('/:id/upload-image', postController.upload.single('image'), postController.uploadImage); // Para upload local
router.delete('/:id/images/:imageId', postController.removeImageFromPost);

// Rutas para tags
router.post('/:id/tags', postController.addTagToPost);
router.delete('/:id/tags/:tagId', postController.removeTagFromPost);

module.exports = router;