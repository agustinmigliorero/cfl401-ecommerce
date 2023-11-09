const routerPublicaciones = require("express").Router();
const {
  verPublicaciones,
  verPublicacion,
  crearPublicacion,
  editarPublicacion,
  eliminarPublicacion,
} = require("../controllers/publicacion");
const { validarPublicacion } = require("../validations/validaciones");
const catchAsync = require("../utils/catchAsync");
const { estaLogeado, esAutorPublicacion } = require("../middlewares");

routerPublicaciones
  .route("/")
  .get(estaLogeado, catchAsync(verPublicaciones))
  .post(estaLogeado, validarPublicacion, catchAsync(crearPublicacion));

routerPublicaciones
  .route("/:id")
  .get(catchAsync(verPublicacion))
  .put(estaLogeado, esAutorPublicacion, catchAsync(editarPublicacion))
  .delete(estaLogeado, esAutorPublicacion, catchAsync(eliminarPublicacion));

module.exports = routerPublicaciones;
