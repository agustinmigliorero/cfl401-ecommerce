import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth } from "../../UseAuth";
import Boton from "../../componentes/Boton";
import CrearComentario from "../../componentes/comentarios/CrearComentario";

function VerPublicacion() {
  const { idPublicacion } = useParams();
  const [publicacion, setPublicacion] = useState({
    autor: {},
    comentarios: [{ autor: {} }],
    categoria: {},
  });
  const { usuarioLogeado } = useAuth();

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

  async function fetchCrearComentario(textoComentario, puntuacionComentario) {
    const response = await fetch("http://localhost:3000/comentarios", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        texto: textoComentario,
        publicacion: publicacion._id,
        autor: usuarioLogeado.usuario._id,
        puntuacion: puntuacionComentario,
      }),
    })
      .then((res) => {
        cargarPublicacion();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function calcularPromedioPuntaje() {
    let promedio = 0;
    for (let i = 0; i < publicacion.comentarios.length; i++) {
      promedio += publicacion.comentarios[i].puntuacion;
    }
    return isNaN(promedio / publicacion.comentarios.length)
      ? "No hay puntuaciones"
      : (promedio / publicacion.comentarios.length).toFixed(2);
  }

  return (
    <>
      <Link to={`/categorias/${publicacion.categoria._id}`}>
        {publicacion.categoria.nombre}
      </Link>
      <h1>Titulo: {publicacion.titulo}</h1>
      <p>Texto: {publicacion.texto}</p>
      <p>Autor: {publicacion.autor.email}</p>
      <h2>
        Puntaje promedio de la publicacion: <b>{calcularPromedioPuntaje()}</b>
      </h2>
      {usuarioLogeado.logeado ? (
        <CrearComentario fetchCrearComentario={fetchCrearComentario} />
      ) : (
        <Link to={"/usuarios/login"}>Inicia sesion para comentar!</Link>
      )}
      <ul>
        {publicacion.comentarios.map((comentario) => (
          <li key={`${comentario._id}`}>
            {comentario.texto} <br />{" "}
            <i>
              autor: {comentario.autor.email} <br /> puntuacion:{" "}
              {comentario.puntuacion}
            </i>
          </li>
        ))}
      </ul>
    </>
  );
}

export default VerPublicacion;
