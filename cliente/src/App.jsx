import { useState, useEffect } from "react";
import "./App.css";
import Inicio from "./paginas/Inicio";
import VerUsuarios from "./paginas/usuarios/VerUsuarios.jsx";
import VerUsuario from "./paginas/usuarios/VerUsuario.jsx";
import { Route, Routes } from "react-router-dom";
import Navbar from "./componentes/Navbar.jsx";
import CrearUsuario from "./paginas/usuarios/CrearUsuario.jsx";
import LoginUsuario from "./paginas/usuarios/LoginUsuario.jsx";
import LogoutUsuario from "./paginas/usuarios/LogoutUsuario.jsx";
import VerCategorias from "./paginas/categorias/VerCategorias.jsx";
import VerCategoria from "./paginas/categorias/VerCategoria.jsx";
import CrearCategoria from "./paginas/categorias/CrearCategoria.jsx";

function App() {
  const [usuarioLogeado, setUsuarioLogeado] = useState({ logeado: false });

  function eventoClick(nuevaPagina) {
    setPagina(nuevaPagina);
  }

  async function fetchUsuarioLogeado() {
    const respuesta = await fetch(
      "http://localhost:3000/usuarios/usuario-logeado",
      {
        credentials: "include",
      }
    );
    const usuario = await respuesta.json();
    setUsuarioLogeado(usuario);
  }

  useEffect(() => {
    fetchUsuarioLogeado();
    console.log(usuarioLogeado);
  }, []);

  return (
    <>
      <Navbar usuarioLogeado={usuarioLogeado} />
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/usuarios" element={<VerUsuarios />} />

        <Route
          path="/usuarios/registrarse"
          element={<CrearUsuario setUsuarioLogeado={setUsuarioLogeado} />}
        />
        <Route
          path="/usuarios/login"
          element={<LoginUsuario setUsuarioLogeado={setUsuarioLogeado} />}
        />
        <Route
          path="/usuarios/logout"
          element={<LogoutUsuario setUsuarioLogeado={setUsuarioLogeado} />}
        />
        <Route path="/usuarios/:id" element={<VerUsuario />} />

        <Route path="/categorias" element={<VerCategorias />} />
        <Route
          path="/categorias/crear-categoria"
          element={<CrearCategoria usuarioLogeado={usuarioLogeado} />}
        />
        <Route path="/categorias/:id" element={<VerCategoria />} />
      </Routes>
      {/* <Boton
        texto="Inicio"
        eventoClick={() => {
          eventoClick("Inicio");
        }}
      />
      <Boton
        texto="Ver Usuarios"
        eventoClick={() => {
          eventoClick("IndexUsuarios");
        }}
      />
      {pagina === "Inicio" && <Inicio />}
      {pagina === "IndexUsuarios" && <IndexUsuarios />} */}
    </>
  );
}

export default App;
