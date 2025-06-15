import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext'; // <-- Usa el hook

const ProtectedRoute = ({ children }) => {
    const { user } = useAuth(); // <-- Obtiene el usuario del cerebro

    if (!user) {
        // Si no hay usuario en el cerebro, redirige al login
        return <Navigate to="/login" />;
    }

    return children;
};

export default ProtectedRoute;