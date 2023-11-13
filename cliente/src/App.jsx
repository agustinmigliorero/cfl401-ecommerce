import { useState, useEffect } from "react";
import "./App.css";
import Inicio from "./paginas/Inicio";
import VerUsuarios from "./paginas/usuarios/VerUsuarios.jsx";
import VerUsuario from "./paginas/usuarios/VerUsuario.jsx";
import { Route, Routes, Navigate } from "react-router-dom";
import Navbar from "./componentes/Navbar.jsx";
import CrearUsuario from "./paginas/usuarios/CrearUsuario.jsx";
import LoginUsuario from "./paginas/usuarios/LoginUsuario.jsx";
import LogoutUsuario from "./paginas/usuarios/LogoutUsuario.jsx";
import VerCategorias from "./paginas/categorias/VerCategorias.jsx";
import VerCategoria from "./paginas/categorias/VerCategoria.jsx";
import CrearCategoria from "./paginas/categorias/CrearCategoria.jsx";
import { AuthProvider, useAuth } from "./UseAuth.jsx";

function RutaProtegidaLogeado({ children }) {
  const { usuarioLogeado, cargando } = useAuth();
  console.log(usuarioLogeado, cargando);
  if (cargando) {
    return "";
  }
  return usuarioLogeado.logeado ? children : <Navigate to="/usuarios/login" />;
}

function RutaProtegidaAdmin({ children }) {
  const { usuarioLogeado, cargando } = useAuth();
  console.log(usuarioLogeado, cargando);
  if (cargando) {
    return "";
  }
  return usuarioLogeado.logeado && usuarioLogeado.usuario.esAdmin ? (
    children
  ) : (
    <Navigate to="/usuarios/login" />
  );
}

function RutaProtegidaAutor({ children }) {}

function App() {
  const { usuarioLogeado, setUsuarioLogeado } = useAuth();
  // const [usuarioLogeado, setUsuarioLogeado] = useState({ logeado: false });

  // async function fetchUsuarioLogeado() {
  //   const respuesta = await fetch(
  //     "http://localhost:3000/usuarios/usuario-logeado",
  //     {
  //       credentials: "include",
  //     }
  //   );
  //   const usuario = await respuesta.json();
  //   setUsuarioLogeado(usuario);
  // }

  // useEffect(() => {
  //   fetchUsuarioLogeado();
  //   console.log(usuarioLogeado);
  // }, []);

  return (
    // <AuthProvider>
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
          element={
            <RutaProtegidaAdmin>
              <CrearCategoria usuarioLogeado={usuarioLogeado} />
            </RutaProtegidaAdmin>
          }
        />
        <Route path="/categorias/:id" element={<VerCategoria />} />
      </Routes>
    </>
    // </AuthProvider>
  );
}

export default App;
