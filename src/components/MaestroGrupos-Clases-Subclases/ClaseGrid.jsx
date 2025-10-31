import { Form, Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { FaPencilAlt, FaPlus } from 'react-icons/fa';
import api from '../../api/axiosConfig';

function ClaseGrid() {
    const [clases, setClases] = useState([]);
    const [barraBusqueda, setBarraBusqueda] = useState('');

    const [error, setError] = useState(null);
    const [estaCargando, setEstaCargando] = useState(true);

    const navigate = useNavigate();

    const cargarClases = async () => {
        try {
            const respuesta = await api.get('/clase/all');
            setClases(respuesta.data || []);
        } catch (err) {
            console.error('Error detallado al cargar clases:', err);
            setError("Error al cargar la lista de clases.");
            setClases([]);
        }
    };

    useEffect(() => {
        const loadData = async () => {
            setEstaCargando(true);
            setError(null);
            try {
                await Promise.all([
                    cargarClases(),
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

    const clasesFiltradas = clases.filter((clase) => {

    const coincideBusqueda =
        (clase.nombre || '').toLowerCase().includes(barraBusqueda.toLowerCase());

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
            onClick={() => navigate(`/agregar-clase/`)}
                >
                    <FaPlus className="me-1" /> Agregar Clase
        </Button>

        {estaCargando && <div className="text-center">Cargando datos...</div>}
        {error && <div className="alert alert-danger">Error: {error}</div>}

        {!estaCargando && !error && (
        <div className='table-responsive'>
            <table className="table table-striped table-bordered table-hover table-sm table-layout-fixed">
                <thead>
                    <tr>
                        <th>Clases</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {clasesFiltradas.length > 0 ? (
                    clasesFiltradas.map((clase) => (
                        <tr key={clase.id}>
                            <td>{clase.nombre}</td>
                            <td className="text-nowrap">
                                <Button variant="outline-primary" 
                                    className="me-2" 
                                    size="sm"
                                    onClick={() => navigate(`/modificar-clase/${clase.id}`)}>
                                <FaPencilAlt />
                                </Button>
                            </td>
                        </tr>))
                            ) : (
                        <tr>
                            <td colSpan="8" className="text-center">No se encontraron clases.</td>
                        </tr>)}
                </tbody>
            </table>
        </div>
            )}
        </>
    );
}

export default ClaseGrid;