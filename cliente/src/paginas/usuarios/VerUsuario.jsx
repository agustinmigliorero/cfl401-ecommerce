import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function VerUsuario() {
  const [usuario, setUsuario] = useState({});
  const { id } = useParams();

  async function cargarUsuario(id) {
    const respuesta = await fetch(`http://localhost:3000/usuarios/${id}`);
    const usuarioFetch = await respuesta.json();
    setUsuario(usuarioFetch);

    return usuarioFetch;
  }

  useEffect(() => {
    cargarUsuario(id);
  }, []);

  return (
    <>
      <h1>Esta es la pagina para ver UN usuario!</h1>
      <h2>Nombre: {usuario.nombre}</h2>
      <h2>Apellido: {usuario.apellido}</h2>
      <h2>Email: {usuario.email}</h2>
      <h2>
        Cantidad de publicaciones:{" "}
        {Array.isArray(usuario.publicaciones)
          ? usuario.publicaciones.length
          : 0}
      </h2>
      <h2>
        Cantidad de comentarios:{" "}
        {Array.isArray(usuario.comentarios) ? usuario.comentarios.length : 0}
      </h2>
    </>
  );
}

export default VerUsuario;
