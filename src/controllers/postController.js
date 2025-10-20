const { Post, User, Post_Images, Tag } = require('../db/models');
const multer = require('multer');
const path = require('path');

// Configuración de multer para upload de imágenes
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../uploads/'));
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB límite
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Solo se permiten imágenes'), false);
    }
  }
});

// Obtener todos los posts sin relaciones por ahora
const getAllPosts = async (req, res) => {
  console.log('req.body:', req.body); // Agrega esto
  try {
    const posts = await Post.findAll();
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Obtener un post por ID sin relaciones por ahora
const getPostById = async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id);
    if (!post) return res.status(404).json({ error: 'Post no encontrado' });
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Crear un nuevo post
const createPost = async (req, res) => {
  try {
    const { description, userId } = req.body;
    if (!description) return res.status(400).json({ error: 'description es requerida' });
    if (!userId) return res.status(400).json({ error: 'userId es requerido' });

    // Verificar que el usuario existe
    const user = await User.findByPk(userId);
    if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });

    const post = await Post.create({ description, userId });
    // Devuelve solo el post básico sin relaciones para evitar errores
    res.status(201).json({
      id: post.id,
      description: post.description,
      userId: post.userId,
      createdAt: post.createdAt,
      updatedAt: post.updatedAt
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Actualizar un post
const updatePost = async (req, res) => {
  try {
    const { description } = req.body;
    const post = await Post.findByPk(req.params.id);
    if (!post) return res.status(404).json({ error: 'Post no encontrado' });

    await post.update({ description });
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Eliminar un post
const deletePost = async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id);
    if (!post) return res.status(404).json({ error: 'Post no encontrado' });

    await post.destroy();
    res.json({ message: 'Post eliminado' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Agregar imagen a un post
const addImageToPost = async (req, res) => {
  try {
    const { url } = req.body;
    const postId = req.params.id;
    if (!url) return res.status(400).json({ error: 'url es requerida' });

    const post = await Post.findByPk(postId);
    if (!post) return res.status(404).json({ error: 'Post no encontrado' });

    const image = await Post_Images.create({ url, postId });
    res.status(201).json(image);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Eliminar imagen de un post
const removeImageFromPost = async (req, res) => {
  try {
    const { imageId } = req.params;
    const image = await Post_Images.findByPk(imageId);
    if (!image) return res.status(404).json({ error: 'Imagen no encontrada' });

    await image.destroy();
    res.json({ message: 'Imagen eliminada' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Agregar tag a un post
const addTagToPost = async (req, res) => {
  try {
    const { tagId } = req.body;
    const postId = req.params.id;
    if (!tagId) return res.status(400).json({ error: 'tagId es requerido' });

    const post = await Post.findByPk(postId);
    const tag = await Tag.findByPk(tagId);
    if (!post) return res.status(404).json({ error: 'Post no encontrado' });
    if (!tag) return res.status(404).json({ error: 'Tag no encontrado' });

    await post.addTag(tag);
    res.json({ message: 'Tag agregado al post' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Eliminar tag de un post
const removeTagFromPost = async (req, res) => {
  try {
    const { tagId } = req.params;
    const postId = req.params.id;

    const post = await Post.findByPk(postId);
    const tag = await Tag.findByPk(tagId);
    if (!post) return res.status(404).json({ error: 'Post no encontrado' });
    if (!tag) return res.status(404).json({ error: 'Tag no encontrado' });

    await post.removeTag(tag);
    res.json({ message: 'Tag eliminado del post' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Upload de imagen y guardado en DB
const uploadImage = async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await Post.findByPk(postId);
    if (!post) return res.status(404).json({ error: 'Post no encontrado' });

    if (!req.file) return res.status(400).json({ error: 'No se subió ninguna imagen' });

    const url = `/uploads/${req.file.filename}`; // URL relativa para servir archivos
    const image = await Post_Images.create({ url, postId });
    res.status(201).json(image);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
  addImageToPost,
  removeImageFromPost,
  addTagToPost,
  removeTagFromPost,
  upload,
  uploadImage
};