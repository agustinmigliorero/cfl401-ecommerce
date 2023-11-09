const Comentario = require("./models/comentario");
const Publicacion = require("./models/publicacion");
const Usuario = require("./models/usuario");

const estaLogeado = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(403).json({ msg: "No estas logeado" });
  }
};

const esAutorPublicacion = async (req, res, next) => {
  const { id } = req.params;
  const publicacion = await Publicacion.findById(id);
  if (publicacion.autor === req.user._id || req.user.esAdmin) {
    next();
  } else {
    res.status(403).json({ msg: "No tienes permisos para hacer eso" });
  }
};

const esAutorComentario = async (req, res, next) => {
  const { id } = req.params;
  const comentario = await Comentario.findById(id);
  if (comentario.autor === req.user._id || req.user.esAdmin) {
    next();
  } else {
    res.status(403).json({ msg: "No tienes permisos para hacer eso" });
  }
};

const esAdmin = (req, res, next) => {
  if (req.user.esAdmin) {
    next();
  } else {
    res.status(403).json({ msg: "No tienes permisos para hacer eso" });
  }
};

const esUsuario = async (req, res, next) => {
  const { id } = req.params;
  const usuario = await Usuario.findById(id);
  if (usuario._id === req.user._id || req.user.esAdmin) {
    next();
  } else {
    res.status(403).json({ msg: "No tienes permisos para hacer eso" });
  }
};

module.exports = {
  estaLogeado,
  esAutorPublicacion,
  esAutorComentario,
  esAdmin,
  esUsuario,
};
