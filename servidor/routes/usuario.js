const routerUsuarios = require("express").Router();
const {
  verUsuarios,
  verUsuario,
  crearUsuario,
  editarUsuario,
  eliminarUsuario,
} = require("../controllers/usuario");
const catchAsync = require("../utils/catchAsync");
const { validarUsuario } = require("../validations/validaciones");

routerUsuarios
  .route("/")
  .get(catchAsync(verUsuarios))
  .post(validarUsuario, catchAsync(crearUsuario));

routerUsuarios
  .route("/:id")
  .get(catchAsync(verUsuario))
  .put(catchAsync(editarUsuario))
  .delete(catchAsync(eliminarUsuario));

module.exports = routerUsuarios;
