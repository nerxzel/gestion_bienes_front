import { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import { FaTrash } from 'react-icons/fa';

function SubclaseForm({ initialData, onSubmit, isEditing, catalogos }) {
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

    const clases = catalogos?.clases || [];

    return (
        <Form onSubmit={handleSubmit}>
            <Row className="mb-3">
                <Form.Group as={Col} md="6" controlId="formGridClase">
                    <Form.Label>Clase a la que pertenece</Form.Label>
                    <Form.Select
                        name="idClase"
                        value={formData.idClase || ''}
                        onChange={handleInputChange}
                        required
                    >
                        <option value="">Seleccione una Clase</option>
                        {clases.map(c => (
                            <option key={c.id} value={c.id}>{c.nombre}</option>
                        ))}
                    </Form.Select>
                </Form.Group>

                <Form.Group as={Col} md="6" controlId="formGridSubclase">
                    <Form.Label>Nombre de la Subclase</Form.Label>
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
                <Button variant="secondary" onClick={() => navigate('/dashboard-subclase')} className="me-2">
                    Cancelar
                </Button>
                <Button variant="primary" type="submit">
                    {isEditing ? 'Guardar Cambios' : 'Agregar Subclase'}
                </Button>
            </div>
        </Form>
    );
}

export default SubclaseForm;