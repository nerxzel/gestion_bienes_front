import { Form, Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { FaPencilAlt, FaPlus } from 'react-icons/fa';
import { manejarErrorAPI } from '../../utils/errorHandler';
import api from '../../api/axiosConfig';

function MarcaGrid() {
    const [marcas, setMarcas] = useState([]);
    const [barraBusqueda, setBarraBusqueda] = useState('');

    const [error, setError] = useState(null);
    const [estaCargando, setEstaCargando] = useState(true);

    const navigate = useNavigate();

    const cargarMarcas = async () => {
        try {
            const respuesta = await api.get('/marca/all');
            setMarcas(respuesta.data || []);
        } catch (err) {
            const mensajeError = manejarErrorAPI(err);
            setError(mensajeError);
            setMarcas([]);
        }
    };

    useEffect(() => {
        const loadData = async () => {
            setEstaCargando(true);
            setError(null);
            await cargarMarcas();
            setEstaCargando(false);
        };
        loadData();
    }, []);

    const marcasFiltradas = marcas.filter((marca) => (marca.nombre || '').toLowerCase().includes(barraBusqueda.toLowerCase()));
    
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
            onClick={() => navigate(`/agregar-marca/`)}
                >
                    <FaPlus className="me-1" /> Agregar Marca
        </Button>

        {estaCargando && <div className="text-center">Cargando datos...</div>}
        {error && <div className="alert alert-danger">Error: {error}</div>}

        {!estaCargando && !error && (
        <div className='table-responsive'>
            <table className="table table-striped table-bordered table-hover table-sm table-layout-fixed">
                <thead>
                    <tr>
                        <th>Marcas</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {marcasFiltradas.length > 0 ? (
                    marcasFiltradas.map((marca) => (
                        <tr key={marca.id}>
                            <td>{marca.nombre}</td>
                            <td className="text-nowrap">
                                <Button variant="outline-primary" 
                                    className="me-2" 
                                    size="sm"
                                    onClick={() => navigate(`/modificar-marca/${marca.id}`)}>
                                <FaPencilAlt />
                                </Button>
                            </td>
                        </tr>))
                            ) : (
                        <tr>
                            <td colSpan="8" className="text-center">No se encontraron marcas.</td>
                        </tr>)}
                </tbody>
            </table>
        </div>
            )}
        </>
    );
}

export default MarcaGrid;