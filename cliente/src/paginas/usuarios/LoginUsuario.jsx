import { useState } from "react";
import Boton from "../../componentes/Boton";
import { useNavigate, useLocation } from "react-router-dom";

function LoginUsuario({ setUsuarioLogeado }) {
  const [objUsuario, setObjUsuario] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();
  const { state } = useLocation();

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
      {state ? (
        <h2
          style={{
            backgroundColor: "red",
            color: "white",
            margin: "auto",
            textAlign: "center",
          }}
        >
          {state.alerta}
        </h2>
      ) : (
        ""
      )}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "30%",
          margin: "auto",
          textAlign: "center",
        }}
      >
        <h1>Login</h1>
        <input
          type="text"
          placeholder="Usuario"
          onChange={handleChange}
          value={objUsuario.username}
          name="username"
        />{" "}
        <br />
        <input
          type="password"
          placeholder="Contraseña"
          onChange={handleChange}
          value={objUsuario.password}
          name="password"
        />{" "}
        <br />
        <Boton texto="Login" eventoClick={enviarLogin} />
      </div>
    </>
  );
}

export default LoginUsuario;
