const Joi = require('joi');

// Schema para crear usuario
const createUserSchema = Joi.object({
  nickName: Joi.string().min(1).max(50).required()
});

// Schema para actualizar usuario
const updateUserSchema = Joi.object({
  nickName: Joi.string().min(1).max(50).required()
});

// Schema para crear post
const createPostSchema = Joi.object({
  description: Joi.string().min(1).max(500).required(),
  userId: Joi.number().integer().positive().required()
});

// Schema para actualizar post
const updatePostSchema = Joi.object({
  description: Joi.string().min(1).max(500).required()
});

// Schema para crear comment
const createCommentSchema = Joi.object({
  content: Joi.string().min(1).max(200).required(),
  postId: Joi.number().integer().positive().required(),
  userId: Joi.number().integer().positive().required()
});

// Schema para actualizar comment
const updateCommentSchema = Joi.object({
  content: Joi.string().min(1).max(200),
  visible: Joi.boolean()
});

// Schema para crear tag
const createTagSchema = Joi.object({
  name: Joi.string().min(1).max(30).required()
});

// Schema para actualizar tag
const updateTagSchema = Joi.object({
  name: Joi.string().min(1).max(30).required()
});

// Middleware de validación
const validate = (schema) => {
  return (req, res, next) => {
    console.log('Validando request body:', req.body);
    console.log('Schema utilizado:', schema.describe());
    
    const { error } = schema.validate(req.body);
    if (error) {
      console.log('Error de validación:', error.details);
      return res.status(400).json({ 
        error: "Validation error",
        details: error.details[0].message,
        field: error.details[0].path.join('.')
      });
    }
    next();
  };
};

module.exports = {
  validate,
  createUserSchema,
  updateUserSchema,
  createPostSchema,
  updatePostSchema,
  createCommentSchema,
  updateCommentSchema,
  createTagSchema,
  updateTagSchema
};