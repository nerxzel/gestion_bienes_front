import { useState } from 'react';
import { Container, Alert, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { obtenerMensajeError } from '../../../utils/errorHandler';
import UnidadesMedidaForm from '../components/UnidadesMedidaForm.jsx';
import api from '../../../api/axiosConfig';

function AgregarUnidadesMedida() {
    const [errorGuardar, setErrorGuardar] = useState(null);
    const [cargando, setCargando] = useState(false);
    const navigate = useNavigate();

    const FORMULARIO_UNIDAD_VACIO = {
        nombre: ''
    };

    const handleAgregarSubmit = async (formData) => {
        setErrorGuardar(null);
        setCargando(true);
        try {
            await api.post('/unidadMedida', formData);
            navigate('/dashboard-unidadesM');
        } catch (err) {
            const mensajeError = obtenerMensajeError(err, "Error al agregar la unidad de medida");
            setErrorGuardar(mensajeError);
        } finally {
            setCargando(false);
        }
    };

    return (
        <Container className="mt-4">
            <Card>
                <Card.Header as="h5">Agregar Nueva Unidad de Medida</Card.Header>
                <Card.Body>
                    {errorGuardar && <Alert variant="danger" onClose={() => setErrorGuardar(null)} dismissible>{errorGuardar}</Alert>}
                    <UnidadesMedidaForm
                        initialData={FORMULARIO_UNIDAD_VACIO}
                        onSubmit={handleAgregarSubmit}
                        isEditing={false}
                        isSubmitting={cargando}
                    />
                </Card.Body>
            </Card>
        </Container>
    );
}

export default AgregarUnidadesMedida;