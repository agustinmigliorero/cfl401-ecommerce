import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../UseAuth";
import Boton from "../../componentes/Boton";

function CrearPublicacion() {
  const navigate = useNavigate();
  const [publicacion, setPublicacion] = useState({
    titulo: "",
    texto: "",
    categoria: "",
  });
  const [categorias, setCategorias] = useState([{}]);
  const [usuario, setUsuario] = useState({});

  const handleChange = (event) => {
    const inputACambiar = event.target.name;
    const valorNuevo = event.target.value;
    setPublicacion((dataActual) => {
      return { ...publicacion, [inputACambiar]: valorNuevo };
    });
    console.log(publicacion);
  };

  async function fetchCrearPublicacion() {
    const response = await fetch("http://localhost:3000/publicaciones", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ ...publicacion, autor: usuario.usuario._id }),
    })
      .then((res) => {
        console.log({ ...publicacion, autor: usuario.usuario._id });
        navigate("/publicaciones", {
          state: { alerta: "Publicacion Creada!" },
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async function fetchCargarCategorias() {
    const response = await fetch("http://localhost:3000/categorias");
    const categoriasFetch = await response.json();
    setPublicacion((dataActual) => {
      return { ...publicacion, categoria: categoriasFetch[0]._id };
    });
    setCategorias(categoriasFetch);
  }

  async function fetchCargarAutor() {
    const response = await fetch(
      "http://localhost:3000/usuarios/usuario-logeado",
      {
        credentials: "include",
      }
    );
    const usuarioFetch = await response.json();
    setUsuario(usuarioFetch);
  }

  async function cargarFetch() {
    fetchCargarCategorias();
    fetchCargarAutor();
  }

  useEffect(() => {
    cargarFetch();
  }, []);

  const opciones = categorias.map((categoria) => {
    return (
      <option key={`${categoria._id}`} value={categoria._id}>
        {categoria.nombre}
      </option>
    );
  });

  return (
    <>
      <h2>Crear Publicacion</h2>
      <div>
        <input
          placeholder="Titulo"
          name="titulo"
          type="text"
          value={publicacion.titulo}
          onChange={handleChange}
        />
        <input
          placeholder="Texto"
          name="texto"
          type="text"
          value={publicacion.texto}
          onChange={handleChange}
        />
        <select
          name="categoria"
          value={publicacion.categoria}
          onChange={handleChange}
        >
          {opciones}
        </select>
        <Boton texto="Crear Publicacion" eventoClick={fetchCrearPublicacion} />
      </div>
    </>
  );
}

export default CrearPublicacion;
