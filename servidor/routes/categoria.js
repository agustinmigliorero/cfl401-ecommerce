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

routerCategorias
  .route("/")
  .get(catchAsync(verCategorias))
  .post(validarCategoria, catchAsync(crearCategoria));

routerCategorias
  .route("/:id")
  .get(catchAsync(verCategoria))
  .put(catchAsync(editarCategoria))
  .delete(catchAsync(eliminarCategoria));

module.exports = routerCategorias;
