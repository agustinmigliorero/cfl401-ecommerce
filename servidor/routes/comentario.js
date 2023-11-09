const routerComentarios = require("express").Router();
const {
  crearComentario,
  editarComentario,
  eliminarComentario,
} = require("../controllers/comentario");
const { validarComentario } = require("../validations/validaciones");
const catchAsync = require("../utils/catchAsync");
const { estaLogeado, esAutorComentario } = require("../middlewares");

routerComentarios
  .route("/")
  .post(estaLogeado, validarComentario, catchAsync(crearComentario));

routerComentarios
  .route("/:id")
  .put(estaLogeado, esAutorComentario, catchAsync(editarComentario))
  .delete(estaLogeado, esAutorComentario, catchAsync(eliminarComentario));

module.exports = routerComentarios;
