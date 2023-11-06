const {
  usuarioSchema,
  categoriaSchema,
  publicacionSchema,
  comentarioSchema,
} = require("./schemas.js");

const validacionUsuario = async (req, res, next) => {
  const { error } = usuarioSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};

const validacionPublicacion = async (req, res, next) => {
  const { error } = publicacionSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};

const validacionComentario = async (req, res, next) => {
  const { error } = comentarioSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};

const validacionCategoria = async (req, res, next) => {
  const { error } = categoriaSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};

module.exports = {
  validacionUsuario,
  validacionPublicacion,
  validacionComentario,
  validacionCategoria,
};
