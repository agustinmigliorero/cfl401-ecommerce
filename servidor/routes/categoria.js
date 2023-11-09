const routerCategorias = require("express").Router();
const {
  verCategorias,
  verCategoria,
  crearCategoria,
  editarCategoria,
  eliminarCategoria,
} = require("../controllers/categoria");
const { validarCategoria } = require("../validations/validaciones");
const catchAsync = require("../utils/catchAsync");
const { estaLogeado, esAdmin } = require("../middlewares");

routerCategorias
  .route("/")
  .get(catchAsync(verCategorias))
  .post(estaLogeado, esAdmin, validarCategoria, catchAsync(crearCategoria));

routerCategorias
  .route("/:id")
  .get(catchAsync(verCategoria))
  .put(estaLogeado, esAdmin, catchAsync(editarCategoria))
  .delete(estaLogeado, esAdmin, catchAsync(eliminarCategoria));

module.exports = routerCategorias;
