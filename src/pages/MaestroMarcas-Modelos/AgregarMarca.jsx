import { useState } from 'react';
import { Container, Spinner, Alert, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import MarcaForm from '../../components/MaestroMarca-Modelo/MarcaForm'; 
import api from '../../api/axiosConfig';

function AgregarMarca() {
    const [errorGuardar, setErrorGuardar] = useState(null);
    const [cargando, setCargando] = useState(false); 
    const navigate = useNavigate();

    const FORMULARIO_MARCA_VACIO = {
        nombre: '' 
    };

    const handleAgregarSubmit = async (formData) => {
        if (!formData.nombre || formData.nombre.trim() === '') {
            setErrorGuardar('El nombre de la marca no puede estar vacío.');
            return;
        }

        setErrorGuardar(null);
        setCargando(true);
        try {
            await api.post('/marca/add', formData); 
            navigate('/dashboard-marca'); 
        } catch (err) {
            console.error("Error al agregar la marca:", err.response || err);
            const errorMsg = err.response?.data?.message || err.response?.data || "Error al guardar.";
            setErrorGuardar(errorMsg);
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
                    
                    {cargando ? (
                        <div className="text-center">
                            <Spinner animation="border" /> Guardando...
                        </div>
                    ) : (
                        <MarcaForm
                            initialData={FORMULARIO_MARCA_VACIO}
                            onSubmit={handleAgregarSubmit}
                            isEditing={false}
                        />
                    )}
                </Card.Body>
            </Card>
        </Container>
    );
}

export default AgregarMarca;