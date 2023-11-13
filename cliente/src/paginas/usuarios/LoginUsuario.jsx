import { useState } from "react";
import Boton from "../../componentes/Boton";
import { useNavigate } from "react-router-dom";

function LoginUsuario({ setUsuarioLogeado }) {
  const [objUsuario, setObjUsuario] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();

  const enviarLogin = () => {
    fetch("http://localhost:3000/usuarios/login", {
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

  const handleChange = (evento) => {
    const inputACambiar = evento.target.name;
    const valorNuevo = evento.target.value;
    setObjUsuario((dataActual) => {
      return { ...objUsuario, [inputACambiar]: valorNuevo };
    });
  };

  return (
    <>
      <h1>Login</h1>
      <div>
        <input
          type="text"
          placeholder="Usuario"
          onChange={handleChange}
          value={objUsuario.username}
          name="username"
        />
        <input
          type="password"
          placeholder="Contraseña"
          onChange={handleChange}
          value={objUsuario.password}
          name="password"
        />
        <Boton texto="Login" eventoClick={enviarLogin} />
      </div>
    </>
  );
}

export default LoginUsuario;
