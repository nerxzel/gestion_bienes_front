import { useState, useEffect } from "react";
import { Form, Button, Row, Col, Spinner, Card } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import api from "../../../api/axiosConfig";

function SubclaseForm({ initialData, onSubmit, isEditing, catalogos, isSubmitting = false }) {
    const [formData, setFormData] = useState(initialData);
    const [erroresValidacion, setErroresValidacion] = useState({});

    const [opcionesClase, setOpcionesClase] = useState(catalogos?.clases || []);
    const [cargandoClases, setCargandoClases] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        setFormData(initialData);
    }, [initialData]);

    useEffect(() => {
        setOpcionesClase(catalogos?.clases || []);
    }, [catalogos?.clases]);

    const handleFormChange = async (e) => {
        const { name, value } = e.target;

        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        if (erroresValidacion[name]) {
            setErroresValidacion(prev => ({
                ...prev, [name]: null
            }));
        }

        if (name === 'grupoId') {
            const grupoId = value;

            setFormData(prev => ({ ...prev, claseId: '' }));
            setOpcionesClase([]);

            if (grupoId) {
                setCargandoClases(true);
                try {
                    const res = await api.get(`/clase?grupoId=${grupoId}`);
                    setOpcionesClase(res.data || []);
                } catch (error) {
                    console.error("Error cargando clases", error);
                    setOpcionesClase([]);
                } finally {
                    setCargandoClases(false);
                }
            }
        }
    };

    const validarFormulario = () => {
        const errores = {};

        if (!formData.grupoId || formData.grupoId === '') {
            errores.grupoId = 'Debe seleccionar un grupo.';
        }

        if (!formData.claseId || formData.claseId === '') {
            errores.claseId = 'Debe seleccionar una clase.';
        }

        if (!formData.nombre || formData.nombre.trim() === '') {
            errores.nombre = 'El nombre de la subclase no puede estar vacio.';
        } else if (formData.nombre.length > 35) {
            errores.nombre = 'El nombre de la subclase no puede tener más de 35 caracteres';
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

    const grupos = catalogos?.grupos || [];

    return (
        <Form onSubmit={handleSubmit}>
            <Card>
                <Card.Body>


                    <Row className="mb-3">
                        <Form.Group as={Col} md="4" controlId="formGrupoGrid">
                            <Form.Label>Grupo al que pertenece</Form.Label>
                            <Form.Select
                                name="grupoId"
                                value={formData.grupoId || ''}
                                onChange={handleFormChange}
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

                        <Form.Group as={Col} md="4" controlId="formClaseGrid">
                            <Form.Label>Clase a la que pertenece</Form.Label>
                            <Form.Select
                                name="claseId"
                                value={formData.claseId || ''}
                                onChange={handleFormChange}
                                disabled={isSubmitting || !formData.grupoId || cargandoClases}
                                isInvalid={!!erroresValidacion.claseId}
                                required
                            >
                                <option value="">
                                    {cargandoClases ? 'Cargando...' : (!formData.grupoId ? 'Primero seleccione un Grupo' : 'Seleccione Clase')}
                                </option>
                                {opcionesClase.map(c => (
                                    <option key={c.id} value={c.id}>{c.nombre}</option>
                                ))}
                            </Form.Select>
                            <Form.Control.Feedback type="invalid">
                                {erroresValidacion.claseId}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group as={Col} md="4" controlId="formSubclaseGrid">
                            <Form.Label>Nombre de la Subclase</Form.Label>
                            <Form.Control
                                type="text"
                                name="nombre"
                                value={formData.nombre || ''}
                                onChange={handleFormChange}
                                isInvalid={!!erroresValidacion.nombre}
                                disabled={isSubmitting || !formData.grupoId || !formData.claseId}
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
                    onClick={() => navigate('/dashboard-subclase')}
                    disabled={isSubmitting}
                    className="me-2">
                    Cancelar
                </Button>
                <Button
                    variant="success"
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