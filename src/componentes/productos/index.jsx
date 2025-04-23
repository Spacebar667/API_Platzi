import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Filtro from '../Filtro';
import './style.css';

function Productos() {
  const [data, setData] = useState([]);
  const [categoria, setCategoria] = useState('All');
  const [busqueda, setBusqueda] = useState('');

  useEffect(() => {
    const obtenerProductos = async () => {
      try {
        const res = await fetch('https://api.escuelajs.co/api/v1/products');
        const json = await res.json();
        setData(json);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    obtenerProductos();
  }, []);

  // 🔍 Filtrado por categoría
  const productosFiltradosPorCategoria =
    categoria === 'All'
      ? data
      : data.filter(producto => producto.category?.name === categoria);

  // 🔍 Filtrado por búsqueda
  const resultados = productosFiltradosPorCategoria.filter(producto =>
    producto.title.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <>
      {/* 🔍 Barra de búsqueda */}
      <input
        type="text"
        placeholder="Buscar producto"
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        className="c-buscador"
      />

      {/* 🎯 Filtro por categoría */}
      <Filtro onCategoriaChange={setCategoria} />

      {/* 📦 Renderizado de productos */}
      <section className="c-lista-p">
        {resultados.map((product) => (
          <Link to={`/producto/${product.id}`} className="c-lista-productos" key={product.id}>
            <img
              src={product.images[0]}
              alt={product.title}
              height="80"
              loading="lazy"
            />
            <p>{product.title}</p>
            <p><strong>Precio:</strong> ${product.price}</p>
            <p className="descripcion">
              {product.description.length > 100
                ? product.description.slice(0, 100) + '...'
                : product.description}
            </p>
          </Link>
        ))}
      </section>
    </>
  );
}

export default Productos;
