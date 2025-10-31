import { useState, useEffect } from 'react';
import { Container, Spinner, Alert, Card } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../api/axiosConfig';
import SubclaseForm from '../../components/MaestroGrupos-Clases-Subclases/SubclaseForm';

function ModificarSubclase() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [initialData, setInitialData] = useState(null);
    const [catalogos, setCatalogos] = useState({ clases: [] });
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);
    const [errorGuardar, setErrorGuardar] = useState(null);

    useEffect(() => {
        const cargarDatos = async () => {
            try {
                const [subclasesRes, clasesRes] = await Promise.all([
                    api.get(`/subclase/${id}`), 
                    api.get('/clase/all')
                ]);

                const loadedCatalogos = { clases: clasesRes.data || [] };
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
                        idClase: findIdByName('clases', backendDto.clase) 
                    };
                };

                const initialFormData = mapResponseToFormState(subclasesRes.data, loadedCatalogos);
                setInitialData(initialFormData); 
                
            } catch (err) {
                console.error("Error al cargar datos:", err.response || err);
                setError(err.response?.status === 404 ? `No se encontró la subclase con ID ${id}.` : "Error al cargar los datos.");
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
                id: parseInt(formData.idClase)
            }
        };
    };

    const handleGuardarSubmit = async (formData) => {
        if (!formData.nombre || !formData.idClase) {
            setErrorGuardar('Debe seleccionar una Clase y asignar un Nombre a la Subclase.');
            return;
        }

        const datosParaEnviar = mapFrontendToBackend(formData);
        setErrorGuardar(null);
        try {
            await api.put(`/subclase/update`, datosParaEnviar); 
            navigate('/dashboard-subclase'); 
        } catch (err) {
            console.error("Error al modificar la subclase:", err.response || err);
            setErrorGuardar(err.response?.data?.message || "Error al guardar.");
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
                    />
                </Card.Body>
            </Card>
        </Container>
    );
}

export default ModificarSubclase;