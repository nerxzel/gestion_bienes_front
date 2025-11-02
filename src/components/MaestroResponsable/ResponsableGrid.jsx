import { Form, Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { FaPencilAlt, FaPlus, FaFileDownload} from 'react-icons/fa';
import { manejarErrorAPI } from '../../utils/errorHandler';
import api from '../../api/axiosConfig';

function ResponsableGrid() {
    const [responsables, setResponsables] = useState([]);
    const [barraBusqueda, setBarraBusqueda] = useState('');

    const [error, setError] = useState(null);
    const [estaCargando, setEstaCargando] = useState(true);

    const navigate = useNavigate();

    const cargarResponsables = async () => {
        try {
            const respuesta = await api.get('/responsable/all');
            setResponsables(respuesta.data || []);
        } catch (err) {
            const mensajeError = manejarErrorAPI(err);
            setError(mensajeError);
            setResponsables([]);
        }
    };

    const handleDescargarHojaMural = async (responsableId, responsableNombre) => {
        try {
            const response = await api.get(`/bien/hojamural/${responsableId}`, {
                responseType: 'blob', 
            });

            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            const nombreArchivo = `Hoja_Mural_${responsableNombre.replace(' ', '_')}.xlsx`;
            link.setAttribute('download', nombreArchivo); 
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);

        } catch (err) {
            console.error('Error al descargar la hoja mural:', err);
            setError('No se pudo descargar la hoja mural.');
        }
    };

    useEffect(() => {
        const loadData = async () => {
            setEstaCargando(true);
            setError(null);
            await cargarResponsables();
            setEstaCargando(false);
        };
        loadData();
    }, []);

    const responsablesFiltrados = responsables.filter((responsable) => (responsable.nombre || '').toLowerCase().includes(barraBusqueda.toLowerCase()));

    return (
        <> 
        <Row className="mb-3 align-items-center">
            <Col sm={3}><Form.Label id='barra-busqueda' htmlFor="barra-busqueda" className="mb-0">Buscar</Form.Label></Col>

            <Col sm={4}><Form.Control  
                placeholder="Buscar por nombre..."
                value={barraBusqueda}
                onChange={(e) => setBarraBusqueda(e.target.value)}
            /></Col>
        </Row>

        <Button 
            variant="success" 
            className="mb-3"
            onClick={() => navigate(`/agregar-responsable/`)}
                >
                    <FaPlus className="me-1" /> Agregar Responsable
        </Button>

        {estaCargando && <div className="text-center">Cargando datos...</div>}
        {error && <div className="alert alert-danger">Error: {error}</div>}

        {!estaCargando && !error && (
        <div className='table-responsive'>
            <table className="table table-striped table-bordered table-hover table-sm table-layout-fixed">
                <thead>
                    <tr>
                        <th>Nombre responsable</th>
                        <th>Rut</th>
                        <th>Cargo</th>
                        <th>Estado</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {responsablesFiltrados.length > 0 ? (
                    responsablesFiltrados.map((responsable) => (
                        <tr key={responsable.id}>
                            <td>{responsable.nombre}</td>
                            <td>{responsable.rut}</td>
                            <td>{responsable.cargo}</td>
                            <td>{responsable.estado}</td>
                            <td className="text-nowrap">
                                <Button variant="outline-primary" 
                                    className="me-2" 
                                    size="sm"
                                    onClick={() => navigate(`/modificar-responsable/${responsable.id}`)}>
                                <FaPencilAlt />
                                </Button>
                                <Button variant="outline-info" 
                                        className="me-2" 
                                        size="sm"
                                        title="Descargar Hoja Mural"
                                        onClick={() => handleDescargarHojaMural(responsable.id, responsable.nombre)}>
                    <FaFileDownload />
                </Button>

                            </td>
                        </tr>))
                            ) : (
                        <tr>
                            <td colSpan="8" className="text-center">No se encontraron responsables.</td>
                        </tr>)}
                </tbody>
            </table>
        </div>
            )}
        </>
    );
}

export default ResponsableGrid;