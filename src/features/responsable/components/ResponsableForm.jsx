import { useState, useEffect } from "react";
import { Form, Button, Row, Col, Spinner } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';

function ResponsableForm({ initialData, onSubmit, isEditing, isSubmitting = false}) {
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
            errores.nombre = 'El nombre del responsable no puede estar vacio.';
        } else if (formData.nombre.length > 35) {
            errores.nombre = 'El nombre del responsable no puede tener más de 35 caracteres'
        }
    
        if(!formData.rut || formData.rut.toString().trim() === '') {
            errores.rut = 'El RUT es obligatorio.';
        } else if (parseInt(formData.rut) <= 0) {
            errores.rut = 'El RUT debe ser un número válido.';
        } else if (parseInt(formData.rut, 10) > 999999999) {
            errores.rut = 'El RUT no puede tener más de 9 dígitos.';}
    
        if(!formData.cargo || formData.cargo.trim() === '') {
            errores.cargo = 'El cargo es obligatorio.';
        } else if (formData.cargo.length > 35) {
            errores.cargo = 'El cargo no puede tener más de 35 caracteres.';
        }
    
        if(!formData.estado || formData.estado === '') {
            errores.estado = 'Debe seleccionar un estado.';}

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

    return (
        <Form onSubmit={handleSubmit}>
            <Row className="mb-3">
                <Form.Group as={Col} md="6" controlId="formNombre">
                <Form.Label>Nombre del responsable</Form.Label>
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

        <Form.Group as={Col} md="6" controlId="formRut">
            <Form.Label>RUT del responsable</Form.Label>
            <Form.Control
                type="text"
                name="rut"
                value={formData.rut || ''}
                onChange={handleInputChange}
                isInvalid={!!erroresValidacion.rut}
                disabled={isSubmitting}
                required
            />
            <Form.Control.Feedback type="invalid">
                {erroresValidacion.rut}
            </Form.Control.Feedback>
        </Form.Group>
    </Row>

    <Row className="mb-3">
        <Form.Group as={Col} md="6" controlId="formCargo">
            <Form.Label>Cargo</Form.Label>
            <Form.Control
                type="text"
                name="cargo"
                value={formData.cargo || ''}
                onChange={handleInputChange}
                isInvalid={!!erroresValidacion.cargo}
                disabled={isSubmitting}
                required
                maxLength="35"
            />
            <Form.Control.Feedback type="invalid">
                {erroresValidacion.cargo}
            </Form.Control.Feedback>
        </Form.Group>

        <Form.Group as={Col} md="6" controlId="formEstado">
            <Form.Label>Estado</Form.Label>
            <Form.Select 
                name="estado" 
                value={formData.estado || ''} 
                onChange={handleInputChange}
                isInvalid={!!erroresValidacion.estado}
                disabled={isSubmitting}
                required
            >
                <option value="">Seleccione estado</option>
                <option value="Activo">Activo</option>
                <option value="Inactivo">Inactivo</option>
            </Form.Select>
            <Form.Control.Feedback type="invalid">
                {erroresValidacion.estado}
            </Form.Control.Feedback>
        </Form.Group>
    </Row>

    <div className="d-flex justify-content-end mt-4">
        <Button
            variant="secondary" 
            onClick={() => navigate('/dashboard-responsable')}
            disabled={isSubmitting}
            className="me-2"
        >
            Cancelar
        </Button>

        <Button
            variant="success" 
            type="submit"
            disabled={isSubmitting}
        >
            {isSubmitting && <Spinner as="span" animation="border" size="sm" className="me-2" />}
            {isEditing ? 'Guardar Cambios' : 'Agregar Responsable'}
        </Button>
    </div>
</Form>);
} 
        
export default ResponsableForm;