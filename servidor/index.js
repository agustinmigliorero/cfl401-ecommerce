const express = require("express");
const app = express();
const puerto = 3000;
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const routerCategorias = require("./routes/categoria");
const routerPublicaciones = require("./routes/publicacion");
const routerComentarios = require("./routes/comentario");
const routerUsuarios = require("./routes/usuario");

//db conexion
mongoose.connect("mongodb://127.0.0.1:27017/cfl-ecommerce", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", (err) => console.log(err));
db.once("open", () => console.log("Base de datos conectada!"));

//db conexion

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//cors

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "X-Requested-With, Content-Type, Accept, Origin, Authorization"
  );
  next();
});

//cors

//rutas
app.use("/usuarios", routerUsuarios);
app.use("/categorias", routerCategorias);
app.use("/publicaciones", routerPublicaciones);
app.use("/comentarios", routerComentarios);
//rutas

app.listen(puerto, () => {
  console.log(`Servidor corriendo en el puerto ${puerto}`);
});
