import { useState, useEffect } from 'react';
import { Container, Spinner, Alert, Card } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import ModeloForm from '../../components/MaestroMarca-Modelo/ModeloForm'; 
import api from '../../api/axiosConfig';

function ModificarModelo() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [initialData, setInitialData] = useState(null);
    const [catalogos, setCatalogos] = useState({ marcas: [] });
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);
    const [errorGuardar, setErrorGuardar] = useState(null);

    useEffect(() => {
        const cargarDatos = async () => {
            try {
                const [modeloRes, marcasRes] = await Promise.all([
                    api.get(`/modelo/${id}`), 
                    api.get('/marca/all')
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
                        idMarca: findIdByName('marcas', backendDto.marca) 
                    };
                };

                const initialFormData = mapResponseToFormState(modeloRes.data, loadedCatalogos);
                setInitialData(initialFormData); 
                
            } catch (err) {
                console.error("Error al cargar datos:", err.response || err);
                setError(err.response?.status === 404 ? `No se encontró el modelo con ID ${id}.` : "Error al cargar los datos.");
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
            marca: {
                id: parseInt(formData.idMarca)
            }
        };
    };

    const handleGuardarSubmit = async (formData) => {
        if (!formData.nombre || !formData.idMarca) {
            setErrorGuardar('Debe seleccionar una Marca y asignar un Nombre al modelo.');
            return;
        }

        const datosParaEnviar = mapFrontendToBackend(formData);
        setErrorGuardar(null);
        try {
            await api.put(`/modelo/update`, datosParaEnviar); 
            navigate('/dashboard-modelo'); 
        } catch (err) {
            console.error("Error al modificar el modelo:", err.response || err);
            setErrorGuardar(err.response?.data?.message || "Error al guardar.");
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
                    />
                </Card.Body>
            </Card>
        </Container>
    );
}

export default ModificarModelo;