import { useState, useEffect } from 'react';
import { Container, Spinner, Alert, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import ClaseForm from '../../components/MaestroGrupos-Clases-Subclases/ClaseForm';
import api from '../../api/axiosConfig';

function AgregarClase() {
    const [catalogos, setCatalogos] = useState({ grupos: [] });
    const [cargandoCatalogos, setCargandoCatalogos] = useState(true);
    const [errorCatalogos, setErrorCatalogos] = useState(null);
    const [errorGuardar, setErrorGuardar] = useState(null);
    const [cargando, setCargando] = useState(false);
    const navigate = useNavigate();

    const FORMULARIO_CLASE_VACIO = {
        nombre: '',
        idGrupo: ''
    };

    useEffect(() => {
        const cargarGrupos = async () => {
            setCargandoCatalogos(true);
            setErrorCatalogos(null);
            try {
                const res = await api.get('/grupo/dropdown');
                setCatalogos({ grupos: res.data || [] });
            } catch (error) {
                console.error("Error al cargar grupos:", error);
                setErrorCatalogos("Error al cargar la lista de grupos.");
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
                id: parseInt(formData.idGrupo)
            }
        };
    };

    const handleAgregarSubmit = async (formData) => {
        if (!formData.nombre || !formData.idGrupo) {
            setErrorGuardar('Debe seleccionar un Grupo y asignar un Nombre a la Clase.');
            return;
        }

        const datosParaEnviar = mapFrontendToBackend(formData);
        setErrorGuardar(null);
        setCargando(true);
        try {
            await api.post('/clase/add', datosParaEnviar); 
            navigate('/dashboard-clase'); 
        } catch (err) {
            console.error("Error al agregar la clase:", err.response || err);
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
                <Card.Header as="h5">Agregar Nueva Clase</Card.Header>
                <Card.Body>
                    {errorGuardar && <Alert variant="danger" onClose={() => setErrorGuardar(null)} dismissible>{errorGuardar}</Alert>}
                    
                    {cargando ? (
                        <div className="text-center"><Spinner animation="border" /> Guardando...</div>
                    ) : (
                        <ClaseForm
                            initialData={FORMULARIO_CLASE_VACIO}
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

export default AgregarClase;