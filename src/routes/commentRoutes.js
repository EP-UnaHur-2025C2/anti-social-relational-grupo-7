const express = require('express');
const router = express.Router();

const commentController = require('../controllers/commentController');
const { validate, createCommentSchema, updateCommentSchema } = require('../middlewares/validationMiddleware');

// Definir rutas CRUD
router.get('/', commentController.getAllComments);
router.get('/:id', commentController.getCommentById);
router.post('/', validate(createCommentSchema), commentController.createComment);
router.put('/:id', validate(updateCommentSchema), commentController.updateComment);
router.delete('/:id', commentController.deleteComment);

module.exports = router;