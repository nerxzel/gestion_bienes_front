import { Container, Card, Button, Spinner, Alert, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAltaBaja } from '../../../hooks/useAltaBaja.js';
import { AltaBajaDetalle } from '../components/AltaBajaDetalle.jsx';
import { esBaja } from '../../../utils/condicionUtils';

function BajaForm() {
    const navigate = useNavigate();

    const { 
        bienData, error, exitoso, status,
        handleConfirmarAccion, handleLimpiarError, handleLimpiarExito 
    } = useAltaBaja('/bien/baja'); 

    if (status.cargando) return <Container className="mt-4 text-center"><Spinner animation="border" /></Container>;
    if (!bienData && error) return <Container className="mt-4"><Alert variant="danger">{error}</Alert></Container>;

    const yaEstaDeBaja = esBaja ? esBaja(bienData?.condicion) : (bienData?.condicion === 'Baja' || bienData?.condicion === 'En desuso');

    return (
        <Container className="mt-4">
            <Card>
                <Card.Header as="h5" className="bg-danger text-white">Dar de Baja</Card.Header>
                <Card.Body>
                    {error && <Alert variant="danger" onClose={handleLimpiarError} dismissible>{error}</Alert>}
                    {exitoso && <Alert variant="success" onClose={handleLimpiarExito} dismissible>¡Bien dado de baja exitosamente!</Alert>}
                    
                    {yaEstaDeBaja && !exitoso && (
                        <Alert variant="warning">Este bien ya se encuentra de <strong>Baja</strong>.</Alert>
                    )}

                    <Form>
                        <AltaBajaDetalle bien={bienData} exitoso={exitoso} tipoAccion="baja" />

                        <div className="d-flex justify-content-end mt-4">
                            <Button variant="secondary" onClick={() => navigate('/dashboard')} className="me-2" disabled={status.procesando}>
                                {exitoso ? 'Volver al Listado' : 'Cancelar'}
                            </Button>
                            
                            {!exitoso && (
                                <Button 
                                    variant="danger" 
                                    onClick={handleConfirmarAccion} 
                                    disabled={status.procesando || yaEstaDeBaja}
                                >
                                    {status.procesando ? <><Spinner size="sm" className="me-2"/> Procesando...</> : 'Confirmar Baja'}
                                </Button>
                            )}
                        </div>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
}

export default BajaForm;