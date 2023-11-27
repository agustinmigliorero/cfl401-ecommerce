import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../../UseAuth";
import Boton from "../../componentes/Boton";

function EditarCategoria() {
  const { id } = useParams();
  const [categoria, setCategoria] = useState({ nombre: "", descripcion: "" });
  const { usuarioLogeado } = useAuth();
  const navigate = useNavigate();

  async function fetchCargarCategoria() {
    const response = await fetch(`http://localhost:3000/categorias/${id}`);
    const categoriaFetch = await response.json();
    setCategoria(categoriaFetch);
  }

  function handleChange(event) {
    const inputACambiar = event.target.name;
    const valorNuevo = event.target.value;
    setCategoria((dataActual) => {
      return { ...dataActual, [inputACambiar]: valorNuevo };
    });
  }

  function enviarFormulario(e) {
    e.preventDefault();
    fetch(`http://localhost:3000/categorias/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(categoria),
    })
      .then((res) => {
        console.log(res);
        navigate("/categorias");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    fetchCargarCategoria();
  }, []);

  return (
    <>
      <h1>Editar Categoria</h1>
      <form>
        <input
          type="text"
          name="nombre"
          placeholder="Nombre"
          value={categoria.nombre}
          onChange={handleChange}
        />
        <br />
        <textarea
          name="descripcion"
          id=""
          cols="70"
          rows="6"
          value={categoria.descripcion}
          onChange={handleChange}
        ></textarea>
        <br />
        <Boton eventoClick={enviarFormulario} texto="Editar categoria" />
      </form>
    </>
  );
}

export default EditarCategoria;
