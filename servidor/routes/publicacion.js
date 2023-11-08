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

routerPublicaciones
  .route("/")
  .get(catchAsync(verPublicaciones))
  .post(validarPublicacion, catchAsync(crearPublicacion));

routerPublicaciones
  .route("/:id")
  .get(catchAsync(verPublicacion))
  .put(catchAsync(editarPublicacion))
  .delete(catchAsync(eliminarPublicacion));

module.exports = routerPublicaciones;
