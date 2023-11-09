import VerUsuarios from "./VerUsuarios";
import VerUsuario from "./VerUsuario";
import { useState } from "react";
import Boton from "../../componentes/Boton";

function IndexUsuarios() {
  const [pagina, setPagina] = useState("VerUsuarios");
  const [idUsuario, setIdUsuario] = useState("");

  function eventoClick(nuevaPagina) {
    setPagina(nuevaPagina);
  }

  return (
    <>
      {pagina === "VerUsuarios" && (
        <VerUsuarios setPagina={setPagina} setIdUsuario={setIdUsuario} />
      )}
      {pagina === "VerUsuario" && (
        <VerUsuario id={idUsuario} setPagina={setPagina} />
      )}
    </>
  );
}

export default IndexUsuarios;
