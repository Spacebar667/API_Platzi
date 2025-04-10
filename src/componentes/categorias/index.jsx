import { useState, useEffect} from 'react'


import './style.css'

function Categorias() {

    const [data, setData] = useState([]);

    useEffect(() => {
        fetch("https://api.escuelajs.co/api/v1/categories")
        .then(response => response.json())
        .then(responseData => setData(responseData))
        .catch(error => console.error("Error:", error));
    }, []);

  return (
    <section className='c-lista-c'>
      {data.map((category) => (
        <div className='c-lista-categorias' key={category.id}>
          <img
            src={category.image}
            alt={`Categoría ${category.name}`}
            width='auto'
            height='60'
            loading='lazy'
          />
          <p><strong>Nombre:</strong> {category.name}</p>
          <p><strong>Slug:</strong> {category.slug}</p>
          <p><strong>Creado:</strong> {new Date(category.creationAt).toLocaleDateString()}</p>
        </div>
      ))}
    </section>
  );
}

export default Categorias