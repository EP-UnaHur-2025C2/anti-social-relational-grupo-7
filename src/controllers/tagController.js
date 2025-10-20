const { Tag } = require('../db/models');

// Obtener todos los tags
const getAllTags = async (req, res) => {
  try {
    const tags = await Tag.findAll();
    res.json(tags);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener un tag por ID
const getTagById = async (req, res) => {
  try {
    const tag = await Tag.findByPk(req.params.id);
    if (!tag) return res.status(404).json({ error: 'Tag no encontrado' });
    res.json(tag);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Crear un nuevo tag
const createTag = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) return res.status(400).json({ error: 'name es requerido' });

    const tag = await Tag.create({ name });
    res.status(201).json(tag);
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      res.status(400).json({ error: 'El tag ya existe' });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
};

// Actualizar un tag
const updateTag = async (req, res) => {
  try {
    const { name } = req.body;
    const tag = await Tag.findByPk(req.params.id);
    if (!tag) return res.status(404).json({ error: 'Tag no encontrado' });

    await tag.update({ name });
    res.json(tag);
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      res.status(400).json({ error: 'El tag ya existe' });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
};

// Eliminar un tag
const deleteTag = async (req, res) => {
  try {
    const tag = await Tag.findByPk(req.params.id);
    if (!tag) return res.status(404).json({ error: 'Tag no encontrado' });

    await tag.destroy();
    res.json({ message: 'Tag eliminado' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllTags,
  getTagById,
  createTag,
  updateTag,
  deleteTag
};