import { useState, useEffect } from 'react';
import { Container, Spinner, Alert, Card } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import MarcaForm from '../../components/MaestroMarca-Modelo/MarcaForm'; 
import api from '../../api/axiosConfig';

function ModificarMarca() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [initialData, setInitialData] = useState(null);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);
    const [errorGuardar, setErrorGuardar] = useState(null);

    useEffect(() => {
        const cargarMarca = async () => {
            if (!id) return;
            setCargando(true);
            setError(null);
            try {
                const res = await api.get(`/marca/${id}`); 
                setInitialData(res.data);
            } catch (err) {
                console.error("Error al cargar datos para modificar:", err.response || err);
                setError(err.response?.status === 404 ? `No se encontró la marca con ID ${id}.` : "Error al cargar los datos.");
            } finally {
                setCargando(false);
            }
        };
        cargarMarca();
    }, [id]);

    const handleGuardarSubmit = async (formData) => {
        if (!formData.nombre || formData.nombre.trim() === '') {
            setErrorGuardar('El nombre de la marca no puede estar vacío.');
            return;
        }

        setErrorGuardar(null);
        try {
            await api.put(`/marca/update`, formData); 
            navigate('/dashboard-marca'); 
        } catch (err) {
            console.error("Error al modificar la marca:", err.response || err);
            const errorMsg = err.response?.data?.message || err.response?.data || "Error al guardar.";
            setErrorGuardar(errorMsg);
        }
    };

    if (cargando) return <div className="text-center"><Spinner animation="border" /> Cargando...</div>;
    if (error) return <Alert variant="danger">{error}</Alert>;
    if (!initialData) return <Alert variant="warning">No se encontraron datos.</Alert>;

    return (
        <Container className="mt-4">
            <Card>
                <Card.Header as="h5">Modificar Marca</Card.Header>
                <Card.Body>
                    {errorGuardar && <Alert variant="danger" onClose={() => setErrorGuardar(null)} dismissible>{errorGuardar}</Alert>}
                    <MarcaForm
                        initialData={initialData}
                        onSubmit={handleGuardarSubmit}
                        isEditing={true}
                    />
                </Card.Body>
            </Card>
        </Container>
    );
}

export default ModificarMarca;