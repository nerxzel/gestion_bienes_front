import { useState } from 'react';
import { Container, Spinner, Alert, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { obtenerMensajeError } from '../../utils/errorHandler';
import ResponsableForm from '../../components/MaestroResponsable/ResponsableForm'; 
import api from '../../api/axiosConfig';

function AgregarResponsable() {
    const [errorGuardar, setErrorGuardar] = useState(null);
    const [cargando, setCargando] = useState(false); 
    const navigate = useNavigate();

    const FORMULARIO_RESPONSABLE_VACIO = {nombre: '', rut: '', cargo: '', estado: 'activo' };

    const handleAgregarSubmit = async (formData) => {
        setErrorGuardar(null);
        setCargando(true);
        try {
            await api.post('/responsable/add', formData); 
            navigate('/dashboard-responsable'); 
        } catch (err) {
            const mensajeError = obtenerMensajeError(err, "Error al agregar la responsable");
            setErrorGuardar(mensajeError);
        } finally {
            setCargando(false);
        }
    };

return (
    <Container className="mt-4">
            <Card>
                <Card.Header as="h5">Agregar Nuevo Responsable</Card.Header>
                <Card.Body>
                    {errorGuardar && <Alert variant="danger" onClose={() => setErrorGuardar(null)} dismissible>{errorGuardar}</Alert>}
                        <ResponsableForm
                            initialData={FORMULARIO_RESPONSABLE_VACIO}
                            onSubmit={handleAgregarSubmit}
                            isEditing={false}
                            isSubmitting={cargando}
                        />
                </Card.Body>
            </Card>
        </Container>
    );
}

export default AgregarResponsable;