const { Comment, Post, User } = require('../db/models');
const { Op } = require('sequelize');

// Calcular fecha límite para visibilidad de comentarios (X meses atrás)
const getVisibilityDate = () => {
  const months = parseInt(process.env.COMMENT_VISIBILITY_MONTHS) || 6;
  const date = new Date();
  date.setMonth(date.getMonth() - months);
  return date;
};

// Obtener todos los comentarios visibles
const getAllComments = async (req, res) => {
  try {
    const visibilityDate = getVisibilityDate();
    const comments = await Comment.findAll({
      where: {
        visible: true,
        createdAt: { [Op.gte]: visibilityDate }
      },
      include: [
        { model: Post, attributes: ['description'] },
        { model: User, attributes: ['nickName'] }
      ]
    });
    res.json(comments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener un comentario por ID (solo si visible y dentro del período)
const getCommentById = async (req, res) => {
  try {
    const visibilityDate = getVisibilityDate();
    const comment = await Comment.findOne({
      where: {
        id: req.params.id,
        visible: true,
        createdAt: { [Op.gte]: visibilityDate }
      },
      include: [
        { model: Post, attributes: ['description'] },
        { model: User, attributes: ['nickName'] }
      ]
    });
    if (!comment) return res.status(404).json({ error: 'Comentario no encontrado o no visible' });
    res.json(comment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Crear un nuevo comentario
const createComment = async (req, res) => {
  try {
    const { content, postId, userId } = req.body;
    if (!content) return res.status(400).json({ error: 'content es requerido' });
    if (!postId) return res.status(400).json({ error: 'postId es requerido' });
    if (!userId) return res.status(400).json({ error: 'userId es requerido' });

    // Verificar que el post y usuario existen
    const post = await Post.findByPk(postId);
    const user = await User.findByPk(userId);
    if (!post) return res.status(404).json({ error: 'Post no encontrado' });
    if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });

    const comment = await Comment.create({ content, postId, userId });
    res.status(201).json(comment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Actualizar un comentario
const updateComment = async (req, res) => {
  try {
    const { content, visible } = req.body;
    const comment = await Comment.findByPk(req.params.id);
    if (!comment) return res.status(404).json({ error: 'Comentario no encontrado' });

    await comment.update({ content, visible });
    res.json(comment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Eliminar un comentario (soft delete cambiando visible a false)
const deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findByPk(req.params.id);
    if (!comment) return res.status(404).json({ error: 'Comentario no encontrado' });

    await comment.update({ visible: false });
    res.json({ message: 'Comentario ocultado' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllComments,
  getCommentById,
  createComment,
  updateComment,
  deleteComment
};