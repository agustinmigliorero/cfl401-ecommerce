const Joi = require("joi");

usuarioSchema = Joi.object({
  nombre: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  publicaciones: Joi.array(),
  comentarios: Joi.array(),
});

categoriaSchema = Joi.object({
  nombre: Joi.string().required(),
  publicaciones: Joi.array(),
});

comentarioSchema = Joi.object({
  autor: Joi.string().required(),
  texto: Joi.string().required(),
  publicacion: Joi.string().required(),
  puntuacion: Joi.number().required(),
});

publicacionSchema = Joi.object({
  autor: Joi.string().required(),
  titulo: Joi.string().required(),
  texto: Joi.string().required(),
  categorias: Joi.array(),
  comentarios: Joi.array(),
});

module.exports = {
  usuarioSchema,
  categoriaSchema,
  comentarioSchema,
  publicacionSchema,
};
