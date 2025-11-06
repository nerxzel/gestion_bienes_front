import { Form, Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { FaPencilAlt, FaPlus } from 'react-icons/fa';
import { manejarErrorAPI } from '../../utils/errorHandler';
import api from '../../api/axiosConfig';

function GrupoGrid() {
    const [grupos, setGrupos] = useState([]);
    const [barraBusqueda, setBarraBusqueda] = useState('');

    const [error, setError] = useState(null);
    const [estaCargando, setEstaCargando] = useState(true);

    const navigate = useNavigate();

    const cargarGrupos = async () => {
        try {
            const respuesta = await api.get('/grupo/all');
            setGrupos(respuesta.data || []);
        } catch (err) {
            const mensajeError = manejarErrorAPI(err);
            setError(mensajeError);
            setGrupos([]);
        }
    };

    useEffect(() => {
        const loadData = async () => {
            setEstaCargando(true);
            setError(null);
            await cargarGrupos();
            setEstaCargando(false);
        };
        loadData();
    }, []);

    const gruposFiltrados = grupos.filter((grupo) => (grupo.nombre || '').toLowerCase().includes(barraBusqueda.toLowerCase()));

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
            onClick={() => navigate(`/agregar-grupo/`)}
                >
                    <FaPlus className="me-1" /> Agregar Grupo
        </Button>

        {estaCargando && <div className="text-center">Cargando datos...</div>}
        {error && <div className="alert alert-danger">Error: {error}</div>}

        {!estaCargando && !error && (
        <div className='table-responsive'>
            <table className="table table-striped table-bordered table-hover table-sm table-layout-fixed">
                <thead>
                    <tr>
                        <th>Grupos</th>
                        <th>Años depreciación</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {gruposFiltrados.length > 0 ? (
                    gruposFiltrados.map((grupo) => (
                        <tr key={grupo.id}>
                            <td>{grupo.nombre}</td>
                            <td>{grupo.vidaUtil}</td>
                            <td className="text-nowrap">
                                <Button variant="outline-primary" 
                                    className="me-2" 
                                    size="sm"
                                    onClick={() => navigate(`/modificar-grupo/${grupo.id}`)}>
                                <FaPencilAlt />
                                </Button>
                            </td>
                        </tr>))
                            ) : (
                        <tr>
                            <td colSpan="8" className="text-center">No se encontraron grupos.</td>
                        </tr>)}
                </tbody>
            </table>
        </div>
            )}
        </>
    );
}

export default GrupoGrid;