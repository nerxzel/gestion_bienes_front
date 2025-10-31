import { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import { FaTrash } from 'react-icons/fa';

function ModeloForm({ initialData, onSubmit, isEditing, catalogos }) {
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

    const marcas = catalogos?.marcas || [];

    return (
        <Form onSubmit={handleSubmit}>
            <Row className="mb-3">
                <Form.Group as={Col} md="6" controlId="formGridMarca">
                    <Form.Label>Marca a la que pertenece</Form.Label>
                    <Form.Select
                        name="idMarca"
                        value={formData.idMarca || ''}
                        onChange={handleInputChange}
                        required
                    >
                        <option value="">Seleccione una Marca</option>
                        {marcas.map(m => (
                            <option key={m.id} value={m.id}>{m.nombre}</option>
                        ))}
                    </Form.Select>
                </Form.Group>

                <Form.Group as={Col} md="6" controlId="formGridNombreModelo">
                    <Form.Label>Nombre de la Modelo</Form.Label>
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
                <Button variant="secondary" onClick={() => navigate('/dashboard-modelo')} className="me-2">
                    Cancelar
                </Button>
                <Button variant="primary" type="submit">
                    {isEditing ? 'Guardar Cambios' : 'Agregar Modelo'}
                </Button>
            </div>
        </Form>
    );
}

export default ModeloForm;