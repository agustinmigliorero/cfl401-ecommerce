const routerUsuarios = require("express").Router();
const {
  verUsuarios,
  verUsuario,
  crearUsuario,
  editarUsuario,
  eliminarUsuario,
  loginUsuario,
  errorLogin,
  logoutUsuario,
  usuarioLogeado,
} = require("../controllers/usuario");
const catchAsync = require("../utils/catchAsync");
const { validarUsuario } = require("../validations/validaciones");
const passport = require("passport");
const { estaLogeado, esUsuario } = require("../middlewares");

routerUsuarios
  .route("/")
  .get(catchAsync(verUsuarios))
  .post(validarUsuario, catchAsync(crearUsuario));

routerUsuarios.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/usuarios/error-login",
  }),
  catchAsync(loginUsuario)
);
routerUsuarios.get("/logout", catchAsync(logoutUsuario));
routerUsuarios.get("/usuario-logeado", catchAsync(usuarioLogeado));
routerUsuarios.post("/error-login", catchAsync(errorLogin));

routerUsuarios
  .route("/:id")
  .get(catchAsync(verUsuario))
  .put(estaLogeado, esUsuario, catchAsync(editarUsuario))
  .delete(estaLogeado, esUsuario, catchAsync(eliminarUsuario));

module.exports = routerUsuarios;
