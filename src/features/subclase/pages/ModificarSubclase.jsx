import { useState, useEffect } from 'react';
import { Container, Spinner, Alert, Card } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import { obtenerMensajeError } from '../../../utils/errorHandler';
import api from '../../../api/axiosConfig';
import SubclaseForm from '../components/SubclaseForm';

function ModificarSubclase() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [initialData, setInitialData] = useState(null);
    const [catalogos, setCatalogos] = useState({ grupos: [], clases: [] });
    const [cargando, setCargando] = useState(true);
    const [modificando, setModificando] = useState(false);
    const [error, setError] = useState(null);
    const [errorGuardar, setErrorGuardar] = useState(null);

    useEffect(() => {
        const cargarDatos = async () => {
            try {
                const [subclaseRes, gruposRes] = await Promise.all([
                    api.get(`/subclase/${id}`),
                    api.get('/grupo?dropdown=true')
                ]);

                const subclaseData = subclaseRes.data;
                const grupos = gruposRes.data || [];

                const grupoId = grupos.find(g => g.nombre === subclaseData.grupo)?.id || '';

                let clases = [];
                let claseId = '';

                if (grupoId) {
                    const clasesRes = await api.get(`/clase/dropdown/${grupoId}`);
                    clases = clasesRes.data || [];
                    claseId = clases.find(c => c.nombre === subclaseData.clase)?.id || '';
                }

                setCatalogos({ grupos, clases });

                setInitialData({
                    id: subclaseData.id,
                    nombre: subclaseData.nombre,
                    grupoId: grupoId,
                    claseId: claseId
                });

            } catch (err) {
                const mensajeError = obtenerMensajeError(err, `Error al cargar la subclase con ID ${id}`);
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
            clase: {
                id: parseInt(formData.claseId)
            }
        };
    };

    const handleGuardarSubmit = async (formData) => {
        const datosParaEnviar = mapFrontendToBackend(formData);
        setErrorGuardar(null);
        setModificando(true);
        try {
            await api.put(`/subclase/${formData.id}`, datosParaEnviar);
            navigate('/dashboard-subclase');
        } catch (err) {
            const mensajeError = obtenerMensajeError(err, "Error al modificar la subclase");
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
                <Card.Header as="h5">Modificar Subclase</Card.Header>
                <Card.Body>
                    {errorGuardar && <Alert variant="danger" onClose={() => setErrorGuardar(null)} dismissible>{errorGuardar}</Alert>}
                    <SubclaseForm
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

export default ModificarSubclase;