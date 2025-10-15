const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');
const { validate, createUserSchema, updateUserSchema } = require('../middlewares/validationMiddleware');

// Definir rutas CRUD
router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUserById);
router.post('/', validate(createUserSchema), userController.createUser);
router.put('/:id', validate(updateUserSchema), userController.updateUser);
router.delete('/:id', userController.deleteUser);

// Rutas adicionales (followers)
router.post('/:id/follow', userController.followUser);
router.delete('/:id/unfollow/:followedId', userController.unfollowUser);

module.exports = router;