import { useState } from 'react';
import { Container, Spinner, Alert, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { obtenerMensajeError } from '../../utils/errorHandler';
import MarcaForm from '../../components/MaestroMarca-Modelo/MarcaForm'; 
import api from '../../api/axiosConfig';

function AgregarMarca() {
    const [errorGuardar, setErrorGuardar] = useState(null);
    const [cargando, setCargando] = useState(false); 
    const navigate = useNavigate();

    const FORMULARIO_MARCA_VACIO = {nombre: '' };

    const handleAgregarSubmit = async (formData) => {
        setErrorGuardar(null);
        setCargando(true);
        try {
            await api.post('/marca/add', formData); 
            navigate('/dashboard-marca'); 
        } catch (err) {
            const mensajeError = obtenerMensajeError(err, "Error al agregar la marca");
            setErrorGuardar(mensajeError);
        } finally {
            setCargando(false);
        }
    };

return (
    <Container className="mt-4">
            <Card>
                <Card.Header as="h5">Agregar Nueva Marca</Card.Header>
                <Card.Body>
                    {errorGuardar && <Alert variant="danger" onClose={() => setErrorGuardar(null)} dismissible>{errorGuardar}</Alert>}
                        <MarcaForm
                            initialData={FORMULARIO_MARCA_VACIO}
                            onSubmit={handleAgregarSubmit}
                            isEditing={false}
                            isSubmitting={cargando}
                        />
                </Card.Body>
            </Card>
        </Container>
    );
}

export default AgregarMarca;