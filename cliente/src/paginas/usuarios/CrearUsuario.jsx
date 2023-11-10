import Navbar from "../../componentes/Navbar";
import { useState } from "react";
import Boton from "../../componentes/Boton";

function CrearUsuario() {
  const [objUsuario, setObjUsuario] = useState({
    nombre: "",
    apellido: "",
    email: "",
    password: "",
  });

  const handleChange = (evento) => {
    const inputACambiar = evento.target.name;
    const valorNuevo = evento.target.value;
    setObjUsuario((dataActual) => {
      return { ...objUsuario, [inputACambiar]: valorNuevo };
    });
  };

  const enviarFormulario = () => {
    console.log(objUsuario);
  };

  return (
    <>
      <Navbar paginaActiva="Usuarios" />
      <h1>Crear un usuario!</h1>
      <div>
        <input
          type="text"
          placeholder="Nombre"
          onChange={handleChange}
          value={objUsuario.nombre}
          name="nombre"
        />
        <input
          type="text"
          placeholder="Apellido"
          onChange={handleChange}
          value={objUsuario.apellido}
          name="apellido"
        />
        <input
          type="email"
          placeholder="Email"
          onChange={handleChange}
          value={objUsuario.email}
          name="email"
        />
        <input
          type="password"
          placeholder="Contraseña"
          onChange={handleChange}
          value={objUsuario.password}
          name="password"
        />
        <Boton texto="Crear usuario" eventoClick={enviarFormulario} />
      </div>
    </>
  );
}

export default CrearUsuario;
