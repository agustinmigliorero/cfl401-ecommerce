function Boton(props) {
  return (
    <button style={{ background: "#ffaaff" }} onClick={props.eventoClick}>
      {props.texto}
    </button>
  );
}

export default Boton;
