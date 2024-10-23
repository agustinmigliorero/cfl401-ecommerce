import { useState } from "react";
import Boton from "../Boton";

function CrearComentario({ fetchCrearComentario }) {
  const [textoComentario, setTextoComentario] = useState("");
  const [puntuacionComentario, setPuntuacionComentario] = useState(5);

  const handleChangeTexto = (evento) => {
    setTextoComentario(evento.target.value);
  };

  const handleChangePuntuacion = (evento) => {
    setPuntuacionComentario(evento.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchCrearComentario(textoComentario, puntuacionComentario);
    setTextoComentario("");
    setPuntuacionComentario(5);
  };

  return (
    <>
      <h1>Crear Comentario</h1>
      <form>
        <textarea
          type="text"
          onChange={handleChangeTexto}
          value={textoComentario}
          placeholder="Comentario"
          name="textoComentario"
          cols="80"
          rows="6"
        ></textarea>
        <br />
        <label htmlFor="puntuacion">Puntuacion:</label>
        <input
          name="puntuacion"
          type="number"
          placeholder="Puntuacion"
          min={1}
          max={5}
          onChange={handleChangePuntuacion}
          value={puntuacionComentario}
        />
        <br />
        <Boton texto="Comentar" eventoClick={handleSubmit} />
      </form>
    </>
  );
}

export default CrearComentario;
