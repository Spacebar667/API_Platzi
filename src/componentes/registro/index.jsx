import { useState } from 'react';
import { supabase } from '../../supabase'; // Ajusta la ruta según tu proyecto
import { useNavigate } from 'react-router-dom';

function Registro() {
  const [formulario, setFormulario] = useState({
    nombre: '',
    correo: '',
    password: '',
    fechaNacimiento: '',
    telefono: '',
  });

  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormulario({ ...formulario, [e.target.name]: e.target.value });
  };

  const handleRegistro = async (e) => {
    e.preventDefault();
    setError(null);

    // 1. Crear usuario en Auth
    const { data, error: errorAuth } = await supabase.auth.signUp({
      email: formulario.correo,
      password: formulario.password,
    });

    if (errorAuth) {
      setError(errorAuth.message);
      return;
    }

    const uid = data.user.id;

    // 2. Insertar en tabla "usuario"
    const { error: errorInsert } = await supabase.from("usuario").insert([
      {
        id: uid,
        nombre: formulario.nombre,
        correo: formulario.correo,
        fecha_nacimiento: formulario.fechaNacimiento,
        telefono: formulario.telefono,
        roll: "usuario",
      },
    ]);

    if (errorInsert) {
      setError("Usuario creado, pero error en tabla usuario: " + errorInsert.message);
    } else {
      navigate("/login");
    }
  };

  return (
    <section style={{ maxWidth: 400, margin: 'auto', padding: 20 }}>
      <h2>Registro</h2>
      <form onSubmit={handleRegistro}>
        <input
          type="text"
          name="nombre"
          placeholder="Nombre"
          value={formulario.nombre}
          onChange={handleChange}
          required
          style={{ width: "100%", padding: 8, marginBottom: 10 }}
        />
        <input
          type="email"
          name="correo"
          placeholder="Correo"
          value={formulario.correo}
          onChange={handleChange}
          required
          style={{ width: "100%", padding: 8, marginBottom: 10 }}
        />
        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          value={formulario.password}
          onChange={handleChange}
          required
          style={{ width: "100%", padding: 8, marginBottom: 10 }}
        />
        <input
          type="date"
          name="fechaNacimiento"
          value={formulario.fechaNacimiento}
          onChange={handleChange}
          required
          style={{ width: "100%", padding: 8, marginBottom: 10 }}
        />
        <input
          type="text"
          name="telefono"
          placeholder="Teléfono"
          value={formulario.telefono}
          onChange={handleChange}
          required
          style={{ width: "100%", padding: 8, marginBottom: 10 }}
        />
        <button type="submit" style={{ padding: 10, width: "100%" }}>
          Registrarse
        </button>
      </form>
      {error && <p style={{ color: "red", marginTop: 10 }}>{error}</p>}
      <div style={{ marginTop: 20 }}>
        <p>¿Ya tienes cuenta? Puedes iniciar sesión</p>
        <button onClick={() => navigate("/login")}>Login</button>
      </div>
    </section>
  );
}

export default Registro;
