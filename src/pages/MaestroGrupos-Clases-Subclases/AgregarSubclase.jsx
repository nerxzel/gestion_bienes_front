import { useState, useEffect } from 'react';
import { Container, Spinner, Alert, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import SubclaseForm from '../../components/MaestroGrupos-Clases-Subclases/SubclaseForm';
import api from '../../api/axiosConfig';

function AgregarSubclase() {
    const [catalogos, setCatalogos] = useState({ clases: [] });
    const [cargandoCatalogos, setCargandoCatalogos] = useState(true);
    const [errorCatalogos, setErrorCatalogos] = useState(null);
    const [errorGuardar, setErrorGuardar] = useState(null);
    const [cargando, setCargando] = useState(false);
    const navigate = useNavigate();

    const FORMULARIO_SUBCLASE_VACIO = {
        nombre: '',
        idClase: ''
    };

    useEffect(() => {
        const cargarClases = async () => {
            setCargandoCatalogos(true);
            setErrorCatalogos(null);
            try {
                const res = await api.get('/clase/all');
                setCatalogos({ clases: res.data || [] });
            } catch (error) {
                console.error("Error al cargar clases:", error);
                setErrorCatalogos("Error al cargar la lista de clases.");
            } finally {
                setCargandoCatalogos(false);
            }
        };
        cargarClases();
    }, []);

    const mapFrontendToBackend = (formData) => {
        return {
            nombre: formData.nombre,
            clase: {
                id: parseInt(formData.idClase)
            }
        };
    };

    const handleAgregarSubmit = async (formData) => {
        if (!formData.nombre || !formData.idClase) {
            setErrorGuardar('Debe seleccionar una Clase y asignar un Nombre a la Subclase.');
            return;
        }

        const datosParaEnviar = mapFrontendToBackend(formData);
        setErrorGuardar(null);
        setCargando(true);
        try {
            await api.post('/subclase/add', datosParaEnviar); 
            navigate('/dashboard-subclase'); 
        } catch (err) {
            console.error("Error al agregar la subclase:", err.response || err);
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
                <Card.Header as="h5">Agregar Nueva Subclase</Card.Header>
                <Card.Body>
                    {errorGuardar && <Alert variant="danger" onClose={() => setErrorGuardar(null)} dismissible>{errorGuardar}</Alert>}
                    
                    {cargando ? (
                        <div className="text-center"><Spinner animation="border" /> Guardando...</div>
                    ) : (
                        <SubclaseForm
                            initialData={FORMULARIO_SUBCLASE_VACIO}
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

export default AgregarSubclase;