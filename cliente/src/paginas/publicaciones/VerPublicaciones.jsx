import { useState, useEffect } from "react";
import Card from "../../componentes/Card";
import { useLocation } from "react-router-dom";

function VerPublicaciones() {
  const [publicaciones, setPublicaciones] = useState([{}]);
  const { state } = useLocation();

  async function cargarPublicaciones() {
    const respuesta = await fetch("http://localhost:3000/publicaciones");
    const publicacionesFetch = await respuesta.json();
    setPublicaciones(publicacionesFetch);
  }

  useEffect(() => {
    cargarPublicaciones();
  });

  const contenido = publicaciones.map((publicacion) => {
    return (
      <Card
        key={`${publicacion._id}`}
        titulo={publicacion.titulo}
        textoCard={publicacion.texto}
        textoBoton="Ver publicacion"
        linkBoton={`/publicaciones/${publicacion._id}`}
      />
    );
  });

  return (
    <>
      {state ? (
        <h2 style={{ backgroundColor: "green", color: "white" }}>
          {" "}
          {state.alerta}{" "}
        </h2>
      ) : (
        ""
      )}
      <h1>Publicaciones</h1>
      {contenido}
    </>
  );
}

export default VerPublicaciones;
