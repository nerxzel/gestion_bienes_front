import { useState, useEffect } from "react";
import { Form, Button, Row, Col, Spinner } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import { FaTrash } from 'react-icons/fa';
import { formatCLP } from '../../../utils/formatUtils';
import api from '../../../api/axiosConfig';

function BienForm({ initialData, onSubmit, isEditing, catalogos, onDelete, isSubmitting = false }) {
    const [formData, setFormData] = useState(initialData);
    const navigate = useNavigate();

    const [opcionesClase, setOpcionesClase] = useState([]);
    const [opcionesSubclase, setOpcionesSubclase] = useState([]);
    const [opcionesModelo, setOpcionesModelo] = useState([]);

    const [cargandoClases, setCargandoClases] = useState(false);
    const [cargandoSubclases, setCargandoSubclases] = useState(false);
    const [cargandoModelos, setCargandoModelos] = useState(false);

    useEffect(() => {
        setFormData(initialData);

        const cargarOpcionesIniciales = async () => {
            setOpcionesClase([]);
            setOpcionesSubclase([]);
            setOpcionesModelo([]);

            const currentData = initialData || {};
            let clasesLoaded = false;

            if (currentData.idGrupo) {
                setCargandoClases(true);
                try {
                    const res = await api.get(`/clase/${currentData.idGrupo}`);
                    setOpcionesClase(res.data || []);
                    clasesLoaded = true;
                } catch (err) { console.error("Error cargando clases iniciales", err); }
                finally { setCargandoClases(false); }
            }

            if (currentData.idClase && (clasesLoaded || opcionesClase.length > 0)) {
                setCargandoSubclases(true);
                try {
                    const res = await api.get(`/subclase/dropdown/${currentData.idClase}`);
                    setOpcionesSubclase(res.data || []);
                } catch (err) { console.error("Error cargando subclases iniciales", err); }
                finally { setCargandoSubclases(false); }
            }

            if (currentData.idMarca) {
                setCargandoModelos(true);
                try {
                    const res = await api.get(`/modelo?dropdown=true/${currentData.idMarca}`);
                    setOpcionesModelo(res.data || []);
                } catch (err) { console.error("Error cargando modelos iniciales", err); }
                finally { setCargandoModelos(false); }
            }
        };


        if (isEditing && initialData) {
            cargarOpcionesIniciales();
        } else {
            setOpcionesClase([]);
            setOpcionesSubclase([]);
            setOpcionesModelo([]);
        }

    }, [initialData, isEditing]);


    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleCatalogoChange = async (e) => {
        const { name, value } = e.target;
        const selectedId = value;

        let update = { [name]: selectedId };
        let selectedItemName = '';

        const safeCatalogos = {
            grupos: [], marcas: [], ubicaciones: [], unidadesMedida: [], responsables: [], ...catalogos
        };

        try {
            if (!selectedId) {
                if (name === 'idGrupo') { update = { ...update, grupo: '', idClase: '', clase: '', idSubClase: '', subClase: '' }; setOpcionesClase([]); setOpcionesSubclase([]); }
                if (name === 'idClase') { update = { ...update, clase: '', idSubClase: '', subClase: '' }; setOpcionesSubclase([]); }
                if (name === 'idSubClase') { update = { ...update, subClase: '' }; }
                if (name === 'idMarca') { update = { ...update, marca: '', idModelo: '', modelo: '' }; setOpcionesModelo([]); }
                if (name === 'idModelo') { update = { ...update, modelo: '' }; }

                if (name === 'idUbicacion') { update = { ...update, ubicacion: '' }; }
                if (name === 'idUnidadMedida') { update = { ...update, unidadMedida: '' }; }
                if (name === 'idResponsable') { update = { ...update, responsableRut: '' }; }
            } else {

                if (name === 'idGrupo') {
                    const item = safeCatalogos.grupos.find(g => g.id === parseInt(selectedId));
                    selectedItemName = item?.nombre || '';
                    update = { ...update, grupo: selectedItemName, idClase: '', clase: '', idSubClase: '', subClase: '' };
                    setOpcionesClase([]); setOpcionesSubclase([]); setCargandoClases(true);
                    const res = await api.get(`/clase?grupoId=${selectedId}`);
                    setOpcionesClase(res.data || []);

                } else if (name === 'idClase') {
                    const item = opcionesClase.find(c => c.id === parseInt(selectedId));
                    selectedItemName = item?.nombre || '';
                    update = { ...update, clase: selectedItemName, idSubClase: '', subClase: '' };
                    setOpcionesSubclase([]); setCargandoSubclases(true);
                    const res = await api.get(`/subclase?clasId=${selectedId}`);
                    setOpcionesSubclase(res.data || []);

                } else if (name === 'idSubClase') {
                    const item = opcionesSubclase.find(sc => sc.id === parseInt(selectedId));
                    selectedItemName = item?.nombre || '';
                    update = { ...update, subClase: selectedItemName };

                } else if (name === 'idMarca') {
                    const item = safeCatalogos.marcas.find(m => m.id === parseInt(selectedId));
                    selectedItemName = item?.nombre || '';
                    update = { ...update, marca: selectedItemName, idModelo: '', modelo: '' };
                    setOpcionesModelo([]); setCargandoModelos(true);
                    const res = await api.get(`/modelo?dropdown=true/${selectedId}`);
                    setOpcionesModelo(res.data || []);

                } else if (name === 'idModelo') {
                    const item = opcionesModelo.find(m => m.id === parseInt(selectedId));
                    selectedItemName = item?.nombre || '';
                    update = { ...update, modelo: selectedItemName };

                } else if (name === 'idUbicacion') {
                    const item = safeCatalogos.ubicaciones.find(u => u.id === parseInt(selectedId));
                    update = { ...update, ubicacion: item?.nombre || '' };

                } else if (name === 'idUnidadMedida') {
                    const item = safeCatalogos.unidadesMedida.find(um => um.id === parseInt(selectedId));
                    update = { ...update, unidadMedida: item?.nombre || '' };

                } else if (name === 'idResponsable') {
                    const item = safeCatalogos.responsables.find(r => r.id === parseInt(selectedId));
                    update = { ...update, responsableRut: item?.rut || '' };
                }
            }
        } catch (error) {
            console.error(`Error al procesar cambio de ${name}:`, error);
        } finally {
            if (name === 'idGrupo') setCargandoClases(false);
            if (name === 'idClase') setCargandoSubclases(false);
            if (name === 'idMarca') setCargandoModelos(false);
        }

        setFormData(prev => ({ ...prev, ...update }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        onSubmit(formData);
    };

    const handleDeleteClick = () => {
        const confirmar = window.confirm(
            `¿Está seguro de que desea eliminar el bien "${formData?.nombre || 'este bien'}" (ID: ${formData?.id})? Esta acción eliminará el bien.`
        );
        if (confirmar && onDelete) {
            onDelete();
        }
    };

    const currentCatalogos = {
        grupos: [], marcas: [], ubicaciones: [], unidadesMedida: [], responsables: [], ...catalogos
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Row className="mb-3">
                {isEditing && (
                    <Form.Group as={Col} md="4" controlId="formGridCodigoInv">
                        <Form.Label>Código Inventario</Form.Label>
                        <Form.Control
                            type="text"
                            name="codigoInventario"
                            value={formData.codigoInventario || ''}
                            disabled
                            readOnly
                        />
                    </Form.Group>
                )}
                {isEditing && (
                    <Form.Group as={Col} md="4" controlId="formGridFechaToma">
                        <Form.Label>Fecha Última Toma</Form.Label>
                        <Form.Control
                            type="date"
                            name="fechaUltimaToma"
                            value={formData.fechaUltimaToma || ''}
                            disabled
                            readOnly />
                    </Form.Group>
                )}
                {isEditing && formData.fechaResolucion && (
                    <Form.Group as={Col} md="4" controlId="formGridFechaToma">
                        <Form.Label>Fecha Resolución</Form.Label>
                        <Form.Control
                            type="date"
                            name="fechaResolucion"
                            value={formData.fechaResolucion || ''}
                            disabled
                            readOnly />
                    </Form.Group>
                )}
            </Row>

            <Row className="mb-3">

                <Form.Group as={Col} md="6" controlId="formGridDescCorta">
                    <Form.Label>Descripción Corta</Form.Label>
                    <Form.Control
                        type="text"
                        name="nombre"
                        value={formData.nombre || ''}
                        onChange={handleInputChange}
                        disabled={isSubmitting}
                        maxLength="35"
                        required />
                </Form.Group>
                <Form.Group as={Col} md="6" controlId="formGridDescLarga">
                    <Form.Label>Descripción Larga</Form.Label>
                    <Form.Control
                        type="text"
                        name="descripcionLarga"
                        value={formData.descripcionLarga || ''}
                        onChange={handleInputChange}
                        disabled={isSubmitting}
                        maxLength="50"
                        required />
                </Form.Group>
            </Row>

            <Row className="mb-3">
                <Form.Group as={Col} md="4" controlId="formGridFechaIngreso">
                    <Form.Label>Fecha Ingreso</Form.Label>
                    <Form.Control
                        type="date"
                        name="fechaAdquisicion"
                        value={formData.fechaAdquisicion || ''}
                        onChange={handleInputChange}
                        disabled={isSubmitting}
                        required />
                </Form.Group>
                <Form.Group as={Col} md="4" controlId="formGridTipoObjeto">
                    <Form.Label>Tipo Objeto</Form.Label>
                    <Form.Control
                        type="text"
                        name="tipoObjeto"
                        value={formData.tipoObjeto || ''}
                        onChange={handleInputChange}
                        disabled={isSubmitting}
                        required />
                </Form.Group>

                <Form.Group as={Col} md="4" controlId="formGridResponsable">
                    <Form.Label>Responsable</Form.Label>
                    <Form.Select
                        name="idResponsable"
                        value={formData.idResponsable || ''}
                        onChange={handleCatalogoChange}
                        disabled={isSubmitting}
                        required>
                        <option value="">Seleccione Responsable</option>
                        {currentCatalogos.responsables.map(r => (
                            <option key={r.id} value={r.id}>
                                {r.rut} - {r.nombre}
                            </option>
                        ))}
                    </Form.Select>
                </Form.Group>

            </Row>

            <Row className="mb-3">
                <Form.Group as={Col} md="4" controlId="formGridCostoAdquisicion">
                    <Form.Label>Costo de Adquisición ($) (Sin puntos ni comas)</Form.Label>
                    <Form.Control
                        type="number"
                        name="costoAdquisicion"
                        value={formData.costoAdquisicion ?? ''}
                        onChange={handleInputChange}
                        disabled={isSubmitting || isEditing}
                        readOnly={isEditing}
                        required
                        min="0"
                    />
                    {isEditing && (
                        <Form.Text muted>
                            Valor: {formatCLP(formData.costoAdquisicion)}
                        </Form.Text>
                    )}
                </Form.Group>

                <Form.Group as={Col} md="4" controlId="formGridValorResidual">
                    <Form.Label>Valor Residual ($) (Sin puntos ni comas)</Form.Label>
                    <Form.Control
                        type="number"
                        name="valorResidual"
                        value={formData.valorResidual ?? ''}
                        onChange={handleInputChange}
                        disabled={isSubmitting}
                        required
                        min="0"
                    />
                </Form.Group>

                <Form.Group as={Col} md="4" controlId="formGridValorActual">
                    <Form.Label>Valor Actual ($)</Form.Label>
                    <Form.Control
                        type="text"
                        name="valor"
                        value={!isEditing
                            ? (formData.costoAdquisicion ? formatCLP(formData.costoAdquisicion) : '$ 0')
                            : formatCLP(formData.valor)}
                        readOnly
                        disabled
                        className="bg-light"
                    />
                </Form.Group>
            </Row>


            <Row className="mb-3">
                <Form.Group as={Col} md="4" controlId="formGridGrupo">
                    <Form.Label>Grupo</Form.Label>
                    <Form.Select
                        name="idGrupo"
                        value={formData.idGrupo || ''}
                        onChange={handleCatalogoChange}
                        disabled={isSubmitting}
                        required>
                        <option value="">Seleccione Grupo</option>
                        {currentCatalogos.grupos.map(g => <option key={g.id} value={g.id}>{g.nombre}</option>)}
                    </Form.Select>
                </Form.Group>

                <Form.Group as={Col} md="4" controlId="formGridClase">
                    <Form.Label>Clase</Form.Label>
                    <Form.Select
                        name="idClase" value={formData.idClase || ''}
                        onChange={handleCatalogoChange}
                        disabled={isSubmitting || !formData.idGrupo || cargandoClases}
                        required>
                        <option value="">{cargandoClases ? 'Cargando...' : (!formData.idGrupo ? 'Seleccione Grupo primero' : 'Seleccione Clase')}</option>
                        {opcionesClase.map(c => <option key={c.id} value={c.id}>{c.nombre}</option>)}
                    </Form.Select>
                </Form.Group>

                <Form.Group as={Col} md="4" controlId="formGridSubclase">
                    <Form.Label>Subclase</Form.Label>
                    <Form.Select
                        name="idSubClase"
                        value={formData.idSubClase || ''}
                        onChange={handleCatalogoChange}
                        disabled={isSubmitting || !formData.idClase || cargandoSubclases}
                        required>
                        <option value="">{cargandoSubclases ? 'Cargando...' : (!formData.idClase ? 'Seleccione Clase primero' : 'Seleccione Subclase')}</option>
                        {opcionesSubclase.map(sc => <option key={sc.id} value={sc.id}>{sc.nombre}</option>)}
                    </Form.Select>
                </Form.Group>
            </Row>

            <Row className="mb-3">

                <Form.Group as={Col} md="6" controlId="formGridMarca">
                    <Form.Label>Marca</Form.Label>
                    <Form.Select
                        name="idMarca"
                        value={formData.idMarca || ''}
                        onChange={handleCatalogoChange}
                        disabled={isSubmitting}
                        required>
                        <option value="">Seleccione Marca</option>
                        {currentCatalogos.marcas.map(m => <option key={m.id} value={m.id}>{m.nombre}</option>)}
                    </Form.Select>

                </Form.Group>
                <Form.Group as={Col} md="6" controlId="formGridModelo">
                    <Form.Label>Modelo</Form.Label>
                    <Form.Select name="idModelo"
                        value={formData.idModelo || ''}
                        onChange={handleCatalogoChange}
                        disabled={isSubmitting || !formData.idMarca || cargandoModelos}
                        required>
                        <option value="">{cargandoModelos ? 'Cargando...' : (!formData.idMarca ? 'Seleccione Marca primero' : 'Seleccione Modelo')}</option>
                        {opcionesModelo.map(m => <option key={m.id} value={m.id}>{m.nombre}</option>)}
                    </Form.Select>
                </Form.Group>
            </Row>
            <Row className="mb-3">
                <Form.Group as={Col} md="4" controlId="formGridNumSerie">
                    <Form.Label>Número de Serie</Form.Label>
                    <Form.Control type="text"
                        name="numSerie"
                        value={formData.numSerie || ''}
                        onChange={handleInputChange}
                        disabled={isSubmitting}
                        maxLength="20" />
                </Form.Group>
                <Form.Group as={Col} md="4" controlId="formGridColor">
                    <Form.Label>Color</Form.Label>
                    <Form.Control type="text"
                        name="color"
                        value={formData.color || ''}
                        onChange={handleInputChange}
                        disabled={isSubmitting}
                        required />
                </Form.Group>
                <Form.Group as={Col} md="4" controlId="formGridCantidad">
                    <Form.Label>Cantidad Piezas</Form.Label>
                    <Form.Control type="number"
                        name="cantidadPieza"
                        value={formData.cantidadPieza || ''}
                        onChange={handleInputChange}
                        disabled={isSubmitting}
                        min="0"
                        required />
                </Form.Group>
            </Row>

            <Row className="mb-3">
                <Form.Group as={Col} md="4" controlId="formGridLargo">
                    <Form.Label>Largo</Form.Label>
                    <Form.Control type="number"
                        step="0.1"
                        name="largo"
                        value={formData.largo || ''}
                        onChange={handleInputChange}
                        disabled={isSubmitting}
                        required />
                </Form.Group>
                <Form.Group as={Col} md="4" controlId="formGridAlto">
                    <Form.Label>Alto</Form.Label>
                    <Form.Control type="number"
                        step="0.1"
                        name="alto"
                        value={formData.alto || ''}
                        onChange={handleInputChange}
                        disabled={isSubmitting}

                        required />
                </Form.Group>
                <Form.Group as={Col} md="4" controlId="formGridAncho">
                    <Form.Label>Ancho</Form.Label>
                    <Form.Control type="number"
                        step="0.1"
                        name="ancho"
                        value={formData.ancho || ''}
                        onChange={handleInputChange}
                        disabled={isSubmitting}
                        min="0"
                        required />
                </Form.Group>
            </Row>

            <Row className="mb-3">
                <Form.Group as={Col} md="4" controlId="formGridIsla">
                    <Form.Label>Isla</Form.Label>
                    <Form.Control type="text"
                        name="isla"
                        value={formData.isla || ''}
                        onChange={handleInputChange}
                        disabled={isSubmitting}
                        maxLength="2" />
                </Form.Group>
                <Form.Group as={Col} md="4" controlId="formGridFila">
                    <Form.Label>Fila</Form.Label>
                    <Form.Control type="text"
                        name="fila"
                        value={formData.fila || ''}
                        onChange={handleInputChange}
                        disabled={isSubmitting}
                        maxLength="2" />
                </Form.Group>
                <Form.Group as={Col} md="4" controlId="formGridColumna">
                    <Form.Label>Columna</Form.Label>
                    <Form.Control type="text"
                        name="columna"
                        value={formData.columna || ''}
                        onChange={handleInputChange}
                        disabled={isSubmitting}
                        maxLength="2" />
                </Form.Group>
            </Row>

            <Row className="mb-3">
                <Form.Group as={Col} md="4" controlId="formGridUbicacion">
                    <Form.Label>Ubicación</Form.Label>
                    <Form.Select name="idUbicacion"
                        value={formData.idUbicacion || ''}
                        onChange={handleCatalogoChange}
                        disabled={isSubmitting}
                        min="0"
                        required>
                        <option value="">Seleccione Ubicación</option>
                        {currentCatalogos.ubicaciones.map(u => <option key={u.id} value={u.id}>{u.nombre}</option>)}
                    </Form.Select>
                </Form.Group>
                <Form.Group as={Col} md="4" controlId="formGridUnidadMed">
                    <Form.Label>Unidad Medida</Form.Label>
                    <Form.Select name="idUnidadMedida"
                        value={formData.idUnidadMedida || ''}
                        onChange={handleCatalogoChange}
                        disabled={isSubmitting}
                        required>
                        <option value="">Seleccione Unidad</option>
                        {currentCatalogos.unidadesMedida.map(um => <option key={um.id} value={um.id}>{um.nombre}</option>)}
                    </Form.Select>
                </Form.Group>


                {isEditing && (
                    <Form.Group as={Col} md="4" controlId="formGridCondicion">
                        <Form.Label>Condición</Form.Label>
                        <Form.Control
                            type="text"
                            name="condicion"
                            value={formData.condicion || ''}
                            readOnly
                            disabled
                            className={formData.condicion === 'Alta' ? 'bg-success-subtle' : 'bg-danger-subtle'}
                        />
                    </Form.Group>)}
            </Row>

            <div className="d-flex justify-content-end mt-4">
                {isEditing && (
                    <Button
                        variant="danger"
                        onClick={handleDeleteClick}
                        className="me-auto"
                        type="button"
                        disabled={isSubmitting}
                    >
                        <FaTrash /> Eliminar
                    </Button>
                )}
                <Button
                    variant="secondary"
                    onClick={() => navigate('/dashboard')}
                    className="me-2"
                    disabled={isSubmitting}>
                    Cancelar
                </Button>
                <Button
                    variant="primary"
                    type="submit"
                    disabled={isSubmitting}>
                    {isEditing ? 'Guardar Cambios' : 'Agregar Bien'}
                </Button>

            </div>
        </Form>
    );
}

export default BienForm;