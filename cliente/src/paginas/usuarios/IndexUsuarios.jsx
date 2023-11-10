import VerUsuarios from "./VerUsuarios";
import VerUsuario from "./VerUsuario";
import { useState } from "react";
import Boton from "../../componentes/Boton";
import Navbar from "../../componentes/Navbar";

function IndexUsuarios() {
  const [pagina, setPagina] = useState("VerUsuarios");
  const [idUsuario, setIdUsuario] = useState("");

  function eventoClick(nuevaPagina) {
    setPagina(nuevaPagina);
  }

  return (
    <>
      <Navbar paginaActiva="Usuarios" />
      <VerUsuarios />
    </>
  );
}

export default IndexUsuarios;
