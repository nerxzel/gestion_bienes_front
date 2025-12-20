import { Container, Card, Button, Spinner, Alert, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAltaBaja } from '../../../hooks/useAltaBaja';
import { AltaBajaDetalle } from '../components/AltaBajaDetalle.jsx';
import { esAlta } from '../../../utils/condicionUtils';

function AltaForm() {
    const navigate = useNavigate();

    const { 
        bienData, error, exitoso, status,
        handleConfirmarAccion, handleLimpiarError, handleLimpiarExito 
    } = useAltaBaja('/bien/alta'); 

    if (status.cargando) return (
        <Container className="mt-4 text-center">
            <Spinner animation="border" /> Cargando datos...
        </Container>
    );

    if (!bienData && error) return (
        <Container className="mt-4">
            <Alert variant="danger">{error}</Alert>
            <Button onClick={() => navigate('/dashboard')}>Volver</Button>
        </Container>
    );

    const yaEstaDeAlta = esAlta(bienData?.condicion);

    return (
        <Container className="mt-4">
            <Card>
                <Card.Header as="h5" className="bg-success text-white">Dar de Alta</Card.Header>
                <Card.Body>
                    {error && <Alert variant="danger" onClose={handleLimpiarError} dismissible>{error}</Alert>}
                    {exitoso && <Alert variant="success" onClose={handleLimpiarExito} dismissible>¡Bien dado de alta exitosamente!</Alert>}
                    
                    {yaEstaDeAlta && !exitoso && (
                        <Alert variant="warning">Este bien ya se encuentra de <strong>Alta</strong>.</Alert>
                    )}

                    <Form>
                        <AltaBajaDetalle bien={bienData} exitoso={exitoso} tipoAccion="alta" />

                        <div className="d-flex justify-content-end mt-4">
                            <Button variant="secondary" onClick={() => navigate('/dashboard')} className="me-2" disabled={status.procesando}>
                                {exitoso ? 'Volver al Listado' : 'Cancelar'}
                            </Button>
                            
                            {!exitoso && (
                                <Button 
                                    variant="success" 
                                    onClick={handleConfirmarAccion} 
                                    disabled={status.procesando || yaEstaDeAlta}
                                >
                                    {status.procesando ? <><Spinner size="sm" className="me-2"/> Procesando...</> : 'Confirmar Alta'}
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