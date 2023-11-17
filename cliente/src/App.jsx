import Navbar from "./componentes/Navbar";
import { Routes, Route } from "react-router-dom";
import Inicio from "./paginas/Inicio";
import VerUsuarios from "./paginas/usuarios/VerUsuarios";
// import { useState } from "react";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Inicio />}></Route>
        <Route path="/usuarios" element={<VerUsuarios />} />
      </Routes>
    </>
  );
}

export default App;
