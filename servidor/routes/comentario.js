const routerComentarios = require("express").Router();
const {
  crearComentario,
  editarComentario,
  eliminarComentario,
} = require("../controllers/comentario");
const { validarComentario } = require("../validations/validaciones");
const catchAsync = require("../utils/catchAsync");

routerComentarios
  .route("/")
  .post(validarComentario, catchAsync(crearComentario));

routerComentarios
  .route("/:id")
  .put(catchAsync(editarComentario))
  .delete(catchAsync(eliminarComentario));

module.exports = routerComentarios;
