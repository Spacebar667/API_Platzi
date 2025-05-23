import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../contexto/contexto";
import './style.css';

function Aleatorios() {
  const {
    data,
    aleatorios,
    setAleatorios,
    comprados,
    setComprados
  } = useContext(AppContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (data.length > 0) {
      generarAleatorios();
    }
  }, [data]);

  const generarAleatorios = () => {
    let seleccion = [];
    const usados = new Set();

    while (seleccion.length < 4) {
      const index = Math.floor(Math.random() * data.length);
      if (!usados.has(index)) {
        const producto = data[index];
        seleccion.push(producto);
        usados.add(index);
      }
    }

    setAleatorios(seleccion);

    // ✅ Agregar a la lista de comprados si aún no están
    const nuevosComprados = [...comprados];
    seleccion.forEach(producto => {
      if (!nuevosComprados.some(p => p.id === producto.id)) {
        nuevosComprados.push(producto);
      }
    });
    setComprados(nuevosComprados);
  };

  return (
    <section className="c-aleatorio c-lista">
      {aleatorios.map((producto) => (
        <div
          className="c-lista-producto c-un_aleatorio"
          key={producto.id}
          onClick={() => navigate(`/producto/${producto.id}`)}
        >
          <img
            src={producto.images[0]}
            alt={`Producto ${producto.title}`}
            width="60"
            height="60"
          />
          <p>{producto.title}</p>
        </div>
      ))}
      <button onClick={generarAleatorios}>Generar nuevos</button>
    </section>
  );
}

export default Aleatorios;
