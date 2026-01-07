import { useState, useEffect } from "react";
import { Form, Button, Row, Col, Spinner, Card } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';

function UbicacionForm({ initialData, onSubmit, isEditing, isSubmitting = false }) {
    const [formData, setFormData] = useState(initialData);
    const [erroresValidacion, setErroresValidacion] = useState({});
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

        if (erroresValidacion[name]) {
            setErroresValidacion(prev => ({
                ...prev, [name]: null
            }))
        }
    };

    const validarFormulario = () => {
        const errores = {};

        if (!formData.nombre || formData.nombre.trim() === '') {
            errores.nombre = 'El nombre de la ubicación no puede estar vacio.';
        } else if (formData.nombre.length > 35) {
            errores.nombre = 'El nombre de la ubicación no puede tener más de 35 caracteres'
        }

        return errores;
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const errores = validarFormulario();
        if (Object.keys(errores).length > 0) {
            setErroresValidacion(errores);
            return;
        }
        onSubmit(formData);
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Card>
                <Card.Body>


                    <Row>
                        <Form.Group as={Col} md="12">
                            <Form.Label>Nombre de la ubicación</Form.Label>
                            <Form.Control
                                type="text"
                                name="nombre"
                                value={formData.nombre}
                                onChange={handleInputChange}
                                isInvalid={!!erroresValidacion.nombre}
                                disabled={isSubmitting}
                                required
                                maxLength="35"
                            />
                            <Form.Control.Feedback type="invalid">
                                {erroresValidacion.nombre}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Row>
                </Card.Body>
            </Card>
            <div className="d-flex justify-content-end mt-4">
                <Button
                    variant="secondary"
                    onClick={() => navigate('/dashboard-ubicacion')}
                    disabled={isSubmitting}
                    className="me-2">

                    Cancelar
                </Button>

                <Button
                    variant="success"
                    type="submit"
                    disabled={isSubmitting}>
                    {isSubmitting && <Spinner as="span" animation="border" size="sm" className="me-2" />}
                    {isEditing ? 'Guardar Cambios' : 'Agregar Ubicacion'}
                </Button>
            </div>
        </Form>

    );
}
export default UbicacionForm;