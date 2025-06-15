import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext'; // <-- Usa el nuevo hook
import { FaHeartbeat, FaSignOutAlt } from 'react-icons/fa';

const Navbar = () => {
    const { user, logout } = useAuth(); // <-- Obtiene el usuario y la función de logout del "cerebro"
    const navigate = useNavigate();

    const handleLogout = () => {
        logout(); // Llama a la función de logout del contexto
        navigate('/');
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark shadow-sm" style={{ backgroundColor: '#2A5C50' }}>
            <div className="container">
                <NavLink className="navbar-brand d-flex align-items-center" to="/">
                    <FaHeartbeat className="me-2" />
                    Jornadas Quirúrgicas IMSS
                </NavLink>
                <div className="navbar-nav d-flex flex-row align-items-center">
                    <NavLink className="nav-link me-3" to="/">Inicio</NavLink>
                    {user ? ( // <-- La lógica ahora es mucho más limpia: ¿existe el usuario?
                        <>
                            <NavLink className="nav-link me-3" to="/mis-solicitudes">Mis Solicitudes</NavLink>
                            <button onClick={handleLogout} className="btn btn-outline-light d-flex align-items-center">
                                <FaSignOutAlt className="me-1" /> Cerrar Sesión
                            </button>
                        </>
                    ) : (
                        <NavLink className="btn btn-outline-light" to="/login">Iniciar Sesión</NavLink>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;