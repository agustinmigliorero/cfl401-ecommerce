import { useParams, Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth } from "../../UseAuth";
import Boton from "../../componentes/Boton";
import CrearComentario from "../../componentes/comentarios/CrearComentario";

function VerPublicacion() {
  const navigate = useNavigate();
  const { idPublicacion } = useParams();
  const [publicacion, setPublicacion] = useState({
    autor: {},
    comentarios: [{ autor: {}, editando: false }],
    categoria: {},
  });
  const { usuarioLogeado } = useAuth();
  const [textoComentario, setTextoComentario] = useState("");
  const [puntuacionComentario, setPuntuacionComentario] = useState(5);

  async function cargarPublicacion() {
    const response = await fetch(
      `http://localhost:3000/publicaciones/${idPublicacion}`
    );
    const data = await response.json();
    setPublicacion({
      ...data,
      comentarios: data.comentarios.map((comentario) => {
        return { ...comentario, editando: false };
      }),
    });
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

  function fetchBorrarPublicacion() {
    let borrar = confirm("Estas seguro de borrar la publicacion?");
    if (borrar) {
      fetch(`http://localhost:3000/publicaciones/${publicacion._id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      })
        .then((res) => {
          navigate("/publicaciones", {
            state: { alerta: "Publicacion Borrada!" },
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }
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

  function mostrarFormEditarComentario(idComentario, mostrar = true) {
    setPublicacion({
      ...publicacion,
      comentarios: publicacion.comentarios.map((comentario) => {
        if (comentario._id === idComentario && mostrar) {
          setTextoComentario(comentario.texto);
          setPuntuacionComentario(comentario.puntuacion);
          return { ...comentario, editando: true };
        } else {
          return { ...comentario, editando: false };
        }
      }),
    });
  }

  function handleChangeTextoComentario(evento) {
    setTextoComentario(evento.target.value);
  }

  function handleChangePuntuacionComentario(evento) {
    setPuntuacionComentario(evento.target.value);
  }

  function formEditarComentario(idComentario) {
    return (
      <>
        <textarea
          type="text"
          onChange={handleChangeTextoComentario}
          value={textoComentario}
          placeholder="Comentario"
          name="textoComentario"
          cols="80"
          rows="6"
        ></textarea>
        <br />
        <input
          name="puntuacion"
          type="number"
          min={1}
          max={5}
          onChange={handleChangePuntuacionComentario}
          value={puntuacionComentario}
        />
        <br />
        <Boton
          texto="Guardar"
          eventoClick={() => {
            fetchEditarComentario(idComentario);
          }}
        />
        <Boton
          texto="Cancelar"
          eventoClick={() => {
            mostrarFormEditarComentario(idComentario, false);
          }}
        />
      </>
    );
  }

  function fetchEditarComentario(idComentario) {
    fetch(`http://localhost:3000/comentarios/${idComentario}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        texto: textoComentario,
        puntuacion: puntuacionComentario,
      }),
    })
      .then((res) => {
        mostrarFormEditarComentario(idComentario, false);
        cargarPublicacion();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function fetchBorrarComentario(idComentario) {
    let borrar = confirm("Estas seguro de borrar el comentario?");
    if (borrar) {
      fetch(`http://localhost:3000/comentarios/${idComentario}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      })
        .then((res) => {
          cargarPublicacion();
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  function botonesBorrarYEditarPublicacion() {
    if (usuarioLogeado.usuario) {
      if (
        publicacion.autor._id === usuarioLogeado.usuario._id ||
        usuarioLogeado.usuario.esAdmin
      ) {
        return (
          <>
            <Link to={`/publicaciones/editar-publicacion/${publicacion._id}`}>
              <Boton texto="Editar" />
            </Link>
            <Boton eventoClick={fetchBorrarPublicacion} texto="Borrar" />
          </>
        );
      }
    }
  }

  function botonesBorrarYEditarComentario(idAutorComentario, idComentario) {
    if (usuarioLogeado.usuario) {
      if (
        idAutorComentario === usuarioLogeado.usuario._id ||
        usuarioLogeado.usuario.esAdmin
      ) {
        return (
          <>
            <Boton
              texto="Editar"
              eventoClick={() => mostrarFormEditarComentario(idComentario)}
            />
            <Boton
              eventoClick={() => {
                fetchBorrarComentario(idComentario);
              }}
              texto="Borrar"
            />
          </>
        );
      }
    }
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
      {botonesBorrarYEditarPublicacion()}
      {usuarioLogeado.logeado ? (
        <CrearComentario fetchCrearComentario={fetchCrearComentario} />
      ) : (
        <Link to={"/usuarios/login"}>Inicia sesion para comentar!</Link>
      )}
      <ul>
        {publicacion.comentarios.map((comentario) => (
          <li key={`${comentario._id}`}>
            {comentario.editando ? (
              formEditarComentario(comentario._id)
            ) : (
              <>
                {comentario.texto}
                <br />
                <i>
                  autor: {comentario.autor.email} <br /> puntuacion:{" "}
                  {comentario.puntuacion}
                </i>
                {botonesBorrarYEditarComentario(
                  comentario.autor._id,
                  comentario._id
                )}
              </>
            )}{" "}
          </li>
        ))}
      </ul>
    </>
  );
}

export default VerPublicacion;
