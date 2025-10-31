import { useState, useEffect } from 'react';
import { Container, Spinner, Alert, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import ModeloForm from '../../components/MaestroMarca-Modelo/ModeloForm';
import api from '../../api/axiosConfig';

function AgregarModelo() {
    const [catalogos, setCatalogos] = useState({ marcas: [] });
    const [cargandoCatalogos, setCargandoCatalogos] = useState(true);
    const [errorCatalogos, setErrorCatalogos] = useState(null);
    const [errorGuardar, setErrorGuardar] = useState(null);
    const [cargando, setCargando] = useState(false);
    const navigate = useNavigate();

    const FORMULARIO_MODELO_VACIO = {
        nombre: '',
        idMarca: ''
    };

    useEffect(() => {
        const cargarMarcas = async () => {
            setCargandoCatalogos(true);
            setErrorCatalogos(null);
            try {
                const res = await api.get('/marca/all');
                setCatalogos({ marcas: res.data || [] });
            } catch (error) {
                console.error("Error al cargar marcas:", error);
                setErrorCatalogos("Error al cargar la lista de marcas.");
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
        if (!formData.nombre || !formData.idMarca) {
            setErrorGuardar('Debe seleccionar un Marca y asignar un Nombre al Modelo.');
            return;
        }

        const datosParaEnviar = mapFrontendToBackend(formData);
        setErrorGuardar(null);
        setCargando(true);
        try {
            await api.post('/modelo/add', datosParaEnviar); 
            navigate('/dashboard-modelo'); 
        } catch (err) {
            console.error("Error al agregar el modelo:", err.response || err);
            const errorMsg = err.response?.data?.message || err.response?.data || "Error al guardar.";
            setErrorGuardar(errorMsg);
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
                    
                    {cargando ? (
                        <div className="text-center"><Spinner animation="border" /> Guardando...</div>
                    ) : (
                        <ModeloForm
                            initialData={FORMULARIO_MODELO_VACIO}
                            onSubmit={handleAgregarSubmit}
                            isEditing={false}
                            catalogos={catalogos} 
                        />
                    )}
                </Card.Body>
            </Card>
        </Container>
    );
}

export default AgregarModelo;