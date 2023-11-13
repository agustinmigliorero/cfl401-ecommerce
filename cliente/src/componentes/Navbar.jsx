import { NavLink } from "react-router-dom";
import { useState } from "react";

function Navbar({ usuarioLogeado }) {
  console.log(usuarioLogeado);
  const linksLogeado = () => {
    return (
      <>
        <li className="nav-item">
          <NavLink
            className={`nav-link ${({ isActive }) =>
              isActive ? "active-style" : ""}`}
            aria-current="page"
            to={`/usuarios/${usuarioLogeado.usuario._id}`}
            end
          >
            {usuarioLogeado.usuario.nombre}
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            className={`nav-link ${({ isActive }) =>
              isActive ? "active-style" : ""}`}
            aria-current="page"
            to="/usuarios/logout"
            end
          >
            Desconectarse
          </NavLink>
        </li>
      </>
    );
  };

  const linksDeslogeado = () => {
    return (
      <>
        <li className="nav-item">
          <NavLink
            className={`nav-link ${({ isActive }) =>
              isActive ? "active-style" : ""}`}
            aria-current="page"
            to="/usuarios/login"
            end
          >
            Iniciar Sesion
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            className={`nav-link ${({ isActive }) =>
              isActive ? "active-style" : ""}`}
            aria-current="page"
            to="/usuarios/registrarse"
            end
          >
            Registrate
          </NavLink>
        </li>
      </>
    );
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-fondo">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="#">
          E-Commerce CFL401
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink
                className={`nav-link ${({ isActive }) =>
                  isActive ? "active-style" : ""}`}
                aria-current="page"
                to="/"
              >
                Inicio
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className={`nav-link ${({ isActive }) =>
                  isActive ? "active-style" : ""}`}
                aria-current="page"
                to="/usuarios"
                end
              >
                Usuarios
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className={`nav-link ${({ isActive }) =>
                  isActive ? "active-style" : ""}`}
                aria-current="page"
                to="/categorias"
                end
              >
                Categorias
              </NavLink>
            </li>
          </ul>
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {usuarioLogeado.logeado ? linksLogeado() : linksDeslogeado()}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
