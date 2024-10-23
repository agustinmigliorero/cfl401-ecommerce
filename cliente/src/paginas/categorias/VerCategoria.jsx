import { useState, useEffect } from "react";
import Card from "../../componentes/Card";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../UseAuth";
import Boton from "../../componentes/Boton";

function VerCategoria() {
  const navigate = useNavigate();
  const [categoria, setCategoria] = useState({ publicaciones: [] });
  const { id } = useParams();
  const { usuarioLogeado } = useAuth();

  async function cargarCategoria(id) {
    const respuesta = await fetch(`http://localhost:3000/categorias/${id}`);
    const categoriaFetch = await respuesta.json();
    setCategoria(categoriaFetch);
  }

  function fetchBorrarCategoria() {
    let borrar = confirm("Estas seguro de borrar la categoria?");
    if (borrar) {
      fetch(`http://localhost:3000/categorias/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      })
        .then((res) => {
          navigate("/categorias", {
            state: { alerta: "Publicacion Borrada!" },
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  function botonesBorrarYEditarCategoria() {
    if (usuarioLogeado.usuario) {
      if (usuarioLogeado.usuario.esAdmin) {
        return (
          <>
            <b>Admin:</b>
            <Link to={`/categorias/editar-categoria/${id}`}>
              <Boton texto="Editar" />
            </Link>
            <Boton eventoClick={fetchBorrarCategoria} texto="Borrar" />
          </>
        );
      }
    }
  }

  useEffect(() => {
    cargarCategoria(id);
  }, []);

  const contenido = categoria.publicaciones.map((publicacion) => {
    return (
      <Card
        key={publicacion._id}
        titulo={publicacion.titulo}
        textoCard={publicacion.texto}
        textoBoton="Ver publicacion"
        linkBoton={`/publicaciones/${publicacion._id}`}
      />
    );
  });

  return (
    <>
      <h1>{categoria.nombre}</h1>
      {botonesBorrarYEditarCategoria()}
      <br />
      {contenido}
    </>
  );
}

export default VerCategoria;
