import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../UseAuth";
import Boton from "../../componentes/Boton";

function CrearPublicacion() {
  const navigate = useNavigate();
  const { usuarioLogeado } = useAuth();
  const [publicacion, setPublicacion] = useState({
    titulo: "",
    texto: "",
    autor: usuarioLogeado.usuario._id,
    categoria: [""],
  });
  const [categorias, setCategorias] = useState([{}]);

  const handleChange = (event) => {
    const inputACambiar = event.target.name;
    const valorNuevo = event.target.value;
    setPublicacion((dataActual) => {
      return { ...publicacion, [inputACambiar]: valorNuevo };
    });
  };

  async function fetchCrearPublicacion() {
    const response = await fetch("http://localhost:3000/publicaciones", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(publicacion),
    }).then((res) => {
      navigate("/publicaciones", { state: { alerta: "Publicacion Creada!" } });
    });
  }

  async function fetchCargarCategorias() {
    const response = await fetch("http://localhost:3000/categorias");
    const categoriasFetch = await response.json();
    setCategorias(categoriasFetch);
  }

  useEffect(() => {
    fetchCargarCategorias();
  });

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
        <select name="categoria" onChange={handleChange}>
          {opciones}
        </select>
        <Boton texto="Crear Publicacion" eventoClick={fetchCrearPublicacion} />
      </div>
    </>
  );
}

export default CrearPublicacion;
