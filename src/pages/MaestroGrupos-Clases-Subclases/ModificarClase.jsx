import { useState, useEffect } from 'react';
import { Container, Spinner, Alert, Card } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import ClaseForm from '../../components/MaestroGrupos-Clases-Subclases/ClaseForm'; 
import api from '../../api/axiosConfig';

function ModificarClase() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [initialData, setInitialData] = useState(null);
    const [catalogos, setCatalogos] = useState({ grupos: [] });
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);
    const [errorGuardar, setErrorGuardar] = useState(null);

    useEffect(() => {
        const cargarDatos = async () => {
            try {
                const [claseRes, gruposRes] = await Promise.all([
                    api.get(`/clase/${id}`), 
                    api.get('/grupo/dropdown')
                ]);

                const loadedCatalogos = { grupos: gruposRes.data || [] };
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
                        idGrupo: findIdByName('grupos', backendDto.grupo) 
                    };
                };

                const initialFormData = mapResponseToFormState(claseRes.data, loadedCatalogos);
                setInitialData(initialFormData); 
                
            } catch (err) {
                console.error("Error al cargar datos:", err.response || err);
                setError(err.response?.status === 404 ? `No se encontró la clase con ID ${id}.` : "Error al cargar los datos.");
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
            grupo: {
                id: parseInt(formData.idGrupo)
            }
        };
    };

    const handleGuardarSubmit = async (formData) => {
        if (!formData.nombre || !formData.idGrupo) {
            setErrorGuardar('Debe seleccionar un Grupo y asignar un Nombre a la Clase.');
            return;
        }

        const datosParaEnviar = mapFrontendToBackend(formData);
        setErrorGuardar(null);
        try {
            await api.put(`/clase/update`, datosParaEnviar); 
            navigate('/dashboard-clase'); 
        } catch (err) {
            console.error("Error al modificar la clase:", err.response || err);
            setErrorGuardar(err.response?.data?.message || "Error al guardar.");
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
                    />
                </Card.Body>
            </Card>
        </Container>
    );
}

export default ModificarClase;