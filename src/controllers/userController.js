const { User } = require('../db/models');

// Obtener todos los usuarios
const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener un usuario por ID
const getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Crear un nuevo usuario
const createUser = async (req, res) => {
  try {
    const { nickName } = req.body;
    if (!nickName) return res.status(400).json({ error: 'nickName es requerido' });

    const user = await User.create({ nickName });
    res.status(201).json(user);
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      res.status(400).json({ error: 'El nickName ya existe' });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
};

// Actualizar un usuario
const updateUser = async (req, res) => {
  try {
    const { nickName } = req.body;
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });

    await user.update({ nickName });
    res.json(user);
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      res.status(400).json({ error: 'El nickName ya existe' });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
};

// Eliminar un usuario
const deleteUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });

    await user.destroy();
    res.json({ message: 'Usuario eliminado' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Seguir a un usuario
const followUser = async (req, res) => {
  try {
    const { id: followerId } = req.params; // Usuario que sigue
    const { followedId } = req.body; // Usuario seguido

    if (followerId == followedId) return res.status(400).json({ error: 'No puedes seguirte a ti mismo' });

    const follower = await User.findByPk(followerId);
    const followed = await User.findByPk(followedId);
    if (!follower) return res.status(404).json({ error: 'Usuario seguidor no encontrado' });
    if (!followed) return res.status(404).json({ error: 'Usuario seguido no encontrado' });

    await follower.addFollowing(followed);
    res.json({ message: 'Usuario seguido' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Dejar de seguir a un usuario
const unfollowUser = async (req, res) => {
  try {
    const { id: followerId, followedId } = req.params;

    const follower = await User.findByPk(followerId);
    const followed = await User.findByPk(followedId);
    if (!follower) return res.status(404).json({ error: 'Usuario seguidor no encontrado' });
    if (!followed) return res.status(404).json({ error: 'Usuario seguido no encontrado' });

    await follower.removeFollowing(followed);
    res.json({ message: 'Usuario dejado de seguir' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  followUser,
  unfollowUser
};