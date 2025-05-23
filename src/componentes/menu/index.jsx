import { NavLink } from 'react-router-dom';
import './style.css';

function Menu() {
    return (
        <nav className="c-menu">
            <NavLink to="/" className="c-link">Inicio</NavLink>
            <NavLink to="/usuarios" className="c-link">Usuarios</NavLink>
            <NavLink to="/productos" className="c-link">Productos</NavLink>
            <NavLink to="/categorias" className="c-link">Categorías</NavLink>
            <NavLink to="/favoritos" className="c-link">Favoritos</NavLink>
            <NavLink to="/aleatorios" className="c-link">Aleatorios</NavLink>
            <NavLink to="/comprados" className="c-link">Comprados</NavLink>
            <NavLink to="/perfil" className="c-link">Perfil</NavLink>
            <NavLink to="/historialcompras" className="c-link">Historial</NavLink>
        </nav>
    );
}

export default Menu;
