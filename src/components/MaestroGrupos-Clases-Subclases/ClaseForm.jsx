import { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';

function ClaseForm({ initialData, onSubmit, isEditing, catalogos }) {
    const [formData, setFormData] = useState(initialData);
    const navigate = useNavigate();

    useEffect(() => {
        setFormData(initialData);
    }, [initialData]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        onSubmit(formData);
    };

    const grupos = catalogos?.grupos || [];

    return (
        <Form onSubmit={handleSubmit}>
            <Row className="mb-3">
                <Form.Group as={Col} md="6" controlId="formGridGrupo">
                    <Form.Label>Grupo al que pertenece</Form.Label>
                    <Form.Select
                        name="idGrupo"
                        value={formData.idGrupo || ''}
                        onChange={handleInputChange}
                        required
                    >
                        <option value="">Seleccione un Grupo</option>
                        {grupos.map(g => (
                            <option key={g.id} value={g.id}>{g.nombre}</option>
                        ))}
                    </Form.Select>
                </Form.Group>

                <Form.Group as={Col} md="6" controlId="formGridNombreClase">
                    <Form.Label>Nombre de la Clase</Form.Label>
                    <Form.Control
                        type="text"
                        name="nombre" 
                        value={formData.nombre || ''}
                        onChange={handleInputChange}
                        required
                        maxLength="35"
                    />
                </Form.Group>
            </Row>

            <div className="d-flex justify-content-end mt-4">
                <Button variant="secondary" onClick={() => navigate('/dashboard-clase')} className="me-2">
                    Cancelar
                </Button>
                <Button variant="primary" type="submit">
                    {isEditing ? 'Guardar Cambios' : 'Agregar Clase'}
                </Button>
            </div>
        </Form>
    );
}

export default ClaseForm;