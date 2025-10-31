import { useState, useEffect } from 'react';
import { Container, Spinner, Alert, Card } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import GrupoForm from '../../components/MaestroGrupos-Clases-Subclases/GrupoForm';
import api from '../../api/axiosConfig';

function ModificarGrupo() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [initialData, setInitialData] = useState(null);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);
    const [errorGuardar, setErrorGuardar] = useState(null);

    useEffect(() => {
        const cargarGrupo = async () => {
            if (!id) return;
            setCargando(true);
            setError(null);
            try {
                const res = await api.get(`/grupo/${id}`); 
                setInitialData(res.data);
            } catch (err) {
                console.error("Error al cargar datos para modificar:", err.response || err);
                setError(err.response?.status === 404 ? `No se encontró el grupo con ID ${id}.` : "Error al cargar los datos.");
            } finally {
                setCargando(false);
            }
        };
        cargarGrupo();
    }, [id]);

    const handleGuardarSubmit = async (formData) => {
        if (!formData.nombre || formData.nombre.trim() === '') {
            setErrorGuardar('El nombre del grupo no puede estar vacío.');
            return;
        }

        setErrorGuardar(null);
        try {
            await api.put(`/grupo/update`, formData); 
            navigate('/dashboard-grupo'); 
        } catch (err) {
            console.error("Error al modificar el grupo:", err.response || err);
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
                <Card.Header as="h5">Modificar Grupo</Card.Header>
                <Card.Body>
                    {errorGuardar && <Alert variant="danger" onClose={() => setErrorGuardar(null)} dismissible>{errorGuardar}</Alert>}
                    <GrupoForm
                        initialData={initialData}
                        onSubmit={handleGuardarSubmit}
                        isEditing={true}
                    />
                </Card.Body>
            </Card>
        </Container>
    );
}

export default ModificarGrupo;