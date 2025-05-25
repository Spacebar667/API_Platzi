import { useParams } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { AppContext } from '../../contexto/contexto';
import { registrarCompra } from '../compras'; // Ajusta ruta según tu proyecto
import { supabase } from "../../supabase"; // Para obtener el usuario actual
import "./style.css";

function Producto() {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);
  const { favoritos, setFavoritos } = useContext(AppContext);
  const [usuarioId, setUsuarioId] = useState(null);

  useEffect(() => {
    fetch(`https://api.escuelajs.co/api/v1/products/${id}`)
      .then(res => res.json())
      .then(data => setProducto(data))
      .catch(err => console.error("Error:", err));
  }, [id]);

  useEffect(() => {
    async function obtenerUsuario() {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) setUsuarioId(user.id);
    }
    obtenerUsuario();
  }, []);

  const esFavorito = favoritos.some(p => p.id === Number(id));

  const toggleFavorito = () => {
    const actualizados = esFavorito
      ? favoritos.filter(p => p.id !== Number(id))
      : [...favoritos, { id: producto.id, title: producto.title, image: producto.images?.[0] }];
    setFavoritos(actualizados);
    localStorage.setItem('favoritos', JSON.stringify(actualizados));
  };

    const handleCompra = async () => {
  if (!usuarioId) return alert("Debes iniciar sesión para comprar.");
  try {
    await registrarCompra(producto, usuarioId);
    alert("Compra registrada exitosamente.");
  } catch (error) {
    console.error("Error detalle:", error);
    alert("Error al registrar la compra: " + (error?.message || "Error desconocido"));
  }
};



  if (!producto) return <p>Cargando producto...</p>;

  return (
    <div className="detalle-producto">
      <img src={producto.images?.[0]} alt={producto.title} width="200" />
      <h2>{producto.title}</h2>
      <p>{producto.description}</p>
      <p><strong>Precio:</strong> ${producto.price}</p>
      <button onClick={toggleFavorito}>
        {esFavorito ? '❤️ Quitar de favoritos' : '🤍 Agregar a favoritos'}
      </button>
      <button onClick={handleCompra} style={{ marginLeft: "1rem" }}>
        🛒 Comprar
      </button>
    </div>
  );
}

export default Producto;
