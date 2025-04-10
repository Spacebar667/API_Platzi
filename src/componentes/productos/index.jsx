import { useState, useEffect} from 'react'


import './style.css'

function Productos() {
  
   const [data, setData] = useState([]);
  
    useEffect(() => {
      fetch("https://api.escuelajs.co/api/v1/products")
        .then(response => response.json())
        .then(responseData => setData(responseData))
        .catch(error => console.error("Error:", error));
    }, []);
  
    return (
      <section className='c-lista'>
        {data.map((product) => (
          <div className='c-lista-productos' key={product.id}>
            <img
              src={product.images[0]}
              alt={`Producto ${product.title}`}
              width='auto'
              height='60'
              loading='lazy'
            />
            <p>{product.title}</p>
            <p><strong>Precio:</strong> ${product.price}</p>
          </div>
        ))}
      </section>
    );
}

export default Productos