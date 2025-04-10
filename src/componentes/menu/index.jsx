import { NavLink } from 'react-router-dom';
import './style.css';

function Menu() {
    return (
        <nav className="c-menu">
            <NavLink to="/" className="c-link">Inicio</NavLink>
            <NavLink to="/usuarios" className="c-link">Usuarios</NavLink>
            <NavLink to="/productos" className="c-link">Productos</NavLink>
            <NavLink to="/categorias" className="c-link">Categorías</NavLink>
        </nav>
    );
}

export default Menu;
