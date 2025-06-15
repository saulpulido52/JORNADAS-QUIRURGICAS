import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../components/AuthContext';
import { FaEdit } from 'react-icons/fa';

const MisSolicitudesPage = () => {
    const { user } = useAuth(); // Para obtener solo las solicitudes del usuario logueado
    
    // Estado para la lista original de solicitudes
    const [solicitudes, setSolicitudes] = useState([]);
    // Estado para la lista que se muestra (ya filtrada)
    const [filteredSolicitudes, setFilteredSolicitudes] = useState([]);
    
    // Estado para cada campo de filtro
    const [fechaDesde, setFechaDesde] = useState('');
    const [fechaHasta, setFechaHasta] = useState('');
    const [estatus, setEstatus] = useState('Todos');

    const ESTATUS_OPTIONS = ['Todos', 'En Revisión', 'Aprobada', 'Rechazada', 'En Espera'];
    
    // Objeto para dar un color de badge diferente a cada estatus
    const ESTATUS_BADGE = {
        'En Revisión': 'bg-warning text-dark',
        'Aprobada': 'bg-success',
        'Rechazada': 'bg-danger',
        'En Espera': 'bg-info',
    };

    useEffect(() => {
        const todasLasSolicitudes = JSON.parse(localStorage.getItem('solicitudes')) || [];
        // Filtramos para mostrar SÓLO las solicitudes del usuario actual
        const misSolicitudes = todasLasSolicitudes.filter(sol => sol.owner === user.email);
        setSolicitudes(misSolicitudes);
        setFilteredSolicitudes(misSolicitudes);
    }, [user.email]);

    const handleFilter = () => {
        let solicitudesFiltradas = [...solicitudes];

        // 1. Filtrar por estatus
        if (estatus !== 'Todos') {
            solicitudesFiltradas = solicitudesFiltradas.filter(sol => sol.estatus === estatus);
        }

        // 2. Filtrar por fecha "desde"
        if (fechaDesde) {
            solicitudesFiltradas = solicitudesFiltradas.filter(sol => new Date(sol.fecha) >= new Date(fechaDesde));
        }
        
        // 3. Filtrar por fecha "hasta"
        if (fechaHasta) {
            solicitudesFiltradas = solicitudesFiltradas.filter(sol => new Date(sol.fecha) <= new Date(fechaHasta));
        }

        setFilteredSolicitudes(solicitudesFiltradas);
    };

    const handleClearFilters = () => {
        setFechaDesde('');
        setFechaHasta('');
        setEstatus('Todos');
        setFilteredSolicitudes(solicitudes); // Restaura la lista completa
    };

    return (
        <div className="bg-light min-vh-100 py-5">
            <main className="container">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h1 className="h2">Bandeja de Solicitudes</h1>
                    <Link to="/solicitud" className="btn text-white" style={{ backgroundColor: '#6D243B' }}>
                        + Crear Nueva Solicitud
                    </Link>
                </div>

                {/* --- SECCIÓN DE FILTROS --- */}
                <div className="card shadow-sm mb-4">
                    <div className="card-body">
                        <div className="row g-3 align-items-end">
                            <div className="col-md-4">
                                <label htmlFor="fechaDesde" className="form-label">Desde</label>
                                <input type="date" id="fechaDesde" className="form-control" value={fechaDesde} onChange={e => setFechaDesde(e.target.value)} />
                            </div>
                            <div className="col-md-4">
                                <label htmlFor="fechaHasta" className="form-label">Hasta</label>
                                <input type="date" id="fechaHasta" className="form-control" value={fechaHasta} onChange={e => setFechaHasta(e.target.value)} />
                            </div>
                            <div className="col-md-4">
                                <label htmlFor="estatus" className="form-label">Estatus</label>
                                <select id="estatus" className="form-select" value={estatus} onChange={e => setEstatus(e.target.value)}>
                                    {ESTATUS_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                                </select>
                            </div>
                        </div>
                        <div className="d-flex justify-content-end mt-3">
                            <button className="btn btn-secondary me-2" onClick={handleClearFilters}>Limpiar</button>
                            <button className="btn btn-primary" onClick={handleFilter}>Filtrar</button>
                        </div>
                    </div>
                </div>

                {/* --- TABLA DE RESULTADOS --- */}
                <div className="card shadow-sm">
                    <div className="card-body">
                        {filteredSolicitudes.length > 0 ? (
                            <div className="table-responsive">
                                <table className="table table-hover align-middle">
                                    <thead className="table-light">
                                        <tr>
                                            <th scope="col">Folio</th>
                                            <th scope="col">Fecha de Solicitud</th>
                                            <th scope="col">Nombre</th>
                                            <th scope="col">Estatus</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredSolicitudes.map((sol) => (
                      <tr key={sol.id}>
                        <td>IMSS-{sol.id}</td>
                        <td>{new Date(sol.fecha).toLocaleDateString()}</td>
                        <td>{sol.nombre}</td>
                        <td>
                          {sol.estatus === 'En Revisión' ? (
                            <Link 
                              to={`/editar-solicitud/${sol.id}`} 
                              className={`badge d-flex align-items-center justify-content-between text-decoration-none ${ESTATUS_BADGE[sol.estatus]}`}
                            >
                              {sol.estatus}
                              <FaEdit className="ms-2" />
                            </Link>
                          ) : (
                            <span className={`badge ${ESTATUS_BADGE[sol.estatus] || 'bg-secondary'}`}>{sol.estatus}</span>
                          )}
                        </td>
                      </tr>
                    ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <div className="text-center p-5">
                                <p className="fs-4 text-secondary">No se encontraron solicitudes con los filtros aplicados.</p>
                                <button className="btn btn-link" onClick={handleClearFilters}>Mostrar todas las solicitudes</button>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default MisSolicitudesPage;