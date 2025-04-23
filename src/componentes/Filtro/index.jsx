import { useEffect, useState } from 'react';

function Filtro({ onCategoriaChange }) {
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    const obtenerCategorias = async () => {
      try {
        const res = await fetch('https://api.escuelajs.co/api/v1/categories');
        const json = await res.json();
        setCategorias(json);
      } catch (error) {
        console.error('Error al obtener categorías:', error);
      }
    };

    obtenerCategorias();
  }, []);

  return (
    <div className="c-filtro">
      <select onChange={(e) => onCategoriaChange(e.target.value)}>
        <option value="All">Todas</option>
        {categorias.map((categoria) => (
          <option key={categoria.id} value={categoria.name}>
            {categoria.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Filtro;
