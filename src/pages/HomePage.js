import React from 'react';
import { Link } from 'react-router-dom';
const HomePage = () => {
  const heroImageUrl = 'https://images.unsplash.com/photo-1550831107-1553da8c8464?q=80&w=2574&auto=format&fit=crop';

  // Estos son estilos en línea para los colores personalizados que no vienen en Bootstrap
  const brandColors = {
    darkGreen: '#2A5C50',
    gold: '#BFA56B',
    maroon: '#6D243B',
  };

  return (
    // 'bg-light' es el color de fondo gris claro de Bootstrap
    <div className="bg-light min-vh-100">
      {/* 'container' centra el contenido y lo hace responsivo */}
      <main className="container py-5">
        
        {/* Usamos las clases 'card' y 'shadow-sm' de Bootstrap */}
        <section className="card shadow-sm overflow-hidden">
          <div className="position-relative">
            <img src={heroImageUrl} alt="Médico revisando a un paciente" className="card-img-top" style={{ height: '300px', objectFit: 'cover' }}/>
            <div className="card-img-overlay d-flex align-items-center justify-content-center" style={{ backgroundColor: 'rgba(0, 0, 0, 0.4)' }}>
              <h1 className="display-4 fw-bold text-white text-center">
                Jornadas Quirúrgicas IMSS
              </h1>
            </div>
          </div>
          
          <div className="card-body p-5 text-center">
            <h2 className="card-title h1" style={{ color: brandColors.darkGreen }}>
              Cirugía para Todas
            </h2>
            <p className="card-text fs-5 text-secondary">
              "Salud y Calidad de Vida para tí"
            </p>
            <p className="fs-4 fw-bold mb-4" style={{ color: brandColors.maroon }}>
              ¿Tienes pendiente que te realicen una cirugía?
            </p>
            
            {/* Un botón de Bootstrap. 'btn-danger' es un color parecido al marrón que teníamos */}
            <Link to="/solicitud" className="btn btn-lg rounded-pill px-5 py-3 text-white shadow" style={{ backgroundColor: brandColors.maroon }}>
  Inicia tu Solicitud
            </Link>
            
            <p className="mt-4">
              <a href="/privacidad" className="text-secondary">
                Aviso de privacidad
              </a>
            </p>
          </div>
        </section>

        {/* Alerta de Bootstrap */}
        <div className="alert alert-primary mt-5" role="alert">
          <h4 className="alert-heading">Importante</h4>
          <p>Para iniciar el trámite, asegúrate de tener a la mano tu Número de Seguro Social (NSS) y tu CURP.</p>
        </div>

        {/* Requisitos usando 'list-group' de Bootstrap */}
        <div className="mt-5 border-top pt-5" style={{ borderColor: brandColors.gold + ' !important', borderWidth: '3px' }}>
            <div className="card shadow-sm">
                <div className="card-header h4 text-white" style={{ backgroundColor: brandColors.maroon }}>
                    Requisitos para realizar el Trámite
                </div>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item d-flex align-items-center fs-5">
                        <span className="badge rounded-pill me-3 fs-6" style={{ backgroundColor: brandColors.maroon }}>1</span>
                        Captura tu información personal (Nombre, Teléfono, Dirección).
                    </li>
                    <li className="list-group-item d-flex align-items-center fs-5">
                        <span className="badge rounded-pill me-3 fs-6" style={{ backgroundColor: brandColors.maroon }}>2</span>
                        Ingresa tu Número de Seguro Social y diagnóstico previo si cuentas con él.
                    </li>
                    <li className="list-group-item d-flex align-items-center fs-5">
                        <span className="badge rounded-pill me-3 fs-6" style={{ backgroundColor: brandColors.maroon }}>3</span>
                        Valida los datos y envía tu solicitud para ser contactado por nuestro personal.
                    </li>
                </ul>
            </div>
        </div>
      </main>
    </div>
  );
};

export default HomePage;