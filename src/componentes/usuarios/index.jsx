import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './style.css';

function Usuarios() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("https://api.escuelajs.co/api/v1/users")
      .then(response => response.json())
      .then(responseData => setData(responseData))
      .catch(error => console.error("Error:", error));
  }, []);

  return (
    <section className="c-lista-u">
      {data.map((user) => (
        <Link to={`/usuarios/${user.id}`} key={user.id} className="c-lista-usuario">
          <img
            src={user.avatar}
            alt={`Avatar de ${user.name}`}
            width="auto"
            height="60"
            loading="lazy"
          />
          <p><strong>Nombre:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Creado:</strong> {new Date(user.creationAt).toLocaleDateString()}</p>
        </Link>
      ))}
    </section>
  );
}

export default Usuarios;
