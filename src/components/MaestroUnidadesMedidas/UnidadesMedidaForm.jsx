import { useState, useEffect } from "react";
import { Form, Button, Row, Col, Spinner } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';

function UnidadesMedidaForm({ initialData, onSubmit, isEditing}) {
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

    return (
        <Form onSubmit={handleSubmit}>
            <Row>
                <Form.Group as={Col} md="12">
                    <Form.Label>Nombre de la unidad de medida</Form.Label>
                    <Form.Control
                        type="text"
                        name="nombre"
                        value={formData.nombre}
                        onChange={handleInputChange}
                        required
                        maxLength="35"
                        />
                </Form.Group>
            </Row>
            <div className="d-flex justify-content-end mt-4">
                <Button
                    variant="secondary" 
                    onClick={() => navigate('/dashboard-unidadesM')}
                    className="me-2">

                    Cancelar
                </Button>

                <Button
                    variant="primary" 
                    type="submit">
                {isEditing ? 'Guardar Cambios' : 'Agregar Unidad de Medida'}
                </Button>
            </div>
        </Form>
        );
        }
export default UnidadesMedidaForm;