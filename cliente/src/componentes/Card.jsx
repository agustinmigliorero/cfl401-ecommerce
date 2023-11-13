function Card({ titulo, textoCard, textoBoton }) {
  return (
    <div className="card" style="width: 18rem;">
      <div className="card-body">
        <h5 className="card-title">{titulo}</h5>
        <p className="card-text">{textoCard}</p>
        <a href="#" className="btn btn-primary">
          {textoBoton}
        </a>
      </div>
    </div>
  );
}

export default Card;
