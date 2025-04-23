import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './style.css';

function Categoria() {
  const { id } = useParams();
  const [categoria, setCategoria] = useState(null);

  useEffect(() => {
    fetch(`https://api.escuelajs.co/api/v1/categories/${id}`)
      .then(res => res.json())
      .then(data => setCategoria(data))
      .catch(err => console.error("Error al obtener categoría:", err));
  }, [id]);

  if (!categoria) return <p>Cargando categoría...</p>;

  return (
    <div className="c-categoria-detalle">
      <img src={categoria.image} alt={categoria.name} width="120" />
      <h2>{categoria.name}</h2>
      <p><strong>ID:</strong> {categoria.id}</p>
    </div>
  );
}

export default Categoria;
