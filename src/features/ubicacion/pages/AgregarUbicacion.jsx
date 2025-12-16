import { useState } from 'react';
import { Container, Alert, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { obtenerMensajeError } from '../../../utils/errorHandler';
import UbicacionForm from '../components/UbicacionForm.jsx';
import api from '../../../api/axiosConfig';

function AgregaUbicacion() {
    const [errorGuardar, setErrorGuardar] = useState(null);
    const [cargando, setCargando] = useState(false);
    const navigate = useNavigate();

    const FORMULARIO_UBICACION_VACIO = { nombre: '' };

    const handleAgregarSubmit = async (formData) => {
        setErrorGuardar(null);
        setCargando(true);
        try {
            await api.post('/ubicacion/add', formData);
            navigate('/dashboard-ubicacion');
        } catch (err) {
            const mensajeError = obtenerMensajeError(err, "Error al agregar la ubicación");
            setErrorGuardar(mensajeError);
        } finally {
            setCargando(false);
        }
    };

    return (
        <Container className="mt-4">
            <Card>
                <Card.Header as="h5">Agregar Nueva Ubicación</Card.Header>
                <Card.Body>
                    {errorGuardar && <Alert variant="danger" onClose={() => setErrorGuardar(null)} dismissible>{errorGuardar}</Alert>}
                    <UbicacionForm
                        initialData={FORMULARIO_UBICACION_VACIO}
                        onSubmit={handleAgregarSubmit}
                        isEditing={false}
                        isSubmitting={cargando}
                    />
                </Card.Body>
            </Card>
        </Container>
    );
}

export default AgregaUbicacion;