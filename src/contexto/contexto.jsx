// src/contexto/contexto.jsx
import { createContext, useState, useEffect } from "react";

export const AppContext = createContext();

export function AppProvider({ children }) {
  const [data, setData] = useState([]);

  const [favoritos, setFavoritos] = useState(() => {
    const local = localStorage.getItem('favoritos');
    return local ? JSON.parse(local) : [];
  });

  const [comprados, setComprados] = useState(() => {
    const local = localStorage.getItem('comprados');
    return local ? JSON.parse(local) : [];
  });

  const [aleatorios, setAleatorios] = useState([]);

  useEffect(() => {
    fetch("https://api.escuelajs.co/api/v1/products")
      .then(res => res.json())
      .then(setData)
      .catch(err => console.error("Error cargando productos:", err));
  }, []);

  useEffect(() => {
    localStorage.setItem('favoritos', JSON.stringify(favoritos));
  }, [favoritos]);

  useEffect(() => {
    localStorage.setItem('comprados', JSON.stringify(comprados));
  }, [comprados]);

  return (
    <AppContext.Provider value={{
      data,
      favoritos,
      setFavoritos,
      comprados,
      setComprados,
      aleatorios,
      setAleatorios
    }}>
      {children}
    </AppContext.Provider>
  );
}
