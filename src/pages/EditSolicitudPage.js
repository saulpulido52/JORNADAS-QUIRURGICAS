import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../components/AuthContext';
import { FaUser, FaPhone, FaMapMarkerAlt, FaNotesMedical, FaIdCard } from 'react-icons/fa';

const EditSolicitudPage = () => {
    const { id } = useParams(); // Obtiene el ID de la solicitud desde la URL
    const navigate = useNavigate();
    const { user } = useAuth();

    // Estado para el formulario, inicializado como vacío
    const [formData, setFormData] = useState({
        nombre: '', telefono: '', direccion: '', diagnostico: '', nss: ''
    });

    // useEffect se ejecuta cuando la página carga para buscar y cargar los datos
    useEffect(() => {
        const todasLasSolicitudes = JSON.parse(localStorage.getItem('solicitudes')) || [];
        const solicitudAEditar = todasLasSolicitudes.find(
            sol => sol.id === parseInt(id) && sol.owner === user.email
        );
        
        if (solicitudAEditar) {
            setFormData(solicitudAEditar); // Rellena el formulario con los datos encontrados
        } else {
            alert("No se encontró la solicitud o no tienes permiso para editarla.");
            navigate('/mis-solicitudes'); // Si no se encuentra, redirige
        }
    }, [id, user.email, navigate]);

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        let todasLasSolicitudes = JSON.parse(localStorage.getItem('solicitudes')) || [];
        // Encuentra el índice de la solicitud que estamos editando
        const solicitudIndex = todasLasSolicitudes.findIndex(sol => sol.id === parseInt(id));

        if (solicitudIndex > -1) {
            // Reemplaza la solicitud vieja con la nueva (con los datos del formulario)
            todasLasSolicitudes[solicitudIndex] = formData;
            localStorage.setItem('solicitudes', JSON.stringify(todasLasSolicitudes));
            navigate('/mis-solicitudes'); // Redirige a la bandeja
        }
    };

    return (
        <div className="bg-light min-vh-100 py-5">
            <main className="container">
                <div className="card shadow-sm">
                    <div className="card-header h4 text-white" style={{ backgroundColor: '#6D243B' }}>
                        Editar Solicitud de Cirugía (Folio: IMSS-{id})
                    </div>
                    <div className="card-body p-4 p-md-5">
                        <form onSubmit={handleSubmit}>
                            {/* Los campos son idénticos al formulario de creación */}
                            <div className="mb-4 input-group"><span className="input-group-text"><FaUser /></span><input type="text" className="form-control" name="nombre" placeholder="Nombre Completo" value={formData.nombre} onChange={handleInputChange} required /></div>
                            <div className="mb-4 input-group"><span className="input-group-text"><FaPhone /></span><input type="tel" className="form-control" name="telefono" placeholder="Teléfono de Contacto" value={formData.telefono} onChange={handleInputChange} required /></div>
                            <div className="mb-4 input-group"><span className="input-group-text"><FaMapMarkerAlt /></span><input type="text" className="form-control" name="direccion" placeholder="Dirección Completa" value={formData.direccion} onChange={handleInputChange} required /></div>
                            <div className="mb-4 input-group"><span className="input-group-text"><FaNotesMedical /></span><textarea className="form-control" name="diagnostico" rows="3" placeholder="Diagnóstico o padecimiento" value={formData.diagnostico} onChange={handleInputChange}></textarea></div>
                            <div className="mb-4 input-group"><span className="input-group-text"><FaIdCard /></span><input type="text" className="form-control" name="nss" placeholder="Número de Seguro Social (NSS)" value={formData.nss} onChange={handleInputChange} required /></div>
                            
                            <div className="d-grid gap-2 d-md-flex justify-content-md-end mt-5">
                                <Link to="/mis-solicitudes" className="btn btn-secondary me-md-2">Cancelar</Link>
                                <button type="submit" className="btn text-white" style={{ backgroundColor: '#6D243B' }}>Guardar Cambios</button>
                            </div>
                        </form>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default EditSolicitudPage;