import { useState, useEffect } from "react";

function VerUsuarios() {
  const [usuarios, setUsuarios] = useState([{}]);

  async function cargarUsuarios() {
    const response = await fetch("http://localhost:3000/usuarios");
    const data = await response.json();
    setUsuarios(data);
    console.log(data);
  }

  useEffect(() => {
    cargarUsuarios();
    console.log(usuarios);
  }, []);

  return (
    <>
      <h1>Ver usuarios</h1>
      <h2>{usuarios[0].nombre}</h2>
      <h2>{usuarios[0].apellido}</h2>
    </>
  );
}

export default VerUsuarios;
