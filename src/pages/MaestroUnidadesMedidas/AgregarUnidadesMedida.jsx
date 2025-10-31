import { useState } from 'react';
import { Container, Spinner, Alert, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import UnidadesMedidaForm from '../../components/MaestroUnidadesMedidas/UnidadesMedidaForm'; 
import api from '../../api/axiosConfig';

function AgregarUnidadesMedida() {
    const [errorGuardar, setErrorGuardar] = useState(null);
    const [cargando, setCargando] = useState(false); 
    const navigate = useNavigate();

    const FORMULARIO_UNIDAD_VACIO = {
        nombre: '' 
    };

    const handleAgregarSubmit = async (formData) => {
        if (!formData.nombre || formData.nombre.trim() === '') {
            setErrorGuardar('El nombre de la unidad de medida no puede estar vacío.');
            return;
        }

        setErrorGuardar(null);
        setCargando(true);
        try {
            await api.post('/unidadMedida/add', formData); 
            navigate('/dashboard-unidadesM'); 
        } catch (err) {
            console.error("Error al agregar la unidad de medida:", err.response || err);
            const errorMsg = err.response?.data?.message || err.response?.data || "Error al guardar.";
            setErrorGuardar(errorMsg);
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
                    
                    {cargando ? (
                        <div className="text-center">
                            <Spinner animation="border" /> Guardando...
                        </div>
                    ) : (
                        <UnidadesMedidaForm
                            initialData={FORMULARIO_UNIDAD_VACIO}
                            onSubmit={handleAgregarSubmit}
                            isEditing={false}
                        />
                    )}
                </Card.Body>
            </Card>
        </Container>
    );
}

export default AgregarUnidadesMedida;