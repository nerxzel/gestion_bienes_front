import { Form, Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { FaPencilAlt, FaPlus } from 'react-icons/fa';
import api from '../../api/axiosConfig';

function UnidadesMedidaGrid() {
    const [unidadesMedida, setUnidadesMedida] = useState([]);
    const [barraBusqueda, setBarraBusqueda] = useState('');

    const [error, setError] = useState(null);
    const [estaCargando, setEstaCargando] = useState(true);

    const navigate = useNavigate();

    const cargarUnidadesMedida = async () => {
        try {
            const respuesta = await api.get('/unidadMedida/all');
            setUnidadesMedida(respuesta.data || []);
        } catch (err) {
            console.error('Error detallado al cargar las unidades de medida:', err);
            setError("Error al cargar la lista de unidades de medida.");
            setUnidadesMedida([]);
        }
    };


    useEffect(() => {
        const loadData = async () => {
            setEstaCargando(true);
            setError(null);
            try {
                await Promise.all([
                    cargarUnidadesMedida(),
                ]);
            } catch (error) {
                console.error("Error durante la carga inicial:", error);
                setError("Ocurrió un error al cargar los datos iniciales.");
            } finally {
                setEstaCargando(false);
            }
        };
        loadData();
    }, []);

    const unidadesMedidaFiltradas = unidadesMedida.filter((unidades) => {

    const coincideBusqueda =
        (unidades.nombre || '').toLowerCase().includes(barraBusqueda.toLowerCase());

        return coincideBusqueda
            }
    );

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
                >
                    <FaPlus className="me-1" /> Agregar Unidad de Medida
        </Button>

        {estaCargando && <div className="text-center">Cargando datos...</div>}
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
                                    onClick={() => navigate(`/modificar-unidadesM/${unidades.id}`)}>
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