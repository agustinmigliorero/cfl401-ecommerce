import { useState, useEffect } from "react";
import Card from "../../componentes/Card";

function VerCategoria() {
  const [categoria, setCategoria] = useState({});
  const { id } = useParams();

  async function cargarCategoria(id) {
    const respuesta = await fetch(`http://localhost:3000/categorias/${id}`);
    const categoriaFetch = await respuesta.json();
    setCategoria(categoriaFetch);
  }

  useEffect(() => {
    cargarCategoria(id);
  });

  const contenido = categoria.publicaciones.map((publicacion) => {
    return (
      <Card
        key={publicacion._id}
        titulo={publicacion.titulo}
        textoCard={publicacion.texto}
        textoBoton="Ver publicacion"
        linkBoton={`/publicaciones/${publicacion._id}`}
      />
    );
  });

  return (
    <>
      <h1>{categoria.nombre}</h1>
      {contenido}
    </>
  );
}

export default VerCategoria;
