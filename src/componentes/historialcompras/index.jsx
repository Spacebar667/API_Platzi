import { useEffect, useState } from 'react';
import { obtenerComprasUsuario } from '../compras';// Ajusta la ruta según tu estructura
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
          <span className="hc-product-name">{compra.producto.nombre}</span>
          <span className="hc-product-price"> - ${compra.producto.precio.toFixed(2)}</span>
          <br />
          <span className="hc-purchase-date">
            Comprado el: {new Date(compra.fecha_compra).toLocaleDateString()}
          </span>
          <p className="hc-product-description">{compra.producto.descripcion}</p>
        </li>
      ))}
    </ul>
  </div>
);

}
