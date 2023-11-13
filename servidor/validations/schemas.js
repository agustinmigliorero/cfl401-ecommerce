const Joi = require("joi");

const usuarioSchema = Joi.object({
  nombre: Joi.string().required(),
  email: Joi.string().email().required(),
  apellido: Joi.string().required(),
  publicaciones: Joi.array(),
  comentarios: Joi.array(),
  password: Joi.string().required(),
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
  descripcion: Joi.string().required(),
  publicaciones: Joi.array(),
});

module.exports = {
  usuarioSchema,
  publicacionSchema,
  comentarioSchema,
  categoriaSchema,
};
