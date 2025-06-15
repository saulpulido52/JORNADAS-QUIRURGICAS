import React, { createContext, useState, useContext, useEffect } from 'react';

// 1. Creamos el Contexto
const AuthContext = createContext(null);

// 2. Creamos el Proveedor del Contexto (el componente que contendrá la lógica)
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    // Al cargar la app, revisa si hay un usuario en localStorage para mantener la sesión
    useEffect(() => {
        const storedUser = localStorage.getItem('loggedInUser');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    // Función para iniciar sesión
    const login = (email, password) => {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const foundUser = users.find(u => u.email === email && u.password === password);
        if (foundUser) {
            localStorage.setItem('loggedInUser', JSON.stringify(foundUser));
            setUser(foundUser);
            return true;
        }
        return false;
    };

    // Función para cerrar sesión
    const logout = () => {
        localStorage.removeItem('loggedInUser');
        setUser(null);
    };

    // Los valores que queremos que estén disponibles para toda la app
    const value = { user, login, logout };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// 3. Creamos un "hook" personalizado para usar el contexto fácilmente en otros componentes
export const useAuth = () => {
    return useContext(AuthContext);
};