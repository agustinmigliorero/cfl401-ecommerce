import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Inicio from './paginas/Inicio'
import IndexUsuarios from './paginas/usuarios/IndexUsuarios.jsx'
import Boton from './componentes/Boton'

function App() {
  const [pagina, setPagina] = useState("Inicio");

  function eventoClick(nuevaPagina) {
    setPagina(nuevaPagina);
  }
  return (
    <>
      <Boton texto="Inicio" eventoClick={() => {eventoClick("Inicio")}} />
      <Boton texto="Ver Usuarios" eventoClick={() => {eventoClick("IndexUsuarios")}} />
      {pagina === "Inicio" && <Inicio />}
      {pagina === "IndexUsuarios" && <IndexUsuarios />}
    </>
  )
}

export default App
