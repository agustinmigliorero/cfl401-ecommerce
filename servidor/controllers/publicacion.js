const Publicacion = require("../models/publicacion");
const Usuario = require("../models/usuario");
const Categoria = require("../models/categoria");

const verPublicaciones = async (req, res) => {
  const publicaciones = await Publicacion.find();
  res.json(publicaciones);
};

const verPublicacion = async (req, res) => {
  const { id } = req.params;
  const publicacion = await Publicacion.findById(id)
    .populate("autor")
    .populate({
      path: "comentarios",
      populate: { path: "autor" },
    })
    .populate("categoria");
  res.json(publicacion);
};

const crearPublicacion = async (req, res) => {
  const { autor, titulo, texto, categoria } = req.body;
  const publicacion = new Publicacion({ autor, titulo, texto, categoria });
  await publicacion.save();
  await Usuario.findByIdAndUpdate(autor, {
    $push: {
      publicaciones: publicacion._id,
    },
  });

  await Categoria.findByIdAndUpdate(categoria, {
    $push: { publicaciones: publicacion._id },
  });

  res.json({ msg: "Publicacion creada", publicacion });
};

const editarPublicacion = async (req, res) => {
  const { id } = req.params;
  const { autor, titulo, texto, categoria } = req.body;
  const publicacion = await Publicacion.findByIdAndUpdate(id, {
    autor,
    titulo,
    texto,
    categoria,
  });

  await Categoria.findByIdAndUpdate(categoria, {
    $pull: { publicaciones: publicacion._id },
  });

  await Categoria.findByIdAndUpdate(categoria, {
    $push: { publicaciones: publicacion._id },
  });

  res.json({ msg: "Publicacion actualizada", publicacion });
};

const eliminarPublicacion = async (req, res) => {
  const { id } = req.params;
  const publicacion = await Publicacion.findByIdAndDelete(id);
  await Usuario.findByIdAndUpdate(publicacion.autor, {
    $pull: {
      publicaciones: publicacion._id,
    },
  });
  await Categoria.findByIdAndUpdate(publicacion.categoria, {
    $pull: { publicaciones: publicacion._id },
  });
  res.json({ msg: "Publicacion eliminada", publicacion });
};

module.exports = {
  verPublicaciones,
  verPublicacion,
  crearPublicacion,
  editarPublicacion,
  eliminarPublicacion,
};
