import { useState, useEffect } from 'react'

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
        <div className="c-lista-usuario" key={user.id}>
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
        </div>
      ))}
    </section>
  );
}

export default Usuarios;