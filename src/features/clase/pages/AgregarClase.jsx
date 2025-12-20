import { useState, useEffect } from 'react';
import { Container, Spinner, Alert, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { obtenerMensajeError } from '../../../utils/errorHandler';
import ClaseForm from '../components/ClaseForm';
import api from '../../../api/axiosConfig';

function AgregarClase() {
    const [catalogos, setCatalogos] = useState({ grupos: [] });
    const [cargandoCatalogos, setCargandoCatalogos] = useState(true);
    const [errorCatalogos, setErrorCatalogos] = useState(null);
    const [errorGuardar, setErrorGuardar] = useState(null);
    const [cargando, setCargando] = useState(false);
    const navigate = useNavigate();

    const FORMULARIO_CLASE_VACIO = { nombre: '', grupoId: '' };

    useEffect(() => {
        const cargarGrupos = async () => {
            setCargandoCatalogos(true);
            setErrorCatalogos(null);
            try {
                const res = await api.get('/grupo?dropdown=true');
                setCatalogos({ grupos: res.data || [] });
            } catch (error) {
                const mensajeError = obtenerMensajeError(error, "Error al cargar grupos");
                setErrorCatalogos(mensajeError);
            } finally {
                setCargandoCatalogos(false);
            }
        };
        cargarGrupos();
    }, []);

    const mapFrontendToBackend = (formData) => {
        return {
            nombre: formData.nombre,
            grupo: {
                id: parseInt(formData.grupoId)
            }
        };
    };

    const handleAgregarSubmit = async (formData) => {
        const datosParaEnviar = mapFrontendToBackend(formData);
        setErrorGuardar(null);
        setCargando(true);
        try {
            await api.post('/clase/add', datosParaEnviar);
            navigate('/dashboard-clase');
        } catch (err) {
            const mensajeError = obtenerMensajeError(err, "Error al agregar la clase");
            setErrorGuardar(mensajeError);
        } finally {
            setCargando(false);
        }
    };

    if (cargandoCatalogos) return <div className="text-center"><Spinner animation="border" /> Cargando datos...</div>;
    if (errorCatalogos) return <Alert variant="danger">{errorCatalogos}</Alert>;

    return (
        <Container className="mt-4">
            <Card>
                <Card.Header as="h5">Agregar Nueva Clase</Card.Header>
                <Card.Body>
                    {errorGuardar && <Alert variant="danger" onClose={() => setErrorGuardar(null)} dismissible>{errorGuardar}</Alert>}
                    <ClaseForm
                        initialData={FORMULARIO_CLASE_VACIO}
                        onSubmit={handleAgregarSubmit}
                        isEditing={false}
                        catalogos={catalogos}
                        isSubmitting={cargando}
                    />
                </Card.Body>
            </Card>
        </Container>
    );
}

export default AgregarClase;