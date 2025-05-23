import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { AppProvider } from "./contexto/contexto";

import "./App.css";
import { supabase } from "./supabase";

import Menu from "./componentes/menu";
import Inicio from "./componentes/inicio";
import Productos from "./componentes/productos";
import Usuarios from "./componentes/usuarios";   // Lista o gestión de usuarios
import Usuario from "./componentes/Usuario";     // Detalle usuario por id
import Perfil from "./componentes/perfil";      // Perfil propio del usuario (nuevo)
import Categorias from "./componentes/categorias";
import Producto from "./componentes/Producto";
import Categoria from "./componentes/Categoria";
import Favoritos from "./componentes/Favoritos";
import Aleatorios from "./componentes/aleatorios";
import Comprados from "./componentes/comprados";
import Login from "./componentes/login";
import Registro from "./componentes/registro";
import Administrador from "./componentes/administrador";
import HistorialCompras from "./componentes/historialcompras";

function App() {
  const [usuario, setUsuario] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    async function verificarSesion() {
      const { data: { session } } = await supabase.auth.getSession();
      setUsuario(session?.user || null);
      setCargando(false);
    }
    verificarSesion();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUsuario(session?.user || null);
    });

    return () => {
      listener?.subscription.unsubscribe();
    };
  }, []);

  if (cargando) return <p>Cargando...</p>;

  return (
    <AppProvider>
      <Router>
        {usuario && <Menu />}

        <Routes>
          {/* Rutas privadas */}
          <Route path="/" element={usuario ? <Inicio /> : <Navigate to="/login" />} />
          <Route path="/productos" element={usuario ? <Productos /> : <Navigate to="/login" />} />
          <Route path="/usuarios" element={usuario ? <Usuarios /> : <Navigate to="/login" />} />
          <Route path="/usuarios/:id" element={usuario ? <Usuario /> : <Navigate to="/login" />} />
          <Route path="/perfil" element={usuario ? <Perfil /> : <Navigate to="/login" />} />
          <Route path="/categorias" element={usuario ? <Categorias /> : <Navigate to="/login" />} />
          <Route path="/producto/:id" element={usuario ? <Producto /> : <Navigate to="/login" />} />
          <Route path="/categorias/:id" element={usuario ? <Categoria /> : <Navigate to="/login" />} />
          <Route path="/favoritos" element={usuario ? <Favoritos /> : <Navigate to="/login" />} />
          <Route path="/aleatorios" element={usuario ? <Aleatorios /> : <Navigate to="/login" />} />
          <Route path="/comprados" element={usuario ? <Comprados /> : <Navigate to="/login" />} />
          <Route path="/historialcompras" element={usuario ? <HistorialCompras usuarioId={usuario.id} /> : <Navigate to="/login" />} />


          {/* Rutas públicas */}
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/administrador" element={<Administrador />} />
          
          {/* Ruta por defecto a login si no hay match y no está autenticado */}
          <Route path="*" element={<Navigate to={usuario ? "/" : "/login"} />} />
        </Routes>
      </Router>
    </AppProvider>
  );
}

export default App;
