import { useState, useEffect } from 'react';
import { Container, Spinner, Alert, Card } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import { obtenerMensajeError } from '../../../utils/errorHandler';
import { useBienes } from '../../../hooks/useBienes';
import ClaseForm from '../components/ClaseForm';
import api from '../../../api/axiosConfig';

function ModificarClase() {
    const { id } = useParams();
    const { cargarBienes } = useBienes();
    const navigate = useNavigate();

    const [initialData, setInitialData] = useState(null);
    const [catalogos, setCatalogos] = useState({ grupos: [] });
    const [cargando, setCargando] = useState(true);
    const [modificando, setModificando] = useState(false);
    const [error, setError] = useState(null);
    const [errorGuardar, setErrorGuardar] = useState(null);

    useEffect(() => {
        const cargarDatos = async () => {
            try {
                const [claseRes, gruposRes] = await Promise.all([
                    api.get(`/clase/${id}`),
                    api.get('/grupo?dropdown=true')
                ]);

                const loadedCatalogos = { grupos: gruposRes.data || [] };
                setCatalogos(loadedCatalogos);

                const mapResponseToFormState = (backendDto) => {
                    return {
                        id: backendDto.id,
                        nombre: backendDto.nombre,
                        grupoId: backendDto.grupoId
                    };
                };

                const initialFormData = mapResponseToFormState(claseRes.data, loadedCatalogos);
                setInitialData(initialFormData);

            } catch (err) {
                const mensajeError = obtenerMensajeError(err, `Error al cargar la clase con ID ${id}`);
                setError(mensajeError);
            } finally {
                setCargando(false);
            }
        };
        cargarDatos();
    }, [id]);

    const mapFrontendToBackend = (formData) => {
        return {
            id: formData.id,
            nombre: formData.nombre,
            grupoId: parseInt(formData.grupoId)
        };
    };

    const handleGuardarSubmit = async (formData) => {
        const datosParaEnviar = mapFrontendToBackend(formData);
        setErrorGuardar(null);
        setModificando(true);
        try {
            await api.put(`/clase/${formData.id}`, datosParaEnviar);
            await cargarBienes();
            navigate('/dashboard-clase');
        } catch (err) {
            const mensajeError = obtenerMensajeError(err, "Error al modificar la clase");
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
                <Card.Header as="h5">Modificar Clase</Card.Header>
                <Card.Body>
                    {errorGuardar && <Alert variant="danger" onClose={() => setErrorGuardar(null)} dismissible>{errorGuardar}</Alert>}
                    <ClaseForm
                        initialData={initialData}
                        onSubmit={handleGuardarSubmit}
                        isEditing={true}
                        catalogos={catalogos}
                        isSubmitting={modificando}
                    />
                </Card.Body>
            </Card>
        </Container>
    );
}

export default ModificarClase;