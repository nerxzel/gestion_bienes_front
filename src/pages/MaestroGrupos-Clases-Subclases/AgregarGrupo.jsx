import { useState } from 'react';
import { Container, Spinner, Alert, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import GrupoForm from '../../components/MaestroGrupos-Clases-Subclases/GrupoForm'; 
import api from '../../api/axiosConfig';

function AgregarGrupo() {
    const [errorGuardar, setErrorGuardar] = useState(null);
    const [cargando, setCargando] = useState(false); 
    const navigate = useNavigate();

    const FORMULARIO_GRUPO_VACIO = {
        nombre: '', vidaUtil: 1
    };

    const handleAgregarSubmit = async (formData) => {
        if (!formData.nombre || formData.nombre.trim() === '') {
            setErrorGuardar('El nombre del grupo no puede estar vacío.');
            return;
        }

        setErrorGuardar(null);
        setCargando(true);
        try {
            await api.post('/grupo/add', formData); 
            navigate('/dashboard-grupo'); 
        } catch (err) {
            console.error("Error al agregar el grupo:", err.response || err);
            const errorMsg = err.response?.data?.message || err.response?.data || "Error al guardar.";
            setErrorGuardar(errorMsg);
        } finally {
            setCargando(false);
        }
    };

  return (
    <Container className="mt-4">
            <Card>
                <Card.Header as="h5">Agregar Nuevo Grupo</Card.Header>
                <Card.Body>
                    {errorGuardar && <Alert variant="danger" onClose={() => setErrorGuardar(null)} dismissible>{errorGuardar}</Alert>}
                    
                    {cargando ? (
                        <div className="text-center">
                            <Spinner animation="border" /> Guardando...
                        </div>
                    ) : (
                        <GrupoForm
                            initialData={FORMULARIO_GRUPO_VACIO}
                            onSubmit={handleAgregarSubmit}
                            isEditing={false}
                        />
                    )}
                </Card.Body>
            </Card>
        </Container>
    );
}

export default AgregarGrupo;