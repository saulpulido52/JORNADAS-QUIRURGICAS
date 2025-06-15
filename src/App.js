import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './components/AuthContext';

// Componentes
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';

// Páginas
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import SolicitudPage from './pages/SolicitudPage';
import MisSolicitudesPage from './pages/MisSolicitudesPage';
import EditSolicitudPage from './pages/EditSolicitudPage'; // Importación de la nueva página de edición

function App() {
  return (
    // El AuthProvider envuelve toda la aplicación para que todos los componentes
    // puedan acceder al estado de autenticación (saber si el usuario inició sesión).
    <AuthProvider>
      <BrowserRouter>
        {/* El Navbar se muestra en todas las páginas */}
        <Navbar />

        {/* El componente Routes define qué página mostrar para cada URL */}
        <Routes>
          {/* Rutas Públicas: accesibles para todos los visitantes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* 
            Rutas Protegidas: envueltas en el componente <ProtectedRoute>.
            Si el usuario no ha iniciado sesión, será redirigido a la página de login.
          */}
          <Route 
            path="/solicitud" 
            element={
              <ProtectedRoute>
                <SolicitudPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/mis-solicitudes" 
            element={
              <ProtectedRoute>
                <MisSolicitudesPage />
              </ProtectedRoute>
            } 
          />
          
          {/* 
            Ruta dinámica para editar una solicitud. El ":id" es un parámetro
            que cambiará según la solicitud en la que hagamos clic.
          */}
          <Route 
            path="/editar-solicitud/:id" 
            element={
              <ProtectedRoute>
                <EditSolicitudPage />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;