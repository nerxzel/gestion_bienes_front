import { Form, Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { FaPencilAlt, FaPlus } from 'react-icons/fa';
import api from '../../api/axiosConfig';

function SubclaseGrid() {
    const [subclases, setSubclases] = useState([]);
    const [barraBusqueda, setBarraBusqueda] = useState('');

    const [error, setError] = useState(null);
    const [estaCargando, setEstaCargando] = useState(true);

    const navigate = useNavigate();

    const cargarSubclases = async () => {
        try {
            const respuesta = await api.get('/subclase/all');
            setSubclases(respuesta.data || []);
        } catch (err) {
            console.error('Error detallado al cargar subclases:', err);
            setError("Error al cargar la lista de subclases.");
            setSubclases([]);
        }
    };

    useEffect(() => {
        const loadData = async () => {
            setEstaCargando(true);
            setError(null);
            try {
                await Promise.all([
                    cargarSubclases(),
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

    const subclasesFiltradas = subclases.filter((subclase) => {

    const coincideBusqueda =
        (subclase.nombre || '').toLowerCase().includes(barraBusqueda.toLowerCase());

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
            onClick={() => navigate(`/agregar-subclase/`)}
                >
                    <FaPlus className="me-1" /> Agregar Subclase
        </Button>

        {estaCargando && <div className="text-center">Cargando datos...</div>}
        {error && <div className="alert alert-danger">Error: {error}</div>}

        {!estaCargando && !error && (
        <div className='table-responsive'>
            <table className="table table-striped table-bordered table-hover table-sm table-layout-fixed">
                <thead>
                    <tr>
                        <th>Subclase</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {subclasesFiltradas.length > 0 ? (
                    subclasesFiltradas.map((subclase) => (
                        <tr key={subclase.id}>
                            <td>{subclase.nombre}</td>
                            <td className="text-nowrap">
                                <Button variant="outline-primary" 
                                    className="me-2" 
                                    size="sm"
                                    onClick={() => navigate(`/modificar-subclase/${subclase.id}`)}>
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