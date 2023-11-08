const Publicacion = require("./models/publicacion");
const Comentario = require("./models/comentario");
const Usuario = require("./models/usuario");

const estaLogeado = (req, res, next) => {
  if (!req.isAuthenticated()) {
    res.json("No estas logeado!");
  } else {
    next();
  }
};

const esAutorPublicacion = (req, res, next) => {
  const { id } = req.params;
  const publicacion = Publicacion.findById(id);
  if (publicacion.autor == req.user._id || req.user.esAdmin) {
    next();
  } else {
    res.status("403").json("No tienes permisos para hacer eso!");
  }
};

const esAutorComentario = (req, res, next) => {
  const { id } = req.params;
  const comentario = Comentario.findById(id);
  if (comentario.autor == req.user._id || req.user.esAdmin) {
    next();
  } else {
    res.status("403").json("No tienes permisos para hacer eso!");
  }
};

const esUsuario = (req, res, next) => {
  const { id } = req.params;
  const usuario = Usuario.findById(id);
  if (usuario._id == req.user._id || req.user.esAdmin) {
    next();
  } else {
    res.status("403").json("No tienes permisos para hacer eso!");
  }
};

const esAdmin = (req, res, next) => {
  if (req.user.esAdmin) {
    next();
  } else {
    res.status("403").json("No tienes permisos para hacer eso!");
  }
};

module.exports = {
  estaLogeado,
  esAutorPublicacion,
  esAutorComentario,
  esUsuario,
  esAdmin,
};
