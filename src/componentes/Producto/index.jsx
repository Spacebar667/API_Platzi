import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import "./style.css";

function Producto() {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);
  const [favoritos, setFavoritos] = useState(() => {
    const local = localStorage.getItem('favoritos');
    return local ? JSON.parse(local) : [];
  });

  const esFavorito = favoritos.some(p => p.id === Number(id));

  useEffect(() => {
    fetch(`https://api.escuelajs.co/api/v1/products/${id}`)
      .then(res => res.json())
      .then(data => setProducto(data))
      .catch(err => console.error("Error:", err));
  }, [id]);

  const toggleFavorito = () => {
    let actualizados;
    if (esFavorito) {
      actualizados = favoritos.filter(p => p.id !== Number(id));
    } else {
      actualizados = [...favoritos, { id: producto.id, title: producto.title }];
    }

    setFavoritos(actualizados);
    localStorage.setItem('favoritos', JSON.stringify(actualizados));
  };

  if (!producto) return <p>Cargando producto...</p>;

  return (
    <div className="detalle-producto">
      <img src={producto.images?.[0]} alt={producto.title} width="200" />
      <h2>{producto.title}</h2>
      <p>{producto.description}</p>
      <p><strong>Precio:</strong> ${producto.price}</p>
      <button onClick={toggleFavorito}>
        {esFavorito ? '❤️ Quitar de favoritos' : '🤍 Agregar a favoritos'}
      </button>
    </div>
  );
}

export default Producto;
