import { useContext } from 'react';
import { useNavigate } from "react-router-dom";
import { AppContext } from '../../contexto/contexto';
import "./style.css";

function Comprados() {
  const { comprados, data } = useContext(AppContext);
  const totalProductos = data.length;
  const navigate = useNavigate();

  // Crear un array de IDs comprados para comparación fácil
  const compradosIds = comprados.map(p => p.id);

  // Crear array de todos los IDs del 1 a totalProductos
  const espacio = Array.from({ length: totalProductos }, (_, i) => data[i]?.id);

  return (
    <>
      <p>{comprados.length} / {totalProductos} productos comprados</p>
      <section className="c-aleatorio c-lista">
        {espacio.map((id, idx) => (
          <div
            key={id || idx}
            className={compradosIds.includes(id) ? "c-unpoke c-mios-producto" : "c-unpoke"}
            onClick={() => compradosIds.includes(id) ? navigate(`/producto/${id}`) : null}
          >
            {compradosIds.includes(id) ? (
              <img
                src={data.find(p => p.id === id)?.images?.[0]}
                alt={`Producto ${id}`}
                width="auto"
                height="45"
                loading="lazy"
              />
            ) : null}

            <p>{id}</p>
          </div>
        ))}
      </section>
    </>
  );
}

export default Comprados;
