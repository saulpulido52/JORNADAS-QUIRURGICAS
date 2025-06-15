import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaEnvelope, FaLock, FaUserPlus } from 'react-icons/fa';

const RegisterPage = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleRegister = (e) => {
        e.preventDefault();
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const userExists = users.find(user => user.email === email);

        if (userExists) {
            setError('El correo electrónico ya está registrado.');
            return;
        }

        users.push({ email, password });
        localStorage.setItem('users', JSON.stringify(users));
        alert('¡Registro exitoso! Ahora puedes iniciar sesión.');
        navigate('/login');
    };

    return (
        <div className="bg-light d-flex align-items-center min-vh-100">
            <div className="container" style={{ maxWidth: '450px' }}>
                <div className="card shadow-sm">
                    <div className="card-body p-5">
                        <div className="text-center mb-4">
                            <FaUserPlus className="h1" style={{ color: '#6D243B' }} />
                            <h3 className="mt-2">Crear Cuenta</h3>
                        </div>
                        {error && <div className="alert alert-danger">{error}</div>}
                        <form onSubmit={handleRegister}>
                            <div className="input-group mb-3">
                                <span className="input-group-text"><FaEnvelope /></span>
                                <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="form-control" placeholder="Correo Electrónico" required />
                            </div>
                            <div className="input-group mb-4">
                                <span className="input-group-text"><FaLock /></span>
                                <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="form-control" placeholder="Contraseña" required />
                            </div>
                            <div className="d-grid">
                                <button type="submit" className="btn text-white" style={{ backgroundColor: '#6D243B' }}>Registrarse</button>
                            </div>
                        </form>
                        <p className="text-center mt-4">¿Ya tienes una cuenta? <Link to="/login">Inicia Sesión</Link></p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;