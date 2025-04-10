import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import './App.css'
import Menu from './componentes/menu';
import Inicio from './componentes/inicio';
import Productos from './componentes/productos';
import Usuarios from './componentes/usuarios';
import Categorias from './componentes/categorias';


function App() {

  return (
    <Router>

    <Menu />

      <Routes>
        <Route path="/" element ={<Inicio/>} />
        <Route path="/productos" element ={<Productos/>} />
        <Route path="/usuarios" element ={<Usuarios/>} />
        <Route path="/categorias" element ={<Categorias/>} />
      </Routes>
    </Router>
  );
}

export default App
