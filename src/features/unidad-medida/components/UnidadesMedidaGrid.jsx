import { Form, Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { FaPencilAlt, FaPlus } from 'react-icons/fa';
import { manejarErrorAPI } from '../../../utils/errorHandler';
import UnidadesMedidaGridSkeleton from './UnidadesMedidaGridSkeleton.jsx'
import api from '../../../api/axiosConfig';

function UnidadesMedidaGrid() {
    const [unidadesMedida, setUnidadesMedida] = useState([]);
    const [barraBusqueda, setBarraBusqueda] = useState('');

    const [error, setError] = useState(null);
    const [estaCargando, setEstaCargando] = useState(true);

    const navigate = useNavigate();

    const cargarUnidadesMedida = async () => {
        try {
            const respuesta = await api.get('/unidadMedida');
            setUnidadesMedida(respuesta.data || []);
        } catch (err) {
            const mensajeError = manejarErrorAPI(err);
            setError(mensajeError);
            setUnidadesMedida([]);
        }
    };

    useEffect(() => {
        const loadData = async () => {
            setEstaCargando(true);
            setError(null);
            await cargarUnidadesMedida();
            setTimeout(() => { setEstaCargando(false) }, 2000);
        };
        loadData();
    }, []);

    const unidadesMedidaFiltradas = unidadesMedida.filter((unidades) => (unidades.nombre || '').toLowerCase().includes(barraBusqueda.toLowerCase()))

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
                onClick={() => navigate(`/agregar-unidadesM/`)}
                disabled={estaCargando}
            >
                <FaPlus className="me-1" /> Agregar Unidad de Medida
            </Button>

            {estaCargando && <UnidadesMedidaGridSkeleton></UnidadesMedidaGridSkeleton>}
            {error && <div className="alert alert-danger">Error: {error}</div>}

            {!estaCargando && !error && (
                <div className='table-responsive'>
                    <table className="table table-striped table-bordered table-hover table-sm table-layout-fixed">
                        <thead>
                            <tr>
                                <th>Unidades de Medida</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {unidadesMedidaFiltradas.length > 0 ? (
                                unidadesMedidaFiltradas.map((unidades) => (
                                    <tr key={unidades.id}>
                                        <td>{unidades.nombre}</td>
                                        <td className="text-nowrap">
                                            <Button variant="outline-primary"
                                                className="me-2"
                                                size="sm"
                                                onClick={() => navigate(`/modificar-unidadesM/${unidades.id}`)}
                                                title="Modificar Unidad de Medida">
                                                <FaPencilAlt />
                                            </Button>
                                        </td>
                                    </tr>))
                            ) : (
                                <tr>
                                    <td colSpan="8" className="text-center">No se encontraron unidades de medida.</td>
                                </tr>)}
                        </tbody>
                    </table>
                </div>
            )}
        </>
    );
}

export default UnidadesMedidaGrid;