import { useState, useEffect } from "react";
import { Form, Button, Row, Col, Spinner} from "react-bootstrap";
import { useNavigate } from 'react-router-dom';

function SubclaseForm({ initialData, onSubmit, isEditing, catalogos, isSubmitting = false }) {
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
            errores.nombre = 'El nombre de la subclase no puede estar vacio.';
        } else if (formData.nombre.length > 35) {
            errores.nombre = 'El nombre de la subclase no puede tener más de 35 caracteres'
        }

        if(!formData.idClase || formData.idClase === '') {
        errores.idClase = 'Debe seleccionar una clase.';
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
                        disabled={isSubmitting}
                        isInvalid={!!erroresValidacion.idClase}
                        required
                    >
                        <option value="">Seleccione una Clase</option>
                        {clases.map(c => (
                            <option key={c.id} value={c.id}>{c.nombre}</option>
                        ))}
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                        {erroresValidacion.idClase}
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col} md="6" controlId="formGridSubclase">
                    <Form.Label>Nombre de la Subclase</Form.Label>
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

            <div className="d-flex justify-content-end mt-4">
                <Button 
                    variant="secondary" 
                    onClick={() => navigate('/dashboard-subclase')}
                    disabled={isSubmitting}
                    className="me-2">
                    Cancelar
                </Button>
                <Button 
                    variant="primary" 
                    type="submit"
                    disabled={isSubmitting}>
                    {isSubmitting && <Spinner as="span" animation="border" size="sm" className="me-2" />}
                    {isEditing ? 'Guardar Cambios' : 'Agregar Subclase'}
                </Button>
            </div>
        </Form>
    );
}

export default SubclaseForm;