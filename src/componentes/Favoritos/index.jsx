import { useContext } from 'react';
import { AppContext } from '../../contexto/contexto';
import { useNavigate } from "react-router-dom";

import './style.css';

function Favoritos() {
  const { favoritos } = useContext(AppContext);
  const navigate = useNavigate();

  return (
    <>
      {favoritos.length === 0 ? (
        <p>No hay productos favoritos aún.</p>
      ) : (
        <div className="c-favoritos-container">
          {favoritos.map((producto, index) => (
            <div 
              className="c-favorito-card" 
              key={index}
              onClick={() => navigate(`/producto/${producto.id}`)}
            >
              <img src={producto.image} alt={`Producto ${producto.title}`} />
              <h3>{producto.title}</h3>
            </div>
          ))}
        </div>
      )}
    </>
  );
}


export default Favoritos;
