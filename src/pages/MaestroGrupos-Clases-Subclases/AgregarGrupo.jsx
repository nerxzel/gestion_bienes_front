import { useState } from 'react';
import { Container, Alert, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { obtenerMensajeError } from '../../utils/errorHandler';
import GrupoForm from '../../components/MaestroGrupos-Clases-Subclases/GrupoForm'; 
import api from '../../api/axiosConfig';

function AgregarGrupo() {
    const [errorGuardar, setErrorGuardar] = useState(null);
    const [cargando, setCargando] = useState(false); 
    const navigate = useNavigate();

    const FORMULARIO_GRUPO_VACIO = { nombre: '', vidaUtil: ''};

    const handleAgregarSubmit = async (formData) => {
        setErrorGuardar(null);
        setCargando(true);
        try {
            await api.post('/grupo/add', formData); 
            navigate('/dashboard-grupo'); 
        } catch (err) {
            const mensajeError = obtenerMensajeError(err, "Error al agregar el grupo");
            setErrorGuardar(mensajeError);
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
                        <GrupoForm
                            initialData={FORMULARIO_GRUPO_VACIO}
                            onSubmit={handleAgregarSubmit}
                            isEditing={false}
                            isSubmitting={cargando}
                        />
                </Card.Body>
            </Card>
        </Container>
    );
}

export default AgregarGrupo;