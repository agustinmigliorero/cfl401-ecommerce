const express = require("express");
const app = express();
const puerto = 3000;
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const routerCategorias = require("./routes/categoria");
const routerPublicaciones = require("./routes/publicacion");
const routerComentarios = require("./routes/comentario");
const routerUsuarios = require("./routes/usuario");
const passport = require("passport");
const session = require("express-session");
const LocalStrategy = require("passport-local");
const Usuario = require("./models/usuario");

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
  res.header("Access-Control-Allow-Origin", req.headers.origin);
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "X-Requested-With, Content-Type, Accept, Origin, Authorization"
  );
  next();
});

//cors

//passport y session
app.use(
  session({
    secret: "claveSecreta",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 7, httpOnly: true },
  })
);

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(Usuario.authenticate()));

passport.serializeUser(Usuario.serializeUser());
passport.deserializeUser(Usuario.deserializeUser());
//passport y session

//rutas
app.use("/usuarios", routerUsuarios);
app.use("/categorias", routerCategorias);
app.use("/publicaciones", routerPublicaciones);
app.use("/comentarios", routerComentarios);
//rutas

//error handler
app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({ error: err.message });
});
//error handler

app.listen(puerto, () => {
  console.log(`Servidor corriendo en el puerto ${puerto}`);
});
