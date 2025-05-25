import { useEffect, useState } from 'react';
import { obtenerComprasUsuario } from '../compras';
import './style.css';

export default function HistorialCompras({ usuarioId }) {
  const [compras, setCompras] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function cargarCompras() {
      setLoading(true);
      const comprasData = await obtenerComprasUsuario(usuarioId);
      setCompras(comprasData);
      setLoading(false);
    }

    if (usuarioId) {
      cargarCompras();
    }
  }, [usuarioId]);

  if (loading) return <p>Cargando historial de compras...</p>;
  if (compras.length === 0) return <p>No tienes compras registradas.</p>;

  return (
    <div className="hc-container">
      <h2 className="hc-title">Historial de Compras</h2>
      <ul className="hc-list">
        {compras.map((compra) => (
          <li key={compra.id} className="hc-list-item">
            <img
              src={compra.imagen}
              alt={compra.nombre}
              className="hc-product-image"
              style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '8px' }}
            />
            <div className="hc-product-info">
              <span className="hc-product-name">{compra.nombre}</span>
              <span className="hc-product-price"> - ${Number(compra.precio).toFixed(2)}</span>
              <br />
              <span className="hc-purchase-date">
                Comprado el: {new Date(compra.fecha_compra).toLocaleDateString()}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
