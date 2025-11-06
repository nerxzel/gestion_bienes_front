import { Form, Row, Col, Button, Modal, Alert, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { FaPencilAlt, FaPlus, FaArrowDown, FaArrowUp, FaCalculator} from 'react-icons/fa';
import { manejarErrorAPI } from '../../utils/errorHandler';
import api from '../../api/axiosConfig';
import { normalizarCondicion } from '../../utils/condicionUtils';
import { formatCLP } from '../../utils/formatUtils';

function BienGrid() {
    const [bienes, setBienes] = useState([]);
    const [barraBusqueda, setBarraBusqueda] = useState('');
    const [filtroCondicion, setFiltroCondicion] = useState('Todas');

    const [error, setError] = useState(null);
    const [estaCargando, setEstaCargando] = useState(true);

    const [showDepreciateModal, setShowDepreciateModal] = useState(false);
    const [isDepreciating, setIsDepreciating] = useState(false);
    const [depreciateError, setDepreciateError] = useState(null);

    const navigate = useNavigate();

    const cargarBienes = async () => {
        try {
            const respuesta = await api.get('/bien/grid');
            const bienesNormalizados = (respuesta.data || []).map(bien => ({...bien, condicion: normalizarCondicion(bien.condicion)}));
            setBienes(bienesNormalizados);
        } catch (err) {
            const mensajeError = manejarErrorAPI(err);
            setError(mensajeError);
            setBienes([]);
        }
    };
  
    useEffect(() => {
        const loadData = async () => {
            setEstaCargando(true);
            setError(null);
            await cargarBienes();
            setEstaCargando(false);
        };
        loadData();
    }, []);

    const handleDepreciarBienes = async () => {
        setIsDepreciating(true);
        setDepreciateError(null);
        
        try {
            await api.post('/bien/depreciar');
            setShowDepreciateModal(false);
            await cargarBienes(); 

        } catch (err) {
            const mensajeError = manejarErrorAPI(err);
            setDepreciateError(mensajeError);
        } finally {
            setIsDepreciating(false);
        }
    };

    const bienesFiltrados = bienes.filter((bien) => {

      const coincideBusqueda =
        (bien.nombre || '').toLowerCase().includes(barraBusqueda.toLowerCase()) ||
        (bien.codigoInventario || '').toLowerCase().includes(barraBusqueda.toLowerCase());

      const barraCondicion =
        filtroCondicion === 'Todas' || 
        (bien.condicion || '') === filtroCondicion;

        return coincideBusqueda && barraCondicion
      }
    );

    return (
        <>
          <Row className="mb-3 align-items-center">
            <Col sm={3}><Form.Label id='filtrar-por-condicion' htmlFor="filtro-condicion" className="mb-0">Filtrar por condicion</Form.Label></Col>

            <Col sm={4}><Form.Select className='mb-3'
                value={filtroCondicion}
                onChange={(e) => setFiltroCondicion(e.target.value)}>
                <option value="Alta">Alta</option>
                <option value="Baja">Baja</option>
                <option value="Todas">Todas</option>
            </Form.Select></Col>
          </Row>
          
          <Row className="mb-3 align-items-center">
            <Col sm={3}><Form.Label id='barra-busqueda' htmlFor="barra-busqueda" className="mb-0">Buscar</Form.Label></Col>

            <Col sm={4}><Form.Control  
                placeholder="Buscar por Código o Nombre..."
                value={barraBusqueda}
                onChange={(e) => setBarraBusqueda(e.target.value)}
            /></Col>
          </Row>
          <div className='mb-3'>
          <Button 
              variant="success" 
              onClick={() => navigate(`/agregar-bien/`)}
                  >
                    <FaPlus className="me-1" /> Agregar Bien
          </Button>

          <Button 
                className='ms-2'
                variant="warning" 
                onClick={() => setShowDepreciateModal(true)}
            >
                <FaCalculator className="me-1" /> Depreciar Bienes
            </Button>

        </div>
        {estaCargando && <div className="text-center">Cargando datos...</div>}
        {error && <div className="alert alert-danger">Error: {error}</div>}

        {!estaCargando && !error && (
        <div className='table-responsive'>
            <table className="table table-striped table-bordered table-hover table-sm table-layout-fixed">
                <thead>
                    <tr>
                        <th className="truncate-cell">Código Inv</th>
                        <th className="truncate-cell">Descripción Corta</th>
                        <th className="truncate-cell">Grupo</th>
                        <th className="truncate-cell">Clase</th>
                        <th className="truncate-cell">Sub Clase</th>
                        <th className="truncate-cell">Fecha Ingreso</th>
                        <th className="truncate-cell">Condición</th>
                        <th className="truncate-cell">Última Depreciación</th>
                        <th>Valor</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                {bienesFiltrados.length > 0 ? (
                    bienesFiltrados.map((bien) => (
                        <tr key={bien.codigoInventario}>
                            <td className="truncate-cell">{bien.codigoInventario}</td>
                            <td className="truncate-cell">{bien.nombre}</td>
                            <td className="truncate-cell">{bien.grupo}</td>
                            <td className="truncate-cell">{bien.clase}</td>
                            <td className="truncate-cell">{bien.subClase}</td>
                            <td className="truncate-cell">{bien.fechaAdquisicion}</td>
                            <td className="truncate-cell">{bien.condicion}</td>
                            <td className="truncate-cell">{bien.ultimaDepreciacion}</td>
                            <td>{formatCLP(bien.valor)}</td>
                            <td className="text-nowrap">
                            <Button variant="outline-primary" 
                                    className="me-2" 
                                    size="sm"
                                    onClick={() => navigate(`/modificar-bien/${bien.id}`)}>
                                <FaPencilAlt />
                            </Button>

                            <Button 
                                    variant="outline-success" 
                                    className="me-2" 
                                    size="sm"
                                    onClick={() => navigate(`/dar-alta/${bien.id}`)}
                                    title="Dar de Alta">
                                <FaArrowUp />
                            </Button>
                                            
                            <Button 
                                    variant="outline-danger" 
                                    size="sm"
                                    onClick={() => navigate(`/dar-baja/${bien.id}`)}
                                    title="Dar de Baja">
                                    <FaArrowDown />
                            </Button>
                            </td>
                        </tr>))
                            ) : (
                        <tr>
                            <td colSpan="8" className="text-center">No se encontraron bienes.</td>
                        </tr>)}
                </tbody>
            </table>
        </div>
            )}

        <Modal show={showDepreciateModal} onHide={() => setShowDepreciateModal(false)} centered>
            <Modal.Header closeButton>
                <Modal.Title>Confirmar Depreciación Masiva</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Estás a punto de recalcular el valor para <strong>todos los bienes</strong> del sistema basado en su costo de adquisición y años de depreciación.</p>
                <p className="fw-bold">Esta acción es irreversible y actualizará la información del "Valor" y "Última Depreciación".</p>
                <p>¿Estás seguro de que deseas continuar?</p>
                
                {depreciateError && <Alert variant="danger">{depreciateError}</Alert>}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => setShowDepreciateModal(false)} disabled={isDepreciating}>
                    Cancelar
                </Button>
                <Button 
                    variant="warning" 
                    onClick={handleDepreciarBienes}
                    disabled={isDepreciating}
                >
                    {isDepreciating ? (
                        <>
                            <Spinner as="span" animation="border" size="sm" className="me-2" />
                            Procesando...
                        </>
                    ) : (
                        'Sí, ejecutar depreciación'
                    )}
                </Button>
            </Modal.Footer>
        </Modal>
        </>
    );
}

export default BienGrid;