import { useState, useEffect } from 'react';
import { Container, Card, Form, Button, Row, Col, Spinner, Alert } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import { obtenerMensajeError } from '../../utils/errorHandler';
import { normalizarCondicion, esAlta, CONDICION } from '../../utils/condicionUtils';
import api from '../../api/axiosConfig';

function AltaForm() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [bienData, setBienData] = useState(null);
    const [cargando, setCargando] = useState(true);
    const [procesando, setProcesando] = useState(false);
    const [error, setError] = useState(null);
    const [exitoso, setExitoso] = useState(false);

    useEffect(() => {
        const cargarBien = async () => {
            if (!id) {
                setError("No se especificó un ID.");
                setCargando(false);
                return;
            }

            setCargando(true);
            setError(null);

            try {
                const response = await api.get(`/bien/${id}`);
                const bienNormalizado = {
                    ...response.data,
                    condicion: normalizarCondicion(response.data.condicion)
                };
                setBienData(bienNormalizado);
            } catch (err) {
                const mensajeError = obtenerMensajeError(err, `Error al cargar el bien con ID ${id}`);
                setError(mensajeError);
            } finally {
                setCargando(false);
            }
        };

        cargarBien();
    }, [id]);

    const handleDarDeAlta = async () => {
        setProcesando(true);
        setError(null);

        try {
            await api.put(`/bien/alta/${id}`);
            const responseActualizada = await api.get(`/bien/${id}`);
            console.log('Respuesta de la segunda llamada:', responseActualizada.data);

            const bienActualizado = {
                ...responseActualizada.data,
                condicion: normalizarCondicion(responseActualizada.data.condicion)
                };
            setBienData(bienActualizado);
            setExitoso(true);
        } catch (err) {
            const mensajeError = obtenerMensajeError(err, "Error al dar de alta el bien");
            setError(mensajeError);
        } finally {
            setProcesando(false);
        }
    };

    const formatDate = (dateString) => {
        if (!dateString) return '';
        return dateString.split('T')[0];
    };

    if (cargando) {
        return (
            <Container className="mt-4 text-center">
                <Spinner animation="border" /> Cargando datos del bien...
            </Container>
        );
    }

    if (error && !bienData) {
        return (
            <Container className="mt-4">
                <Alert variant="danger">{error}</Alert>
                <Button variant="secondary" onClick={() => navigate('/dashboard')}>
                    Volver al Listado
                </Button>
            </Container>
        );
    }

    if (!bienData) {
        return (
            <Container className="mt-4">
                <Alert variant="warning">No se pudieron cargar los datos del bien.</Alert>
                <Button variant="secondary" onClick={() => navigate('/dashboard')}>
                    Volver al Listado
                </Button>
            </Container>
        );
    }

    const yaEstaDeAlta = esAlta(bienData?.condicion);

    return (
        <Container className="mt-4">
            <Card>
                <Card.Header as="h5" className="bg-success text-white">
                    Dar de Alta
                </Card.Header>
                <Card.Body>
                    {error && <Alert variant="danger" onClose={() => setError(null)} dismissible>{error}</Alert>}
                    {exitoso && (
                        <Alert variant="success" onClose={() => setExitoso(false)} dismissible>
                            ¡El bien ha sido dado de alta exitosamente!
                        </Alert>
                    )}

                    {yaEstaDeAlta && !exitoso && (
                        <Alert variant="info">
                            Este bien ya se encuentra en condición de <strong>Alta</strong>.
                        </Alert>
                    )}

                    <Form>
                        <h6 className="text-muted mb-3">Información del Bien</h6>
                        
                        <Row className="mb-3">
                            <Form.Group as={Col} md="4">
                                <Form.Label>Código Inventario</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={bienData.codigoInventario || ''}
                                    readOnly
                                    className="bg-light"
                                />
                            </Form.Group>
                            <Form.Group as={Col} md="8">
                                <Form.Label>Descripción Corta</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={bienData.nombre || ''}
                                    readOnly
                                    className="bg-light"
                                />
                            </Form.Group>
                        </Row>

                        <Row className="mb-3">
                            <Form.Group as={Col} md="6">
                                <Form.Label>Condición Actual</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={bienData.condicion || ''}
                                    readOnly
                                    className={esAlta(bienData.condicion) ? 'bg-success-subtle' : 'bg-danger-subtle'}
                                />
                            </Form.Group>
                            <Form.Group as={Col} md="6">
                                <Form.Label>Fecha Ingreso</Form.Label>
                                <Form.Control
                                    type="date"
                                    value={formatDate(bienData.fechaIngreso)}
                                    readOnly
                                    className="bg-light"
                                />
                            </Form.Group>
                        </Row>

                        <hr className="my-4" />

                        <h6 className="text-muted mb-3">Información de Resolución</h6>
                        
                        <Row className="mb-3">
                            <Form.Group as={Col} md="6">
                                <Form.Label>Número de Resolución</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={bienData.nroResolucion || '(Sin asignar)'}
                                    readOnly
                                    className={exitoso ? 'bg-success-subtle' : 'bg-light'}
                                />
                                {!bienData.nroResolucion && !exitoso && (
                                    <Form.Text className="text-muted">
                                        Se asignará automáticamente al dar de alta
                                    </Form.Text>
                                )}
                            </Form.Group>
                            <Form.Group as={Col} md="6">
                                <Form.Label>Fecha de Resolución</Form.Label>
                                <Form.Control
                                    type="date"
                                    value={formatDate(bienData.fechaResolucion)}
                                    readOnly
                                    className={exitoso ? 'bg-success-subtle' : 'bg-light'}
                                />
                                {!bienData.fechaResolucion && !exitoso && (
                                    <Form.Text className="text-muted">
                                        Se asignará la fecha actual al dar de alta
                                    </Form.Text>
                                )}
                            </Form.Group>
                        </Row>

                        {exitoso && (
                            <Alert variant="success" className="mt-3">
                                <strong>Datos de Alta:</strong>
                                <ul className="mb-0 mt-2">
                                    <li>Número de Resolución: <strong>{bienData.nroResolucion}</strong></li>
                                    <li>Fecha de Resolución: <strong>{formatDate(bienData.fechaResolucion)}</strong></li>
                                    <li>Nueva Condición: <strong>{CONDICION.ALTA}</strong></li>
                                </ul>
                            </Alert>
                        )}

                        {/* Botones de acción */}
                        <div className="d-flex justify-content-end mt-4">
                            <Button
                                variant="secondary"
                                onClick={() => navigate('/dashboard')}
                                className="me-2"
                                disabled={procesando}>
                                {exitoso ? 'Volver al Listado' : 'Cancelar'}
                            </Button>
                            
                            {!exitoso && (
                                <Button
                                    variant="success"
                                    onClick={handleDarDeAlta}
                                    disabled={procesando || yaEstaDeAlta}>
                                    {procesando ? (
                                        <>
                                            <Spinner animation="border" size="sm" className="me-2" />
                                            Procesando...
                                        </>
                                    ) : (
                                        'Dar de Alta'
                                    )}
                                </Button>
                            )}
                        </div>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
}

export default AltaForm;