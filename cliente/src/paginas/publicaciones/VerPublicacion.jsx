import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

function VerPublicacion() {
  const { idPublicacion } = useParams();
  const [publicacion, setPublicacion] = useState({});

  async function cargarPublicacion() {
    const response = await fetch(
      `http://localhost:3000/publicaciones/${idPublicacion}`
    );
    const data = await response.json();
    setPublicacion(data);
  }

  useEffect(() => {
    cargarPublicacion();
  });

  return (
    <>
      <h1>Titulo: {publicacion.titulo}</h1>
      <p>Texto: {publicacion.texto}</p>
      <p>Autor: {publicacion.autor.email}</p>
    </>
  );
}

export default VerPublicacion;
