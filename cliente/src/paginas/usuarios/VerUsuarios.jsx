import { useState, useEffect } from "react";
import Boton from "../../componentes/Boton";
import { Link } from "react-router-dom";

function renderizarTablas(data) {
  return data.map((usuario, index) => (
    <tr key={index}>
      <td>{usuario._id}</td>
      <td>{usuario.nombre}</td>
      <td>{usuario.apellido}</td>
      <td>{usuario.email}</td>
      <td>
        {Array.isArray(usuario.publicaciones)
          ? usuario.publicaciones.length
          : 0}
      </td>
      <td>
        {Array.isArray(usuario.comentarios) ? usuario.comentarios.length : 0}
      </td>
      <td>
        <Link className="nav-link" to={`/usuarios/${usuario._id}`}>
          <Boton texto="Ver usuario" />
        </Link>
      </td>
    </tr>
  ));
}

function VerUsuarios() {
  const [usuarios, setUsuarios] = useState([{}]);

  async function cargarUsuarios() {
    const respuesta = await fetch("http://localhost:3000/usuarios");
    const usuariosFetch = await respuesta.json();
    setUsuarios(usuariosFetch);
  }

  useEffect(() => {
    cargarUsuarios();
  }, []);

  const tabla = (
    <>
      <h1>USUARIOS!</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Email</th>
            <th>Publicaciones</th>
            <th>Comentarios</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>{renderizarTablas(usuarios)}</tbody>
      </table>
    </>
  );

  return <>{tabla}</>;
}

export default VerUsuarios;
