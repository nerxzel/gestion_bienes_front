import { Form, Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { FaPencilAlt, FaPlus } from 'react-icons/fa';
import { manejarErrorAPI } from '../../../utils/errorHandler';
import api from '../../../api/axiosConfig';
import SubclaseGridSkeleton from './SubclaseGridSkeleton';

function SubclaseGrid() {
    const [subclases, setSubclases] = useState([]);
    const [barraBusqueda, setBarraBusqueda] = useState('');

    const [error, setError] = useState(null);
    const [estaCargando, setEstaCargando] = useState(true);

    const navigate = useNavigate();

    const cargarSubclases = async () => {
        try {
            const respuesta = await api.get('/subclase/grid');
            setSubclases(respuesta.data || []);
        } catch (err) {
            const mensajeError = manejarErrorAPI(err);
            setError(mensajeError);
            setSubclases([]);
        }
    };

    useEffect(() => {
        const loadData = async () => {
            setEstaCargando(true);
            setError(null);
            await cargarSubclases();
            setTimeout(() => { setEstaCargando(false) }, 2000);
        };
        loadData();
    }, []);

    const subclasesFiltradas = subclases.filter((subclase) => (subclase.nombre || '').toLowerCase().includes(barraBusqueda.toLowerCase()));

    return (
        <>
            <Row className="mb-3 align-items-center">
                <Col sm={3}><Form.Label id='barra-busqueda' htmlFor="barra-busqueda" className="mb-0">Buscar</Form.Label></Col>

                <Col sm={4}><Form.Control
                    placeholder="Buscar por nombre de subclase..."
                    value={barraBusqueda}
                    onChange={(e) => setBarraBusqueda(e.target.value)}
                /></Col>
            </Row>

            <Button
                variant="success"
                className="mb-3"
                onClick={() => navigate(`/agregar-subclase/`)}
                disabled={estaCargando}
            >
                <FaPlus className="me-1" /> Agregar Subclase
            </Button>

            {estaCargando && <SubclaseGridSkeleton></SubclaseGridSkeleton>}
            {error && <div className="alert alert-danger">Error: {error}</div>}

            {!estaCargando && !error && (
                <div className='table-responsive'>
                    <table className="table table-striped table-bordered table-hover table-sm table-layout-fixed">
                        <thead>
                            <tr>
                                <th>Subclase</th>
                                <th>Clase a la que pertenece</th>
                                <th>Grupo al que pertenece</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {subclasesFiltradas.length > 0 ? (
                                subclasesFiltradas.map((subclase) => (
                                    <tr key={subclase.id}>
                                        <td>{subclase.nombre}</td>
                                        <td>{subclase.clase?.nombre}</td>
                                        <td>{subclase.clase?.grupo?.nombre}</td>
                                        <td className="text-nowrap">
                                            <Button variant="outline-primary"
                                                className="me-2"
                                                size="sm"
                                                onClick={() => navigate(`/modificar-subclase/${subclase.id}`)}
                                                title="Modificar Subclase">
                                                <FaPencilAlt />
                                            </Button>
                                        </td>
                                    </tr>))
                            ) : (
                                <tr>
                                    <td colSpan="8" className="text-center">No se encontraron subclases.</td>
                                </tr>)}
                        </tbody>
                    </table>
                </div>
            )}
        </>
    );
}

export default SubclaseGrid;