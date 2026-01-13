import { Form, Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { FaPencilAlt, FaPlus } from 'react-icons/fa';
import { manejarErrorAPI } from '../../../utils/errorHandler';
import UbicacionGridSkeleton from './UbicacionGridSkeleton.jsx'
import api from '../../../api/axiosConfig';

function UbicacionGrid() {
    const [ubicaciones, setUbicaciones] = useState([]);
    const [barraBusqueda, setBarraBusqueda] = useState('');

    const [error, setError] = useState(null);
    const [estaCargando, setEstaCargando] = useState(true);

    const navigate = useNavigate();

    const cargarUbicaciones = async () => {
        try {
            const respuesta = await api.get('/ubicacion');
            setUbicaciones(respuesta.data || []);
        } catch (err) {
            const mensajeError = manejarErrorAPI(err);
            setError(mensajeError);
            setUbicaciones([]);
        }
    };

    useEffect(() => {
        const loadData = async () => {
            setEstaCargando(true);
            setError(null);
            await cargarUbicaciones();
            setTimeout(() => { setEstaCargando(false) }, 2000);
        };
        loadData();
    }, []);

    const ubicacionesFiltradas = ubicaciones.filter((ubicacion) => (ubicacion.nombre || '').toLowerCase().includes(barraBusqueda.toLowerCase()));

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
                onClick={() => navigate(`/agregar-ubicacion/`)}
                disabled={estaCargando}
            >
                <FaPlus className="me-1" /> Agregar Ubicación
            </Button>

            {estaCargando && <UbicacionGridSkeleton></UbicacionGridSkeleton>}
            {error && <div className="alert alert-danger">Error: {error}</div>}

            {!estaCargando && !error && (
                <div className='table-responsive'>
                    <table className="table table-striped table-bordered table-hover table-sm table-layout-fixed">
                        <thead>
                            <tr>
                                <th>Ubicaciones</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {ubicacionesFiltradas.length > 0 ? (
                                ubicacionesFiltradas.map((ubicacion) => (
                                    <tr key={ubicacion.id}>
                                        <td>{ubicacion.nombre}</td>
                                        <td className="text-nowrap">
                                            <Button variant="outline-primary"
                                                className="me-2"
                                                size="sm"
                                                onClick={() => navigate(`/modificar-ubicacion/${ubicacion.id}`)}
                                                title="Modificar Ubicación">
                                                <FaPencilAlt />
                                            </Button>
                                        </td>
                                    </tr>))
                            ) : (
                                <tr>
                                    <td colSpan="8" className="text-center">No se encontraron ubicaciones.</td>
                                </tr>)}
                        </tbody>
                    </table>
                </div>
            )}
        </>
    );
}

export default UbicacionGrid;