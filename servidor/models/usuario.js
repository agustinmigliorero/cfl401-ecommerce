const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

const usuarioSchema = new Schema({
  nombre: { type: String },
  apellido: { type: String },
  email: { type: String },
  esAdmin: { type: Boolean, default: true },
  publicaciones: [{ type: Schema.Types.ObjectId, ref: "Publicacion" }],
  comentarios: [{ type: Schema.Types.ObjectId, ref: "Comentario" }],
});

usuarioSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("Usuario", usuarioSchema);
