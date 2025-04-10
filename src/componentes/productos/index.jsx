import { useState, useEffect } from 'react';
import './style.css';

function Productos() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("https://api.escuelajs.co/api/v1/products")
      .then(response => response.json())
      .then(responseData => setData(responseData))
      .catch(error => console.error("Error:", error));
  }, []);

  return (
    <section className='c-lista-p'>
      {data.map((product) => (
        <div className='c-lista-productos' key={product.id}>
          <img
            src={product.images[0]}
            alt={`Producto ${product.title}`}
            loading='lazy'
          />
          <h3>{product.title}</h3>
          <p><strong>Precio:</strong> ${product.price}</p>
          <p className="descripcion">
            {product.description.length > 100
                ? product.description.slice(0, 100) + '...'
                : product.description}
            </p>
        </div>
      ))}
    </section>
  );
}

export default Productos;
