import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Inicio from './paginas/Inicio'
import VerUsuario from './paginas/usuarios/VerUsuario'
import VerUsuarios from './paginas/usuarios/VerUsuarios'
import Boton from './componentes/Boton'

function App() {
  const [pagina, setPagina] = useState("Inicio");

  function eventoClick(nuevaPagina) {
    setPagina(nuevaPagina);
  }
  return (
    <>
      <Boton texto="Inicio" eventoClick={() => {eventoClick("Inicio")}} />
      <Boton texto="VerUsuario" eventoClick={() => {eventoClick("VerUsuario")}} />
      <Boton texto="VerUsuarios" eventoClick={() => {eventoClick("VerUsuarios")}} />
      {pagina === "Inicio" && <Inicio />}
      {pagina === "VerUsuario" && <VerUsuario />}
      {pagina === "VerUsuarios" && <VerUsuarios />}
    </>
  )
}

export default App
