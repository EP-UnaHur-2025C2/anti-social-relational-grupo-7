const express = require('express');
const router = express.Router();

const tagController = require('../controllers/tagController');
const { validate, createTagSchema, updateTagSchema } = require('../middlewares/validationMiddleware');

// Definir rutas CRUD
router.get('/', tagController.getAllTags);
router.get('/:id', tagController.getTagById);
router.post('/', validate(createTagSchema), tagController.createTag);
router.put('/:id', validate(updateTagSchema), tagController.updateTag);
router.delete('/:id', tagController.deleteTag);


module.exports = router;