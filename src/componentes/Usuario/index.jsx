import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './style.css';

function Usuario() {
  const { id } = useParams();
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    fetch(`https://api.escuelajs.co/api/v1/users/${id}`)
      .then(response => response.json())
      .then(data => setUsuario(data))
      .catch(error => console.error("Error al obtener el usuario:", error));
  }, [id]);

  if (!usuario) {
    return <p>Cargando usuario...</p>;
  }

  return (
    <div className="c-usuario-detalle">
      <img src={usuario.avatar} alt={`Avatar de ${usuario.name}`} width="120" />
      <h2>{usuario.name}</h2>
      <p><strong>Email:</strong> {usuario.email}</p>
      <p><strong>Rol:</strong> {usuario.role}</p>
      <p><strong>Creado:</strong> {new Date(usuario.creationAt).toLocaleDateString()}</p>
    </div>
  );
}

export default Usuario;
