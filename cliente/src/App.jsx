import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Inicio from "./paginas/Inicio";
import IndexUsuarios from "./paginas/usuarios/IndexUsuarios.jsx";
import VerUsuario from "./paginas/usuarios/VerUsuario.jsx";
import Boton from "./componentes/Boton";
import { Route, Routes } from "react-router-dom";
import Navbar from "./componentes/Navbar.jsx";
import CrearUsuario from "./paginas/usuarios/CrearUsuario.jsx";

function App() {
  const [pagina, setPagina] = useState("Inicio");

  function eventoClick(nuevaPagina) {
    setPagina(nuevaPagina);
  }
  return (
    <>
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/usuarios" element={<IndexUsuarios />} />
        <Route path="/usuarios/registrarse" element={<CrearUsuario />} />
        <Route path="/usuarios/:id" element={<VerUsuario />} />
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
