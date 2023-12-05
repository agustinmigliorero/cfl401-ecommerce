import { useState, useEffect } from "react";
import Card from "../../componentes/Card";

function VerCategorias() {
  const [categorias, setCategorias] = useState([{}]);

  async function cargarCategorias() {
    const respuesta = await fetch("http://localhost:3000/categorias");
    const categoriasFetch = await respuesta.json();
    setCategorias(categoriasFetch);
  }

  useEffect(() => {
    cargarCategorias();
  }, []);

  const contenido = categorias.map((categoria, index) => {
    return (
      <Card
        key={`${categoria._id}`}
        titulo={categoria.nombre}
        textoCard={categoria.descripcion}
        textoBoton="Ver publicaciones"
        linkBoton={`/categorias/${categoria._id}`}
      />
    );
  });

  return (
    <>
      <h1>Categorias</h1>
      {contenido}
    </>
  );
}

export default VerCategorias;
