import { useState, useEffect } from "react";
import { Form, Button, Row, Col, Spinner } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';

function ClaseForm({ initialData, onSubmit, isEditing, catalogos, isSubmitting = false }) {
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
                ...prev, [name]:null
            }))
        }
    };

    const validarFormulario = () => {
        const errores = {};

        if(!formData.nombre || formData.nombre.trim() === '') {
            errores.nombre = 'El nombre de la clase no puede estar vacio.';
        } else if (formData.nombre.length > 35) {
            errores.nombre = 'El nombre de la clase no puede tener más de 35 caracteres'
        }

        if(!formData.grupoId || formData.grupoId === '') {
        errores.grupoId = 'Debe seleccionar un grupo.';
    }

        return errores;
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const errores = validarFormulario();
        if(Object.keys(errores).length > 0) {
            setErroresValidacion(errores);
            return;}
        onSubmit(formData);
    };

    const grupos = catalogos?.grupos || [];

    return (
        <Form onSubmit={handleSubmit}>
            <Row className="mb-3">
                <Form.Group as={Col} md="6" controlId="formGrupoGrid">
                    <Form.Label>Grupo al que pertenece</Form.Label>
                    <Form.Select
                        name="grupoId"
                        value={formData.grupoId || ''}
                        onChange={handleInputChange}
                        disabled={isSubmitting}
                        isInvalid={!!erroresValidacion.grupoId}
                        required
                    >
                        <option value="">Seleccione un Grupo</option>
                        {grupos.map(g => (
                            <option key={g.id} value={g.id}>{g.nombre}</option>
                        ))}
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                        {erroresValidacion.grupoId}
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col} md="6" controlId="formGridNombreClase">
                    <Form.Label>Nombre de la Clase</Form.Label>
                    <Form.Control
                        type="text"
                        name="nombre" 
                        value={formData.nombre || ''}
                        onChange={handleInputChange}
                        isInvalid={!!erroresValidacion.nombre}
                        disabled={isSubmitting || !formData.grupoId}
                        required
                        maxLength="35"
                    />
                    <Form.Control.Feedback type="invalid">
                        {erroresValidacion.nombre}
                    </Form.Control.Feedback>
                </Form.Group>
            </Row>

            <div className="d-flex justify-content-end mt-4">
                <Button 
                    variant="secondary" 
                    onClick={() => navigate('/dashboard-clase')}
                    disabled={isSubmitting}
                    className="me-2">
                    Cancelar
                </Button>
                <Button 
                    variant="success" 
                    type="submit"
                    disabled={isSubmitting}>
                    {isSubmitting && <Spinner as="span" animation="border" size="sm" className="me-2" />}
                    {isEditing ? 'Guardar Cambios' : 'Agregar Clase'}
                </Button>
            </div>
        </Form>
    );
}

export default ClaseForm;