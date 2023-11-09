function Boton(props) {
    return (
        <button style={{background: "#ffaaaa"}} onClick={props.eventoClick}>{props.texto}</button>
    )
}

export default Boton