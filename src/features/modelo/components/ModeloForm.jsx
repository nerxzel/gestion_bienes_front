import { useState, useEffect } from "react";
import { Form, Button, Row, Col, Spinner, Card } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';

function ModeloForm({ initialData, onSubmit, isEditing, catalogos, isSubmitting = false }) {
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
            errores.nombre = 'El nombre del modelo no puede estar vacio.';
        } else if (formData.nombre.length > 35) {
            errores.nombre = 'El nombre del modelo no puede tener más de 35 caracteres'
        }

        if (!formData.marcaId || formData.marcaId === '') {
            errores.marcaId = 'Debe seleccionar una marca.';
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

    const marcas = catalogos?.marcas || [];

    return (
        <Form onSubmit={handleSubmit}>
            <Card>
                <Card.Body>


                    <Row className="mb-3">
                        <Form.Group as={Col} md="6" controlId="formMarcaGrid">
                            <Form.Label>Marca a la que pertenece</Form.Label>
                            <Form.Select
                                name="marcaId"
                                value={formData.marcaId || ''}
                                onChange={handleInputChange}
                                disabled={isSubmitting}
                                isInvalid={!!erroresValidacion.grupoId}
                                required
                            >
                                <option value="">Seleccione una Marca</option>
                                {marcas.map(m => (
                                    <option key={m.id} value={m.id}>{m.nombre}</option>
                                ))}
                            </Form.Select>
                            <Form.Control.Feedback type="invalid">
                                {erroresValidacion.grupoId}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group as={Col} md="6" controlId="formGridNombreModelo">
                            <Form.Label>Nombre de la Modelo</Form.Label>
                            <Form.Control
                                type="text"
                                name="nombre"
                                value={formData.nombre || ''}
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
                    onClick={() => navigate('/dashboard-modelo')}
                    disabled={isSubmitting}
                    className="me-2">
                    Cancelar
                </Button>
                <Button
                    variant="success"
                    type="submit"
                    disabled={isSubmitting}>
                    {isSubmitting && <Spinner as="span" animation="border" size="sm" className="me-2" />}
                    {isEditing ? 'Guardar Cambios' : 'Agregar Modelo'}
                </Button>
            </div>
        </Form>
    );
}

export default ModeloForm;