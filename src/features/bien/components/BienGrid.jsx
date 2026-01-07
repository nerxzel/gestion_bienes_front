import { Form, Row, Col, Button, Modal, Placeholder } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { FaPencilAlt, FaPlus, FaArrowDown, FaArrowUp, } from 'react-icons/fa';
import { formatCLP, formatDate } from '../../../utils/formatUtils';
import { useBienes } from '../../../hooks/useBienes';

function BienGrid() {
    const [barraBusqueda, setBarraBusqueda] = useState('');
    const [modal, setModal] = useState(false)
    const [filtroCondicion, setFiltroCondicion] = useState('Todas');
    const { bienes, estaCargando, error } = useBienes()

    const navigate = useNavigate();

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
                    <option value="Pendiente">Pendiente</option>
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

            </div>

            {error && <div className="alert alert-danger">Error: {error}</div>}

            {!error && (
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
                                <th>Estado</th>
                                <th className="truncate-cell">Última Depreciación</th>
                                <th>Valor</th>
                                <th>Acciones</th>

                            </tr>
                        </thead>
                        <tbody>
                            {estaCargando ? (
                                [...Array(5)].map((_, index) => (
                                    <tr key={index}>
                                        {[...Array(11)].map((_, colIndex) => (
                                            <td key={colIndex}>
                                                <Placeholder as="p" animation="glow" className="mb-0">
                                                    <Placeholder xs={12} size="sm" bg="secondary" />
                                                </Placeholder>
                                            </td>
                                        ))}
                                    </tr>
                                ))
                            ) : (
                                bienesFiltrados.length > 0 ? (
                                    bienesFiltrados.map((bien) => (
                                        <tr key={bien.codigoInventario}>
                                            <td className="truncate-cell">{bien.codigoInventario}</td>
                                            <td className="truncate-cell" title={bien.nombre}>{bien.nombre}</td>
                                            <td className="truncate-cell" title={bien.grupo}>{bien.grupo}</td>
                                            <td className="truncate-cell" title={bien.clase}>{bien.clase}</td>
                                            <td className="truncate-cell" title={bien.subclase}>{bien.subclase}</td>
                                            <td className="truncate-cell" >{formatDate(bien.fechaIngreso)}</td>
                                            <td className="truncate-cell" title={bien.condicion}>{bien.condicion}</td>
                                            <td>{bien.estado}</td>
                                            <td className="truncate-cell">{formatDate(bien.ultimaDepreciacion)}</td>
                                            <td>{formatCLP(bien.valor)}</td>
                                            <td className="text-nowrap">
                                                <Button variant="outline-primary"
                                                    className="me-2"
                                                    size="sm"
                                                    onClick={() => navigate(`/modificar-bien/${bien.id}`)}
                                                    title="Modificar Bien">
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
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="11" className="text-center">No se encontraron bienes.</td>
                                    </tr>
                                )
                            )}
                        </tbody>
                    </table>
                </div>
            )}

            <Modal show={modal} onHide={() => setModal(false)} centered>
                <Modal.Title>
                    <Modal.Header>Alta y Baja de bienes</Modal.Header>
                </Modal.Title>
                <Modal.Body>En estos momentos esta función se encuentra en desarrollo. Gracias por su paciencia.</Modal.Body>

            </Modal>


        </>
    );
}

export default BienGrid;