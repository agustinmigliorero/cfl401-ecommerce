import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";

function VerPublicacion() {
  const { idPublicacion } = useParams();
  const [publicacion, setPublicacion] = useState({
    autor: {},
    comentarios: [{}],
    categoria: {},
  });

  async function cargarPublicacion() {
    const response = await fetch(
      `http://localhost:3000/publicaciones/${idPublicacion}`
    );
    const data = await response.json();
    setPublicacion(data);
  }

  useEffect(() => {
    cargarPublicacion();
  }, []);

  return (
    <>
      <Link to={`/categorias/${publicacion.categoria._id}`}>
        {publicacion.categoria.nombre}
      </Link>
      <h1>Titulo: {publicacion.titulo}</h1>
      <p>Texto: {publicacion.texto}</p>
      <p>Autor: {publicacion.autor.email}</p>
      <ul>
        {publicacion.comentarios.map((comentario) => (
          <li key={`${comentario._id}`}>{comentario.texto}</li>
        ))}
      </ul>
    </>
  );
}

export default VerPublicacion;
