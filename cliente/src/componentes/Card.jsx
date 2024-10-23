import { Link } from "react-router-dom";

function Card({ titulo, textoCard, textoBoton, linkBoton }) {
  return (
    <div className="card" style={{ width: "18rem" }}>
      <div className="card-body">
        <h5 className="card-title">{titulo}</h5>
        <p className="card-text">{textoCard}</p>
        <Link to={linkBoton} className="btn btn-primary">
          {textoBoton}
        </Link>
      </div>
    </div>
  );
}

export default Card;
