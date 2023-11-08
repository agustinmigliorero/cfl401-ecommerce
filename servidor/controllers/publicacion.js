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
    });
  res.json(publicacion);
};

const crearPublicacion = async (req, res) => {
  const { autor, titulo, texto, categorias } = req.body;
  const publicacion = new Publicacion({ autor, titulo, texto, categorias });
  await publicacion.save();
  await Usuario.findByIdAndUpdate(autor, {
    $push: {
      publicaciones: publicacion._id,
    },
  });

  for (let i = 0; i < categorias.length; i++) {
    await Categoria.findByIdAndUpdate(categorias[i], {
      $push: { publicaciones: publicacion._id },
    });
  }

  res.json({ msg: "Publicacion creada", publicacion });
};

const editarPublicacion = async (req, res) => {
  const { id } = req.params;
  const { autor, titulo, texto, categorias } = req.body;
  const publicacion = await Publicacion.findByIdAndUpdate(id, {
    autor,
    titulo,
    texto,
    categorias,
  });

  if (categorias) {
    for (let i = 0; i < categorias.length; i++) {
      await Categoria.findByIdAndUpdate(categorias[i], {
        $pull: { publicaciones: publicacion._id },
      });

      await Categoria.findByIdAndUpdate(categorias[i], {
        $push: { publicaciones: publicacion._id },
      });
    }
  }

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
  await Categoria.updateMany(publicacion.categorias, {
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
