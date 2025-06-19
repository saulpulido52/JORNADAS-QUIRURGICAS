import React, { useState, useEffect } from 'react';
// --- CORRECCIÓN AQUÍ: 'Link' ha sido eliminado ---
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../components/AuthContext';
import Stepper from '../components/Stepper';
import { hospitalesSonora } from '../data/hospitales';

const EditSolicitudPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();

    // 1. ESTADO
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        curp: '', nombre: '', primerApellido: '', segundoApellido: '', telefono: '', correo: '', fechaNacimiento: '', sexo: '',
        nombreAuxiliar: '', telefonoAuxiliar: '', calle: '', numeroExterior: '', numeroInterior: '', codigoPostal: '', colonia: '', municipio: '', estado: '',
        hospitalSeleccionado: '', institucionSeguridadSocial: '', tipoCirugia: '', tieneDiagnosticoPrevio: '', diagnosticoCual: '', archivoDiagnostico: null,
        operadoPreviamente: '', transfusiones: '', alergias: '', alergiasCuales: '', tomaMedicamentos: '', medicamentosCuales: '', padeceDiabetes: '', padeceHipertension: '',
    });
    const [errors, setErrors] = useState({});

    const steps = ["Datos Personales", "Servicio y Diagnóstico", "Antecedentes"];
    const SEGURIDAD_SOCIAL_OPTIONS = ["Instituto Mexicano del Seguro Social", "IMSS BIENESTAR", "No pertenezco a ninguna institución"];
    const CIRUGIAS_OPTIONS = ["Verrugas", "Lipomas", "Quistes", "Abscesos", "Catarata", "Hernia Umbilical"];

    // 2. CARGA DE DATOS
    useEffect(() => {
        const todasLasSolicitudes = JSON.parse(localStorage.getItem('solicitudes')) || [];
        const solicitudAEditar = todasLasSolicitudes.find(
            sol => sol.id === parseInt(id) && sol.owner === user.email
        );
        
        if (solicitudAEditar) {
            setFormData(solicitudAEditar);
        } else {
            alert("No se encontró la solicitud o no tienes permiso para editarla.");
            navigate('/mis-solicitudes');
        }
    }, [id, user.email, navigate]);

    // 3. VALIDACIÓN
    const validateStep = () => {
        const newErrors = {};
        if (step === 1) {
            if (!formData.curp.trim()) newErrors.curp = "La CURP es obligatoria."; else if (!/^[A-Z]{4}[0-9]{6}[H,M][A-Z]{5}[0-9A-Z]{2}$/.test(formData.curp.toUpperCase())) newErrors.curp = "Formato de CURP inválido.";
            if (!formData.nombre.trim()) newErrors.nombre = "El nombre es obligatorio.";
            if (!formData.primerApellido.trim()) newErrors.primerApellido = "El primer apellido es obligatorio.";
            if (!formData.telefono.trim()) newErrors.telefono = "El teléfono es obligatorio."; else if (!/^[0-9]{10}$/.test(formData.telefono)) newErrors.telefono = "El teléfono debe tener 10 dígitos.";
            if (!formData.correo.trim()) newErrors.correo = "El correo es obligatorio."; else if (!/\S+@\S+\.\S+/.test(formData.correo)) newErrors.correo = "Formato de correo inválido.";
            if (!formData.fechaNacimiento) newErrors.fechaNacimiento = "La fecha de nacimiento es obligatoria.";
            if (!formData.sexo) newErrors.sexo = "Debe seleccionar un sexo.";
            if (!formData.nombreAuxiliar.trim()) newErrors.nombreAuxiliar = "El nombre del contacto auxiliar es obligatorio.";
            if (!formData.telefonoAuxiliar.trim()) newErrors.telefonoAuxiliar = "El teléfono del contacto auxiliar es obligatorio."; else if (!/^[0-9]{10}$/.test(formData.telefonoAuxiliar)) newErrors.telefonoAuxiliar = "El teléfono debe tener 10 dígitos.";
            if (!formData.calle.trim()) newErrors.calle = "La calle es obligatoria.";
            if (!formData.numeroExterior.trim()) newErrors.numeroExterior = "El número exterior es obligatorio.";
            if (!formData.codigoPostal.trim()) newErrors.codigoPostal = "El código postal es obligatorio."; else if (!/^[0-9]{5}$/.test(formData.codigoPostal)) newErrors.codigoPostal = "El código postal debe tener 5 dígitos.";
            if (!formData.colonia.trim()) newErrors.colonia = "La colonia es obligatoria.";
            if (!formData.municipio.trim()) newErrors.municipio = "El municipio es obligatorio.";
            if (!formData.estado.trim()) newErrors.estado = "El estado es obligatorio.";
        }
        if (step === 2) {
            if (!formData.hospitalSeleccionado) newErrors.hospitalSeleccionado = "Debe seleccionar un hospital.";
            if (!formData.institucionSeguridadSocial) newErrors.institucionSeguridadSocial = "Debe seleccionar una opción de seguridad social.";
            if (!formData.tipoCirugia) newErrors.tipoCirugia = "Debe seleccionar el tipo de cirugía que requiere.";
            if (!formData.tieneDiagnosticoPrevio) newErrors.tieneDiagnosticoPrevio = "Debe responder si tiene un diagnóstico previo.";
            if (formData.tieneDiagnosticoPrevio === 'Sí' && !formData.diagnosticoCual.trim()) {
                newErrors.diagnosticoCual = "Debe especificar cuál es su diagnóstico.";
            }
        }
        if (step === 3) {
            if (!formData.operadoPreviamente) newErrors.operadoPreviamente = "Por favor, seleccione una opción.";
            if (!formData.transfusiones) newErrors.transfusiones = "Por favor, seleccione una opción.";
            if (!formData.alergias) newErrors.alergias = "Por favor, seleccione una opción.";
            if (formData.alergias === 'Sí' && !formData.alergiasCuales.trim()) newErrors.alergiasCuales = "Debe especificar sus alergias.";
            if (!formData.tomaMedicamentos) newErrors.tomaMedicamentos = "Por favor, seleccione una opción.";
            if (formData.tomaMedicamentos === 'Sí' && !formData.medicamentosCuales.trim()) newErrors.medicamentosCuales = "Debe especificar los medicamentos.";
            if (!formData.padeceDiabetes) newErrors.padeceDiabetes = "Por favor, seleccione una opción.";
            if (!formData.padeceHipertension) newErrors.padeceHipertension = "Por favor, seleccione una opción.";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // 4. MANEJADORES
    const handleNext = () => { if (validateStep()) { setStep(prev => prev + 1); } };
    const handlePrev = () => { setStep(prev => prev - 1); };
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) { setErrors(prev => ({ ...prev, [name]: null })); }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateStep()) {
            let todasLasSolicitudes = JSON.parse(localStorage.getItem('solicitudes')) || [];
            const solicitudIndex = todasLasSolicitudes.findIndex(sol => sol.id === parseInt(id));
            if (solicitudIndex > -1) {
                todasLasSolicitudes[solicitudIndex] = { ...formData, id: parseInt(id) };
                localStorage.setItem('solicitudes', JSON.stringify(todasLasSolicitudes));
                navigate('/mis-solicitudes');
            } else {
                alert("Error al guardar: no se pudo encontrar la solicitud original.");
            }
        }
    };

    // 5. RENDERIZADO
    return (
        <div className="bg-light min-vh-100 py-5">
            <main className="container">
                <div className="card shadow-sm">
                    <div className="card-header h4 text-white" style={{ backgroundColor: '#6D243B' }}>
                        Editar Solicitud de Cirugía (Folio: IMSS-{id})
                    </div>
                    <div className="card-body p-4 p-md-5">
                        <Stepper currentStep={step} steps={steps} />
                        <form onSubmit={handleSubmit}>
                            {/* El JSX de todos los pasos es una copia del de SolicitudPage.js */}
                            {step === 1 && (
                                <>
                                    <h5>Datos de la persona que solicita el tratamiento</h5><hr className="my-3" />
                                    <div className="row g-3">
                                        <div className="col-md-4"><label htmlFor="curp" className="form-label">CURP*</label><input type="text" className={`form-control ${errors.curp && 'is-invalid'}`} id="curp" name="curp" value={formData.curp} onChange={handleInputChange} />{errors.curp && <div className="invalid-feedback">{errors.curp}</div>}</div>
                                        <div className="col-md-4"><label htmlFor="nombre" className="form-label">Nombre(s)*</label><input type="text" className={`form-control ${errors.nombre && 'is-invalid'}`} id="nombre" name="nombre" value={formData.nombre} onChange={handleInputChange} />{errors.nombre && <div className="invalid-feedback">{errors.nombre}</div>}</div>
                                        <div className="col-md-4"><label htmlFor="primerApellido" className="form-label">Primer Apellido*</label><input type="text" className={`form-control ${errors.primerApellido && 'is-invalid'}`} id="primerApellido" name="primerApellido" value={formData.primerApellido} onChange={handleInputChange} />{errors.primerApellido && <div className="invalid-feedback">{errors.primerApellido}</div>}</div>
                                        <div className="col-md-4"><label htmlFor="segundoApellido" className="form-label">Segundo Apellido</label><input type="text" className="form-control" id="segundoApellido" name="segundoApellido" value={formData.segundoApellido} onChange={handleInputChange} /></div>
                                        <div className="col-md-4"><label htmlFor="telefono" className="form-label">Teléfono*</label><input type="tel" className={`form-control ${errors.telefono && 'is-invalid'}`} id="telefono" name="telefono" value={formData.telefono} onChange={handleInputChange} />{errors.telefono && <div className="invalid-feedback">{errors.telefono}</div>}</div>
                                        <div className="col-md-4"><label htmlFor="correo" className="form-label">Correo Electrónico*</label><input type="email" className={`form-control ${errors.correo && 'is-invalid'}`} id="correo" name="correo" value={formData.correo} onChange={handleInputChange} />{errors.correo && <div className="invalid-feedback">{errors.correo}</div>}</div>
                                        <div className="col-md-4"><label htmlFor="fechaNacimiento" className="form-label">Fecha de Nacimiento*</label><input type="date" className={`form-control ${errors.fechaNacimiento && 'is-invalid'}`} id="fechaNacimiento" name="fechaNacimiento" value={formData.fechaNacimiento} onChange={handleInputChange} />{errors.fechaNacimiento && <div className="invalid-feedback">{errors.fechaNacimiento}</div>}</div>
                                        <div className="col-md-4"><label className="form-label">Sexo*</label><div className="d-flex pt-2"><div className="form-check me-3"><input className="form-check-input" type="radio" name="sexo" id="sexoH" value="Hombre" onChange={handleInputChange} checked={formData.sexo === 'Hombre'} /><label className="form-check-label" htmlFor="sexoH">Hombre</label></div><div className="form-check"><input className="form-check-input" type="radio" name="sexo" id="sexoM" value="Mujer" onChange={handleInputChange} checked={formData.sexo === 'Mujer'} /><label className="form-check-label" htmlFor="sexoM">Mujer</label></div></div>{errors.sexo && <div className="text-danger small mt-1" style={{ fontSize: '.875em' }}>{errors.sexo}</div>}</div>
                                    </div>
                                    <h5 className="mt-5">Datos del contacto auxiliar</h5><p className="text-muted small">Es necesario que capture el nombre y número de contacto de una persona auxiliar.</p><hr className="my-3"/>
                                    <div className="row g-3"><div className="col-md-6"><label htmlFor="nombreAuxiliar" className="form-label">Nombre completo*</label><input type="text" className={`form-control ${errors.nombreAuxiliar && 'is-invalid'}`} id="nombreAuxiliar" name="nombreAuxiliar" value={formData.nombreAuxiliar} onChange={handleInputChange} />{errors.nombreAuxiliar && <div className="invalid-feedback">{errors.nombreAuxiliar}</div>}</div><div className="col-md-6"><label htmlFor="telefonoAuxiliar" className="form-label">Número de contacto*</label><input type="tel" className={`form-control ${errors.telefonoAuxiliar && 'is-invalid'}`} id="telefonoAuxiliar" name="telefonoAuxiliar" value={formData.telefonoAuxiliar} onChange={handleInputChange} />{errors.telefonoAuxiliar && <div className="invalid-feedback">{errors.telefonoAuxiliar}</div>}</div></div>
                                    <h5 className="mt-5">Datos de domicilio</h5><hr className="my-3"/>
                                    <div className="row g-3"><div className="col-md-6"><label htmlFor="calle" className="form-label">Calle*</label><input type="text" className={`form-control ${errors.calle && 'is-invalid'}`} id="calle" name="calle" value={formData.calle} onChange={handleInputChange} />{errors.calle && <div className="invalid-feedback">{errors.calle}</div>}</div><div className="col-md-3"><label htmlFor="numeroExterior" className="form-label">Número exterior*</label><input type="text" className={`form-control ${errors.numeroExterior && 'is-invalid'}`} id="numeroExterior" name="numeroExterior" value={formData.numeroExterior} onChange={handleInputChange} />{errors.numeroExterior && <div className="invalid-feedback">{errors.numeroExterior}</div>}</div><div className="col-md-3"><label htmlFor="numeroInterior" className="form-label">Número Interior</label><input type="text" className="form-control" id="numeroInterior" name="numeroInterior" value={formData.numeroInterior} onChange={handleInputChange} /></div><div className="col-md-4"><label htmlFor="codigoPostal" className="form-label">Código Postal*</label><input type="text" className={`form-control ${errors.codigoPostal && 'is-invalid'}`} id="codigoPostal" name="codigoPostal" value={formData.codigoPostal} onChange={handleInputChange} />{errors.codigoPostal && <div className="invalid-feedback">{errors.codigoPostal}</div>}</div><div className="col-md-4"><label htmlFor="colonia" className="form-label">Colonia*</label><input type="text" className={`form-control ${errors.colonia && 'is-invalid'}`} id="colonia" name="colonia" value={formData.colonia} onChange={handleInputChange} />{errors.colonia && <div className="invalid-feedback">{errors.colonia}</div>}</div><div className="col-md-4"><label htmlFor="municipio" className="form-label">Alcaldía / Municipio*</label><input type="text" className={`form-control ${errors.municipio && 'is-invalid'}`} id="municipio" name="municipio" value={formData.municipio} onChange={handleInputChange} />{errors.municipio && <div className="invalid-feedback">{errors.municipio}</div>}</div><div className="col-md-4"><label htmlFor="estado" className="form-label">Estado*</label><input type="text" className={`form-control ${errors.estado && 'is-invalid'}`} id="estado" name="estado" value={formData.estado} onChange={handleInputChange} />{errors.estado && <div className="invalid-feedback">{errors.estado}</div>}</div></div>
                                </>
                            )}
                            {step === 2 && (
                                <>
                                    <h5 className="mb-3">Unidad Médica y Servicio Requerido</h5>
                                    <div className="mb-4">
                                        <label htmlFor="hospitalSeleccionado" className="form-label">Seleccione la unidad médica de su preferencia*</label>
                                        <select className={`form-select ${errors.hospitalSeleccionado && 'is-invalid'}`} id="hospitalSeleccionado" name="hospitalSeleccionado" value={formData.hospitalSeleccionado} onChange={handleInputChange}>
                                            <option value="" disabled>-- Elija un hospital --</option>
                                            {hospitalesSonora.map(hospital => (<option key={hospital.id} value={`${hospital.nombre} - ${hospital.ciudad}`}>{hospital.nombre} - {hospital.ciudad}</option>))}
                                        </select>
                                        {errors.hospitalSeleccionado && <div className="invalid-feedback">{errors.hospitalSeleccionado}</div>}
                                    </div>
                                    <div className="mb-4">
                                        <p className="form-label mb-1">Seguridad Social*</p>
                                        {SEGURIDAD_SOCIAL_OPTIONS.map(inst => (<div className="form-check" key={inst}><input className="form-check-input" type="radio" name="institucionSeguridadSocial" id={`ss_${inst}`} value={inst} onChange={handleInputChange} checked={formData.institucionSeguridadSocial === inst} /><label className="form-check-label" htmlFor={`ss_${inst}`}>{inst}</label></div>))}
                                        {errors.institucionSeguridadSocial && <div className="text-danger small mt-1">{errors.institucionSeguridadSocial}</div>}
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor="tipoCirugia" className="form-label">Tipo de cirugía que requiere*</label>
                                        <select className={`form-select ${errors.tipoCirugia && 'is-invalid'}`} id="tipoCirugia" name="tipoCirugia" value={formData.tipoCirugia} onChange={handleInputChange}>
                                            <option value="" disabled>-- Seleccione un tipo --</option>
                                            {CIRUGIAS_OPTIONS.map(cirugia => (<option key={cirugia} value={cirugia}>{cirugia}</option>))}
                                        </select>
                                        {errors.tipoCirugia && <div className="invalid-feedback">{errors.tipoCirugia}</div>}
                                    </div>
                                    <hr className="my-4"/><h5 className="mb-3">Diagnóstico</h5>
                                    <div className="mb-4">
                                        <p className="form-label mb-1">¿Cuenta con un diagnóstico médico previo?*</p>
                                        <div className="form-check"><input className="form-check-input" type="radio" name="tieneDiagnosticoPrevio" id="diagSi" value="Sí" onChange={handleInputChange} checked={formData.tieneDiagnosticoPrevio === 'Sí'}/><label className="form-check-label" htmlFor="diagSi">Sí</label></div>
                                        <div className="form-check"><input className="form-check-input" type="radio" name="tieneDiagnosticoPrevio" id="diagNo" value="No" onChange={handleInputChange} checked={formData.tieneDiagnosticoPrevio === 'No'}/><label className="form-check-label" htmlFor="diagNo">No</label></div>
                                        {errors.tieneDiagnosticoPrevio && <div className="text-danger small mt-1">{errors.tieneDiagnosticoPrevio}</div>}
                                    </div>
                                    {formData.tieneDiagnosticoPrevio === 'Sí' && (<div className="ps-3"><div className="mb-3"><label htmlFor="diagnosticoCual" className="form-label">Especifique cuál*</label><textarea className={`form-control ${errors.diagnosticoCual && 'is-invalid'}`} id="diagnosticoCual" name="diagnosticoCual" rows="3" value={formData.diagnosticoCual} onChange={handleInputChange}></textarea>{errors.diagnosticoCual && <div className="invalid-feedback">{errors.diagnosticoCual}</div>}</div><div className="mb-3"><label htmlFor="archivoDiagnostico" className="form-label">Adjunte un archivo con el diagnóstico (PDF, opcional)</label><input className="form-control" type="file" id="archivoDiagnostico" name="archivoDiagnostico" accept=".pdf" onChange={handleInputChange} /><div className="form-text">Para agilizar su trámite, se recomienda adjuntar cualquier documento médico.</div></div></div>)}
                                </>
                            )}
                            {step === 3 && (
                                <>
                                    <div className="mb-4"><p className="form-label mb-1">¿Ha sido operado previamente?*</p><div className="form-check"><input className="form-check-input" type="radio" name="operadoPreviamente" id="opSi" value="Sí" onChange={handleInputChange} checked={formData.operadoPreviamente === 'Sí'}/><label className="form-check-label" htmlFor="opSi">Sí</label></div><div className="form-check"><input className="form-check-input" type="radio" name="operadoPreviamente" id="opNo" value="No" onChange={handleInputChange} checked={formData.operadoPreviamente === 'No'}/><label className="form-check-label" htmlFor="opNo">No</label></div>{errors.operadoPreviamente && <div className="text-danger small mt-1">{errors.operadoPreviamente}</div>}</div>
                                    <div className="mb-4"><p className="form-label mb-1">¿Ha tenido transfusiones de sangre?*</p><div className="form-check"><input className="form-check-input" type="radio" name="transfusiones" id="transSi" value="Sí" onChange={handleInputChange} checked={formData.transfusiones === 'Sí'}/><label className="form-check-label" htmlFor="transSi">Sí</label></div><div className="form-check"><input className="form-check-input" type="radio" name="transfusiones" id="transNo" value="No" onChange={handleInputChange} checked={formData.transfusiones === 'No'}/><label className="form-check-label" htmlFor="transNo">No</label></div>{errors.transfusiones && <div className="text-danger small mt-1">{errors.transfusiones}</div>}</div>
                                    <div className="mb-4"><p className="form-label mb-1">¿Tiene alergias?*</p><div className="form-check"><input className="form-check-input" type="radio" name="alergias" id="alergiaSi" value="Sí" onChange={handleInputChange} checked={formData.alergias === 'Sí'}/><label className="form-check-label" htmlFor="alergiaSi">Sí</label></div><div className="form-check"><input className="form-check-input" type="radio" name="alergias" id="alergiaNo" value="No" onChange={handleInputChange} checked={formData.alergias === 'No'}/><label className="form-check-label" htmlFor="alergiaNo">No</label></div>{errors.alergias && <div className="text-danger small mt-1">{errors.alergias}</div>}
                                    {formData.alergias === 'Sí' && (<div className="mt-2 ps-3"><label htmlFor="alergiasCuales" className="form-label small">¿Cuáles?</label><textarea className={`form-control ${errors.alergiasCuales && 'is-invalid'}`} id="alergiasCuales" name="alergiasCuales" rows="2" value={formData.alergiasCuales} onChange={handleInputChange}></textarea>{errors.alergiasCuales && <div className="invalid-feedback">{errors.alergiasCuales}</div>}</div>)}</div>
                                    <div className="mb-4"><p className="form-label mb-1">¿Está tomando algún medicamento actualmente?*</p><div className="form-check"><input className="form-check-input" type="radio" name="tomaMedicamentos" id="medSi" value="Sí" onChange={handleInputChange} checked={formData.tomaMedicamentos === 'Sí'}/><label className="form-check-label" htmlFor="medSi">Sí</label></div><div className="form-check"><input className="form-check-input" type="radio" name="tomaMedicamentos" id="medNo" value="No" onChange={handleInputChange} checked={formData.tomaMedicamentos === 'No'}/><label className="form-check-label" htmlFor="medNo">No</label></div>{errors.tomaMedicamentos && <div className="text-danger small mt-1">{errors.tomaMedicamentos}</div>}
                                    {formData.tomaMedicamentos === 'Sí' && (<div className="mt-2 ps-3"><label htmlFor="medicamentosCuales" className="form-label small">¿Cuáles?</label><textarea className={`form-control ${errors.medicamentosCuales && 'is-invalid'}`} id="medicamentosCuales" name="medicamentosCuales" rows="2" value={formData.medicamentosCuales} onChange={handleInputChange}></textarea>{errors.medicamentosCuales && <div className="invalid-feedback">{errors.medicamentosCuales}</div>}</div>)}</div>
                                    <hr/>
                                    <div className="mb-4"><p className="form-label mb-1">¿Padece Diabetes?*</p><div className="form-check"><input className="form-check-input" type="radio" name="padeceDiabetes" id="diabSi" value="Sí" onChange={handleInputChange} checked={formData.padeceDiabetes === 'Sí'}/><label className="form-check-label" htmlFor="diabSi">Sí</label></div><div className="form-check"><input className="form-check-input" type="radio" name="padeceDiabetes" id="diabNo" value="No" onChange={handleInputChange} checked={formData.padeceDiabetes === 'No'}/><label className="form-check-label" htmlFor="diabNo">No</label></div>{errors.padeceDiabetes && <div className="text-danger small mt-1">{errors.padeceDiabetes}</div>}</div>
                                    <div className="mb-3"><p className="form-label mb-1">¿Padece Hipertensión?*</p><div className="form-check"><input className="form-check-input" type="radio" name="padeceHipertension" id="hipSi" value="Sí" onChange={handleInputChange} checked={formData.padeceHipertension === 'Sí'}/><label className="form-check-label" htmlFor="hipSi">Sí</label></div><div className="form-check"><input className="form-check-input" type="radio" name="padeceHipertension" id="hipNo" value="No" onChange={handleInputChange} checked={formData.padeceHipertension === 'No'}/><label className="form-check-label" htmlFor="hipNo">No</label></div>{errors.padeceHipertension && <div className="text-danger small mt-1">{errors.padeceHipertension}</div>}</div>
                                </>
                            )}
                            <div className="d-flex justify-content-between mt-5">
                                {step > 1 && <button type="button" className="btn btn-secondary" onClick={handlePrev}>Anterior</button>}
                                <div className="ms-auto">
                                    {step < steps.length && <button type="button" className="btn btn-primary" onClick={handleNext}>Siguiente</button>}
                                    {step === steps.length && <button type="submit" className="btn text-white" style={{ backgroundColor: '#6D243B' }}>Guardar Cambios</button>}
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default EditSolicitudPage;