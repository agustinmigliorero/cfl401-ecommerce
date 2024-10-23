import Navbar from "../../componentes/Navbar";
import { useState } from "react";
import Boton from "../../componentes/Boton";
import { useNavigate } from "react-router-dom";

function CrearUsuario({ setUsuarioLogeado }) {
  const [objUsuario, setObjUsuario] = useState({
    nombre: "",
    apellido: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (evento) => {
    const inputACambiar = evento.target.name;
    const valorNuevo = evento.target.value;
    setObjUsuario((dataActual) => {
      return { ...objUsuario, [inputACambiar]: valorNuevo };
    });
  };

  const enviarFormulario = () => {
    fetch("http://localhost:3000/usuarios", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(objUsuario),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setUsuarioLogeado(data);
        if (data.logeado) {
          navigate("/");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
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
