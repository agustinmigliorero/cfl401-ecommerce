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
import EditarCategoria from "./paginas/categorias/EditarCategoria.jsx";
import VerPublicaciones from "./paginas/publicaciones/VerPublicaciones.jsx";
import VerPublicacion from "./paginas/publicaciones/VerPublicacion.jsx";
import CrearPublicacion from "./paginas/publicaciones/CrearPublicacion.jsx";
import { useAuth } from "./UseAuth.jsx";

function RutaProtegidaLogeado({ children }) {
  const { usuarioLogeado, cargando } = useAuth();
  console.log(usuarioLogeado, cargando);
  if (cargando) {
    return "";
  }
  return usuarioLogeado.logeado ? (
    children
  ) : (
    <Navigate to="/usuarios/login" state={{ alerta: "No estas logeado!" }} />
  );
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
    <Navigate
      to="/usuarios/login"
      state={{ alerta: "No tenes permisos para hacer eso!" }}
    />
  );
}

function App() {
  const { usuarioLogeado, setUsuarioLogeado } = useAuth();

  return (
    <>
      <Navbar usuarioLogeado={usuarioLogeado} />
      <Routes>
        <Route path="/" element={<Inicio />} />

        {/* RUTAS USUARIOS */}
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
        {/* RUTAS USUARIOS */}

        {/* RUTAS CATEGORIAS */}
        <Route path="/categorias" element={<VerCategorias />} />
        <Route
          path="/categorias/crear-categoria"
          element={
            <RutaProtegidaAdmin>
              <CrearCategoria />
            </RutaProtegidaAdmin>
          }
        />
        <Route path="/categorias/:id" element={<VerCategoria />} />
        <Route
          path="/categorias/editar-categoria/:id"
          element={
            <RutaProtegidaAdmin>
              <EditarCategoria />
            </RutaProtegidaAdmin>
          }
        />
        {/* RUTAS CATEGORIAS */}

        {/* RUTAS PUBLICACIONES */}
        <Route path="/publicaciones" element={<VerPublicaciones />} />
        <Route
          path="/publicaciones/crear-publicacion"
          element={
            <RutaProtegidaLogeado>
              <CrearPublicacion usuarioLogeado={usuarioLogeado} />
            </RutaProtegidaLogeado>
          }
        />
        <Route
          path="/publicaciones/:idPublicacion"
          element={<VerPublicacion />}
        />
        {/* RUTAS PUBLICACIONES */}
      </Routes>
    </>
  );
}

export default App;
