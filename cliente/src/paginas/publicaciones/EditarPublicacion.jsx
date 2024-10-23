import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Boton from "../../componentes/Boton";

function EditarPublicacion({ usuarioLogeado }) {
  const navigate = useNavigate();
  const { id } = useParams();
  const [publicacion, setPublicacion] = useState({
    titulo: "",
    texto: "",
    categoria: "",
    autor: "",
  });
  const [categorias, setCategorias] = useState([{}]);

  async function fetchCargarPublicacion() {
    const response = await fetch(`http://localhost:3000/publicaciones/${id}`);
    const publicacionFetch = await response.json();
    setPublicacion(publicacionFetch);
    if (
      publicacionFetch.autor._id !== usuarioLogeado.usuario._id &&
      !usuarioLogeado.usuario.esAdmin
    ) {
      navigate("/usuarios/login", {
        state: { alerta: "No tienes permisos para editar esta publicacion!" },
      });
    }
  }

  async function fetchCargarCategorias() {
    const response = await fetch("http://localhost:3000/categorias");
    const categoriasFetch = await response.json();
    setCategorias(categoriasFetch);
  }

  useEffect(() => {
    fetchCargarPublicacion();
    fetchCargarCategorias();
  }, []);

  function fetchEditarPublicacion() {
    fetch(`http://localhost:3000/publicaciones/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(publicacion),
    })
      .then((res) => {
        navigate("/publicaciones", {
          state: { alerta: "Publicacion Editada!" },
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const handleChange = (event) => {
    const inputACambiar = event.target.name;
    const valorNuevo = event.target.value;
    setPublicacion((dataActual) => {
      return { ...publicacion, [inputACambiar]: valorNuevo };
    });
  };

  const opciones = categorias.map((categoria) => {
    return (
      <option key={`${categoria._id}`} value={categoria._id}>
        {categoria.nombre}
      </option>
    );
  });

  return (
    <>
      <h1>Editar Publicacion</h1>
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
        <Boton
          texto="Editar Publicacion"
          eventoClick={fetchEditarPublicacion}
        />
      </div>
    </>
  );
}

export default EditarPublicacion;
