import { useState, useEffect } from 'react';
import { Container, Spinner, Alert, Card } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import { obtenerMensajeError } from '../../../utils/errorHandler';
import MarcaForm from '../components/MarcaForm.jsx';
import api from '../../../api/axiosConfig';

function ModificarMarca() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [initialData, setInitialData] = useState(null);
    const [cargando, setCargando] = useState(true);
    const [modificando, setModificando] = useState(false);
    const [error, setError] = useState(null);
    const [errorGuardar, setErrorGuardar] = useState(null);

    useEffect(() => {
        const cargarMarca = async () => {
            if (!id) return;
            setCargando(true);
            setError(null);
            try {
                const res = await api.get(`/marca/${id}`);
                setInitialData(res.data);
            } catch (err) {
                const mensajeError = obtenerMensajeError(err, `Error al cargar la marca con ID ${id}`);
                setError(mensajeError);
            } finally {
                setCargando(false);
            }
        };
        cargarMarca();
    }, [id]);

    const handleGuardarSubmit = async (formData) => {
        setErrorGuardar(null);
        setModificando(true);
        try {
            await api.put(`/marca/update`, formData);
            navigate('/dashboard-marca');
        } catch (err) {
            const mensajeError = obtenerMensajeError(err, "Error al modificar la marca");
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
                <Card.Header as="h5">Modificar Marca</Card.Header>
                <Card.Body>
                    {errorGuardar && <Alert variant="danger" onClose={() => setErrorGuardar(null)} dismissible>{errorGuardar}</Alert>}
                    <MarcaForm
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

export default ModificarMarca;