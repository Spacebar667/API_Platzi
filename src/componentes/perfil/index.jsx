import { useEffect, useState } from "react";
import { supabase } from "../../supabase"; // Ajusta la ruta si es necesario
import './style.css';

export default function Perfil() {
  const [usuario, setUsuario] = useState(null);
  const [form, setForm] = useState({
    nombre: "",
    correo: "",
    fecha_nacimiento: "",
    telefono: "",
    roll: "",
  });

  const [nuevaUrl, setNuevaUrl] = useState("");
  const [imagenes, setImagenes] = useState([]);

  useEffect(() => {
    async function fetchUsuario() {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data, error } = await supabase
          .from("usuario")
          .select("*")
          .eq("id", user.id)
          .single();
        if (error) {
          alert("Error al cargar datos del usuario");
          return;
        }
        setUsuario(data);
        setForm({
          nombre: data.nombre || "",
          correo: data.correo || "",
          fecha_nacimiento: data.fecha_nacimiento || "",
          telefono: data.telefono || "",
          roll: data.roll || "",
        });
        fetchImagenes(user.id);
      }
    }
    fetchUsuario();
  }, []);

  const fetchImagenes = async (usuarioid) => {
    const { data, error } = await supabase
      .from("multimedia")
      .select("*")
      .eq("usuarioid", usuarioid);
    if (!error) setImagenes(data);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    if (!usuario) return;
    const { error } = await supabase
      .from("usuario")
      .update({
        nombre: form.nombre,
        correo: form.correo,
        fecha_nacimiento: form.fecha_nacimiento,
        telefono: form.telefono,
        // roll no se suele actualizar desde aquí por seguridad
      })
      .eq("id", usuario.id);

    if (error) {
      alert("Error al actualizar datos");
    } else {
      alert("Datos actualizados correctamente");
    }
  };

  const handleAgregarUrl = async () => {
    if (!nuevaUrl.trim()) return alert("Por favor ingresa una URL válida");
    if (!usuario) return;

    const { error } = await supabase
      .from("multimedia")
      .insert([{ url: nuevaUrl, usuarioid: usuario.id }]);

    if (error) {
      alert("Error al agregar la imagen");
    } else {
      setNuevaUrl("");
      fetchImagenes(usuario.id);
    }
  };

  const handleEliminarImagen = async (id) => {
    const { error } = await supabase
      .from("multimedia")
      .delete()
      .eq("id", id);
    if (error) {
      alert("Error al eliminar la imagen");
    } else {
      setImagenes(imagenes.filter((img) => img.id !== id));
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUsuario(null);
    // Opcional: redirigir a login o página principal
  };

  if (!usuario) return <p>Cargando perfil...</p>;

    return (
    <div className="pf-container">
        <h2 className="pf-title">Perfil de Usuario</h2>
        <label className="pf-label" htmlFor="nombre">Nombre:</label>
        <input
        id="nombre"
        name="nombre"
        value={form.nombre}
        onChange={handleChange}
        className="pf-input"
        />

        <label className="pf-label" htmlFor="correo">Correo:</label>
        <input
        id="correo"
        name="correo"
        type="email"
        value={form.correo}
        onChange={handleChange}
        className="pf-input"
        disabled
        />

        <label className="pf-label" htmlFor="fecha_nacimiento">Fecha de nacimiento:</label>
        <input
        id="fecha_nacimiento"
        type="date"
        name="fecha_nacimiento"
        value={form.fecha_nacimiento}
        onChange={handleChange}
        className="pf-input"
        />

        <label className="pf-label" htmlFor="telefono">Teléfono:</label>
        <input
        id="telefono"
        name="telefono"
        value={form.telefono}
        onChange={handleChange}
        className="pf-input"
        />

        <label className="pf-label" htmlFor="roll">Rol:</label>
        <input
        id="roll"
        name="roll"
        value={form.roll}
        disabled
        className="pf-input"
        />

        <button onClick={handleUpdate} className="pf-button">
        Guardar cambios
        </button>

        <hr />

        <h3 className="pf-section-title">Agregar imagen</h3>
        <div style={{ display: 'flex', marginBottom: '1.5rem' }}>
        <input
            type="text"
            placeholder="URL de la imagen"
            value={nuevaUrl}
            onChange={(e) => setNuevaUrl(e.target.value)}
            className="pf-input-inline"
        />
        <button onClick={handleAgregarUrl} className="pf-button" style={{ width: 'auto', padding: '10px 15px' }}>
            Agregar
        </button>
        </div>

        <h3 className="pf-section-title">Imágenes guardadas</h3>
        <ul className="pf-image-list">
        {imagenes.map((img) => (
            <li key={img.id} className="pf-image-item">
            <img src={img.url} alt="Imagen guardada" className="pf-image" />
            <button onClick={() => handleEliminarImagen(img.id)} className="pf-image-button">
                Eliminar
            </button>
            </li>
        ))}
        </ul>

        <hr />

        <h2 className="pf-title">Quiero cerrar sesión</h2>
        <button onClick={handleLogout} className="pf-button pf-logout-button">
        Cerrar sesión
        </button>

        <div style={{ height: 100 }} />
    </div>
    );
}
