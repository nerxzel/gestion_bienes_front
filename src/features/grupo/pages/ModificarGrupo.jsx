import { useState, useEffect } from 'react';
import { Container, Spinner, Alert, Card } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import { obtenerMensajeError } from '../../../utils/errorHandler';
import GrupoForm from '../components/GrupoForm';
import api from '../../../api/axiosConfig';

function ModificarGrupo() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [initialData, setInitialData] = useState(null);
    const [cargando, setCargando] = useState(true);
    const [modificando, setModificando] = useState(false);
    const [error, setError] = useState(null);
    const [errorGuardar, setErrorGuardar] = useState(null);

    useEffect(() => {
        const cargarGrupo = async () => {
            if (!id) return;
            setCargando(true);
            setError(null);
            try {
                const res = await api.get(`/grupo/${id}`);
                setInitialData(res.data);
            } catch (err) {
                const mensajeError = obtenerMensajeError(err, `Error al cargar el grupo con ID ${id}`);
                setError(mensajeError);
            } finally {
                setCargando(false);
            }
        };
        cargarGrupo();
    }, [id]);

    const handleGuardarSubmit = async (formData) => {
        setErrorGuardar(null);
        setModificando(true);
        try {
            await api.put(`/grupo/update`, formData);
            navigate('/dashboard-grupo');
        } catch (err) {
            const mensajeError = obtenerMensajeError(err, "Error al modificar el grupo");
            setErrorGuardar(mensajeError);
        } finally {
            setModificando(false);
        }
    };

    if (cargando) return <div className="text-center"><Spinner animation="border" /> Cargando...</div>;
    if (error) return <Alert variant="danger">{error}</Alert>;
    if (!initialData) return <Alert variant="warning">No se encontraron datos.</Alert>;

    return (
        <Container className="mt-4">
            <Card>
                <Card.Header as="h5">Modificar Grupo</Card.Header>
                <Card.Body>
                    {errorGuardar && <Alert variant="danger" onClose={() => setErrorGuardar(null)} dismissible>{errorGuardar}</Alert>}
                    <GrupoForm
                        initialData={initialData}
                        onSubmit={handleGuardarSubmit}
                        isEditing={true}
                        isSubmitting={modificando}
                    />
                </Card.Body>
            </Card>
        </Container>
    );
}

export default ModificarGrupo;