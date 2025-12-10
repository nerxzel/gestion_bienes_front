import { useState, useEffect } from 'react';
import { Container, Spinner, Alert, Card } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import { obtenerMensajeError } from '../../../utils/errorHandler';
import UnidadesMedidaForm from '../components/UnidadesMedidaForm.jsx';
import api from '../../../api/axiosConfig';

function ModificarUnidadesMedida() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [initialData, setInitialData] = useState(null);
    const [cargando, setCargando] = useState(true);
    const [modificando, setModificando] = useState(false);
    const [error, setError] = useState(null);
    const [errorGuardar, setErrorGuardar] = useState(null);

    useEffect(() => {
        const cargarUnidadesMedida = async () => {
            if (!id) return;
            setCargando(true);
            setError(null);
            try {
                const res = await api.get(`/unidadMedida/${id}`);
                setInitialData(res.data);
            } catch (err) {
                const mensajeError = obtenerMensajeError(err, `Error al cargar la unidad de medida con ID ${id}`);
                setError(mensajeError);
            } finally {
                setCargando(false);
            }
        };
        cargarUnidadesMedida();
    }, [id]);

    const handleGuardarSubmit = async (formData) => {
        setErrorGuardar(null);
        setModificando(true);
        try {
            await api.put(`/unidadMedida/update`, formData);
            navigate('/dashboard-unidadesM');
        } catch (err) {
            const mensajeError = obtenerMensajeError(err, "Error al modificar la unidad de medida");
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
                <Card.Header as="h5">Modificar Ubicación</Card.Header>
                <Card.Body>
                    {errorGuardar && <Alert variant="danger" onClose={() => setErrorGuardar(null)} dismissible>{errorGuardar}</Alert>}
                    <UnidadesMedidaForm
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

export default ModificarUnidadesMedida;