import { useState } from 'react';
import { Container, Spinner, Alert, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import UbicacionForm from '../../components/MaestroUbicaciones/UbicacionForm'; 
import api from '../../api/axiosConfig';

function AgregaUbicacion() {
    const [errorGuardar, setErrorGuardar] = useState(null);
    const [cargando, setCargando] = useState(false); 
    const navigate = useNavigate();

    const FORMULARIO_UBICACION_VACIO = {
        nombre: '' 
    };

    const handleAgregarSubmit = async (formData) => {
        if (!formData.nombre || formData.nombre.trim() === '') {
            setErrorGuardar('El nombre de la ubicación no puede estar vacío.');
            return;
        }

        setErrorGuardar(null);
        setCargando(true);
        try {
            await api.post('/ubicacion/add', formData); 
            navigate('/dashboard-ubicacion'); 
        } catch (err) {
            console.error("Error al agregar la ubicación:", err.response || err);
            const errorMsg = err.response?.data?.message || err.response?.data || "Error al guardar.";
            setErrorGuardar(errorMsg);
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
                    
                    {cargando ? (
                        <div className="text-center">
                            <Spinner animation="border" /> Guardando...
                        </div>
                    ) : (
                        <UbicacionForm
                            initialData={FORMULARIO_UBICACION_VACIO}
                            onSubmit={handleAgregarSubmit}
                            isEditing={false}
                        />
                    )}
                </Card.Body>
            </Card>
        </Container>
    );
}

export default AgregaUbicacion;