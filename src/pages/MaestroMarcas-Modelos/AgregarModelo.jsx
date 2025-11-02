import { useState, useEffect } from 'react';
import { Container, Spinner, Alert, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { obtenerMensajeError } from '../../utils/errorHandler';
import ModeloForm from '../../components/MaestroMarca-Modelo/ModeloForm';
import api from '../../api/axiosConfig';

function AgregarModelo() {
    const [catalogos, setCatalogos] = useState({ marcas: [] });
    const [cargandoCatalogos, setCargandoCatalogos] = useState(true);
    const [errorCatalogos, setErrorCatalogos] = useState(null);
    const [errorGuardar, setErrorGuardar] = useState(null);
    const [cargando, setCargando] = useState(false);
    const navigate = useNavigate();

    const FORMULARIO_MODELO_VACIO = {nombre: '', idMarca: ''};

    useEffect(() => {
        const cargarMarcas = async () => {
            setCargandoCatalogos(true);
            setErrorCatalogos(null);
            try {
                const res = await api.get('/marca/all');
                setCatalogos({ marcas: res.data || [] });
            } catch (error) {
                const mensajeError = obtenerMensajeError(error, "Error al cargar marcas");
                setErrorCatalogos(mensajeError);
            } finally {
                setCargandoCatalogos(false);
            }
        };
        cargarMarcas();
    }, []);

    const mapFrontendToBackend = (formData) => {
        return {
            nombre: formData.nombre,
            marca: {
                id: parseInt(formData.idMarca)
            }
        };
    };

    const handleAgregarSubmit = async (formData) => {   
        const datosParaEnviar = mapFrontendToBackend(formData);
        setErrorGuardar(null);
        setCargando(true);
        try {
            await api.post('/modelo/add', datosParaEnviar); 
            navigate('/dashboard-modelo'); 
        } catch (err) {
            const mensajeError = obtenerMensajeError(err, "Error al agregar el modelo");
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
                <Card.Header as="h5">Agregar Nuevo Modelo</Card.Header>
                <Card.Body>
                    {errorGuardar && <Alert variant="danger" onClose={() => setErrorGuardar(null)} dismissible>{errorGuardar}</Alert>}
                        <ModeloForm
                            initialData={FORMULARIO_MODELO_VACIO}
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

export default AgregarModelo;