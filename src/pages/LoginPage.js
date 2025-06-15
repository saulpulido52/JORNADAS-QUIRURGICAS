import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../components/AuthContext'; // <-- Usa el hook
import { FaEnvelope, FaLock, FaSignInAlt } from 'react-icons/fa';

const LoginPage = () => {
    const navigate = useNavigate();
    const { login } = useAuth(); // <-- Obtiene la función de login del contexto
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        const success = login(email, password); // Llama a la función de login del contexto
        if (success) {
            navigate('/mis-solicitudes'); // Redirige al iniciar sesión
        } else {
            setError('Correo o contraseña incorrectos.');
        }
    };

    // ... El resto del return se mantiene igual
    return (
        <div className="bg-light d-flex align-items-center min-vh-100">
            <div className="container" style={{ maxWidth: '450px' }}>
                <div className="card shadow-sm"><div className="card-body p-5">
                    <div className="text-center mb-4"><FaSignInAlt className="h1" style={{ color: '#6D243B' }} /><h3 className="mt-2">Iniciar Sesión</h3></div>
                    {error && <div className="alert alert-danger">{error}</div>}
                    <form onSubmit={handleLogin}>
                        <div className="input-group mb-3"><span className="input-group-text"><FaEnvelope /></span><input type="email" value={email} onChange={e => setEmail(e.target.value)} className="form-control" placeholder="Correo Electrónico" required /></div>
                        <div className="input-group mb-4"><span className="input-group-text"><FaLock /></span><input type="password" value={password} onChange={e => setPassword(e.target.value)} className="form-control" placeholder="Contraseña" required /></div>
                        <div className="d-grid"><button type="submit" className="btn text-white" style={{ backgroundColor: '#6D243B' }}>Ingresar</button></div>
                    </form>
                    <p className="text-center mt-4">¿No tienes una cuenta? <Link to="/register">Crea una aquí</Link></p>
                </div></div>
            </div>
        </div>
    );
};
export default LoginPage;