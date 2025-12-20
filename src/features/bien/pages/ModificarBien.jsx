import { useState, useEffect } from 'react';
import { Container, Spinner, Alert, Card } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import { mapFrontendToBackendUpdate, mapBackendToFrontend } from '../../../utils/mapeoBienes';
import { validarBien } from '../../../utils/validacionBien';
import { obtenerMensajeError } from '../../../utils/errorHandler';
import { useBienes } from '../../../hooks/useBienes';
import BienForm from '../components/BienForm';
import api from '../../../api/axiosConfig';

function ModificarBien() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [bienData, setBienData] = useState(null);
    const [catalogos, setCatalogos] = useState({
        grupos: [], marcas: [], ubicaciones: [], unidadesMedida: [], responsables: []
    });
    const [cargando, setCargando] = useState(true);
    const [modificando, setModificando] = useState(false);
    const [error, setError] = useState(null);
    const [errorGuardar, setErrorGuardar] = useState(null);
    const { cargarBienes } = useBienes();

    useEffect(() => {
        const cargarDatosCompletos = async () => {
            if (!id) {
                setError("No se especificó un ID para modificar.");
                setCargando(false);
                return;
            }
            setCargando(true);
            setError(null);
            setErrorGuardar(null);

            try {
                const [
                    bienRes, gruposRes, marcasRes, ubicacionesRes, unidadesRes, responsablesRes
                ] = await Promise.all([
                    api.get(`/bien/${id}`),
                    api.get('/grupo?dropdown=true'),
                    api.get('/marca'),
                    api.get('/ubicacion'),
                    api.get('/unidadMedida'),
                    api.get('/responsable?dropdown=true')
                ]);

                const loadedCatalogos = {
                    grupos: gruposRes.data || [],
                    marcas: marcasRes.data || [],
                    ubicaciones: ubicacionesRes.data || [],
                    unidadesMedida: unidadesRes.data || [],
                    responsables: responsablesRes.data || []
                };
                setCatalogos(loadedCatalogos);

                const initialFormData = mapBackendToFrontend(bienRes.data, loadedCatalogos);
                setBienData(initialFormData);

            } catch (error) {
                const mensajeError = obtenerMensajeError(error, `Error al cargar el bien con ID ${id}`);
                setError(mensajeError);
                setBienData(null);
            } finally {
                setCargando(false);
            }
        };
        cargarDatosCompletos();

    }, [id]);

    const handleGuardarSubmit = async (formData) => {
        const { esValido, mensajeError } = validarBien(formData);

        if (!esValido) {
            setErrorGuardar(mensajeError);
            return;
        }

        const datosParaEnviar = mapFrontendToBackendUpdate(formData);
        setErrorGuardar(null);
        setModificando(true);

        try {
            await api.put(`/bien/${id}`, datosParaEnviar);
            await cargarBienes();
            navigate('/dashboard');
        } catch (err) {
            console.log("Revisar:",datosParaEnviar)
            const mensajeError = obtenerMensajeError(err, "Error al modificar el bien");
            setErrorGuardar(mensajeError);
        } finally {
            setModificando(false);
        }
    };

    const handleDelete = async () => {
        setErrorGuardar(null);
        try {
            await api.post(`/bien/${id}`);
            navigate('/dashboard');
        } catch (err) {
            const mensajeError = obtenerMensajeError(err, "Error al eliminar el bien");
            setErrorGuardar(mensajeError);
        }
    };

    if (cargando) return <div className="text-center"><Spinner animation="border" /> Cargando datos del bien...</div>;
    if (error) return <Alert variant="danger">{error}</Alert>;
    if (!bienData) return <Alert variant="warning">No se pudieron cargar los datos para el bien con ID {id}.</Alert>;

    return (
        <Container className="mt-4">
            <Card>
                <Card.Header as="h5">Modificar Bien</Card.Header>
                <Card.Body>
                    {cargando && <div className="text-center"><Spinner animation="border" /> Cargando datos del bien...</div>}
                    {error && <Alert variant="danger">{error}</Alert>}
                    {!cargando && !error && bienData && (
                        <>
                            {errorGuardar && <Alert variant="danger" onClose={() => setErrorGuardar(null)} dismissible>{errorGuardar}</Alert>}
                            <BienForm
                                initialData={bienData}
                                onSubmit={handleGuardarSubmit}
                                isEditing={true}
                                catalogos={catalogos}
                                onDelete={handleDelete}
                                isSubmitting={modificando}
                            />
                        </>
                    )}
                </Card.Body>
            </Card>
        </Container>
    );
}

export default ModificarBien;