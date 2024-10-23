import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Boton from "../../componentes/Boton";

function CrearCategoria({ usuarioLogeado }) {
  const navigate = useNavigate();
  const [objCategoria, setObjCategoria] = useState({
    nombre: "",
    descripcion: "",
  });

  const enviarFormulario = () => {
    fetch("http://localhost:3000/categorias", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        nombre: objCategoria.nombre,
        descripcion: objCategoria.descripcion,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        navigate("/categorias");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleChange = (evento) => {
    const inputACambiar = evento.target.name;
    const valorNuevo = evento.target.value;
    setObjCategoria((dataActual) => {
      return { ...objCategoria, [inputACambiar]: valorNuevo };
    });
  };

  return (
    <>
      <h1>Crear categoria</h1>
      <div>
        <input
          type="text"
          placeholder="Nombre"
          onChange={handleChange}
          name="nombre"
          value={objCategoria.nombre}
        />
        <br />
        <textarea
          placeholder="Descripción"
          name="descripcion"
          id=""
          cols="70"
          rows="6"
          value={objCategoria.descripcion}
          onChange={handleChange}
        ></textarea>
        <Boton eventoClick={enviarFormulario} texto="Crear categoria" />
      </div>
    </>
  );
}

export default CrearCategoria;
