import { Form, Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { FaPencilAlt, FaPlus, FaTrash, FaTimes } from 'react-icons/fa';
import api from '../../api/axiosConfig';

function BienGrid() {
    const [bienes, setBienes] = useState([]);
    const [barraBusqueda, setBarraBusqueda] = useState('');
    const [filtroCondicion, setFiltroCondicion] = useState('Todas');

    const [error, setError] = useState(null);
    const [estaCargando, setEstaCargando] = useState(true);

    const navigate = useNavigate();

    const cargarBienes = async () => {
        try {
            const respuesta = await api.get('/bien/grid');
            setBienes(respuesta.data || []);
        } catch (err) {
            console.error('Error detallado al cargar bienes:', err);
            setError("Error al cargar la lista de bienes.");
            setBienes([]);
        }
    };

  
    useEffect(() => {
        const loadData = async () => {
            setEstaCargando(true);
            setError(null);
            try {
                await Promise.all([
                    cargarBienes(),
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

    const bienesFiltrados = bienes.filter((bien) => {

      const coincideBusqueda =
        (bien.descripcionCorta || '').toLowerCase().includes(barraBusqueda.toLowerCase()) ||
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
          
          <Button 
              variant="success" 
              className="mb-3"
              onClick={() => navigate(`/agregar-bien/`)}
                  >
                    <FaPlus className="me-1" /> Agregar Bien
          </Button>

        {estaCargando && <div className="text-center">Cargando datos...</div>}
        {error && <div className="alert alert-danger">Error: {error}</div>}

        {!estaCargando && !error && (
          <div className='table-responsive'>
            <table className="table table-striped table-bordered table-hover table-sm table-layout-fixed">
                <thead>
                    <tr>
                        <th>Código Inv</th>
                        <th>Descripción Corta</th>
                        <th>Grupo</th>
                        <th>Clase</th>
                        <th>Sub Clase</th>
                        <th>Fecha Ingreso</th>
                        <th>Condición</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                 {bienesFiltrados.length > 0 ? (
                    bienesFiltrados.map((bien) => (
                          <tr key={bien.codigoInventario}>
                            <td>{bien.codigoInventario}</td>
                            <td>{bien.descripcionCorta}</td>
                            <td>{bien.grupo}</td>
                            <td>{bien.clase}</td>
                            <td>{bien.subClase}</td>
                            <td>{bien.fechaAdquisicion}</td>
                            <td>{bien.condicion}</td>
                            <td className="text-nowrap">
                              <Button variant="outline-primary" 
                                      className="me-2" 
                                      size="sm"
                                      onClick={() => navigate(`/modificar-bien/${bien.id}`)}>
                                  <FaPencilAlt />
                              </Button>
                              <Button variant="danger" size="sm">
                                  <FaTrash />
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
        </>
    );
}

export default BienGrid;