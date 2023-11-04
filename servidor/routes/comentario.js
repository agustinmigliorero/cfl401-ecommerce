const routerComentarios = require("express").Router();
const {
  crearComentario,
  editarComentario,
  eliminarComentario,
} = require("../controllers/comentario");

routerComentarios.route("/").post(crearComentario);

routerComentarios
  .route("/:id")
  .put(editarComentario)
  .delete(eliminarComentario);

module.exports = routerComentarios;
