const Joi = require("joi");

const usuarioSchema = Joi.object({
  nombre: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  publicaciones: Joi.array(),
  comentarios: Joi.array(),
});

const publicacionSchema = Joi.object({
  autor: Joi.string().required(),
  titulo: Joi.string().required(),
  texto: Joi.string().required(),
  categorias: Joi.array(),
  comentarios: Joi.array(),
});

const comentarioSchema = Joi.object({
  autor: Joi.string().required(),
  texto: Joi.string().required(),
  publicacion: Joi.string().required(),
  puntuacion: Joi.number(),
});

const categoriaSchema = Joi.object({
  nombre: Joi.string().required(),
  publicaciones: Joi.array(),
});

module.exports = {
  usuarioSchema,
  publicacionSchema,
  comentarioSchema,
  categoriaSchema,
};
