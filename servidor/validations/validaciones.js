const {
  usuarioSchema,
  publicacionSchema,
  comentarioSchema,
  categoriaSchema,
} = require("../validations/schemas");

const validarUsuario = (req, res, next) => {
  const { error } = usuarioSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};

const validarPublicacion = (req, res, next) => {
  const { error } = publicacionSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};

const validarComentario = (req, res, next) => {
  const { error } = comentarioSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};

const validarCategoria = (req, res, next) => {
  const { error } = categoriaSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};

module.exports = {
  validarUsuario,
  validarPublicacion,
  validarComentario,
  validarCategoria,
};
