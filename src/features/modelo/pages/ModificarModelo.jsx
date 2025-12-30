import { useState, useEffect } from 'react';
import { Container, Spinner, Alert, Card } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import { obtenerMensajeError } from '../../../utils/errorHandler';
import ModeloForm from '../components/ModeloForm.jsx';
import api from '../../../api/axiosConfig';

function ModificarModelo() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [initialData, setInitialData] = useState(null);
    const [catalogos, setCatalogos] = useState({ marcas: [] });
    const [cargando, setCargando] = useState(true);
    const [modificando, setModificando] = useState(false);
    const [error, setError] = useState(null);
    const [errorGuardar, setErrorGuardar] = useState(null);

    useEffect(() => {
        const cargarDatos = async () => {
            try {
                const [modeloRes, marcasRes] = await Promise.all([
                    api.get(`/modelo/${id}`),
                    api.get('/marca?dropdown=true')
                ]);

                const loadedCatalogos = { marcas: marcasRes.data || [] };
                setCatalogos(loadedCatalogos);

                const mapResponseToFormState = (backendDto, loadedCats) => {
                    const findIdByName = (catName, nameValue) => {
                        const list = loadedCats[catName] || [];
                        const item = list.find(item => item.nombre === nameValue);
                        return item ? item.id : '';
                    };

                    return {
                        id: backendDto.id,
                        nombre: backendDto.nombre,
                        marcaId: backendDto.marcaId
                    };
                };

                const initialFormData = mapResponseToFormState(modeloRes.data, loadedCatalogos);
                setInitialData(initialFormData);

            } catch (err) {
                const mensajeError = obtenerMensajeError(err, `Error al cargar el modelo con ID ${id}`);
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
            marca: parseInt(formData.marcaId)
        };
    };

    const handleGuardarSubmit = async (formData) => {
        const datosParaEnviar = mapFrontendToBackend(formData);
        setErrorGuardar(null);
        setModificando(true);
        try {
            await api.put(`/modelo/${formData.id}`, datosParaEnviar);
            navigate('/dashboard-modelo');
        } catch (err) {
            const mensajeError = obtenerMensajeError(err, "Error al modificar el modelo");
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
                <Card.Header as="h5">Modificar Modelo</Card.Header>
                <Card.Body>
                    {errorGuardar && <Alert variant="danger" onClose={() => setErrorGuardar(null)} dismissible>{errorGuardar}</Alert>}
                    <ModeloForm
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

export default ModificarModelo;