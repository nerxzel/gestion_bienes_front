import { Form, Button, Row, Spinner } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import { FaTrash } from 'react-icons/fa';
import { formatCLP } from '../../../utils/formatUtils';
import { useBienForm } from '../../../hooks/useBienForm';
import { FormInput, FormSelect } from '../components/formFields';

function BienForm({ initialData, onSubmit, isEditing, catalogos, onDelete, isSubmitting = false }) {
    const navigate = useNavigate();

    const { 
        formData, 
        errores,
        handleInputChange, 
        handleCatalogoChange, 
        dynamicOptions, 
        loaders 
    } = useBienForm(initialData, isEditing);

    const handleSubmit = (event) => {
        event.preventDefault();
        onSubmit(formData);
    };

    const valorActualDisplay = !isEditing
        ? (formData.costoAdquisicion ? formatCLP(formData.costoAdquisicion) : '$ 0')
        : formatCLP(formData.valor);

    const condicionClass = formData.condicion === 'Alta' ? 'bg-success-subtle' : 'bg-danger-subtle';

    return (
        <Form onSubmit={handleSubmit}>
            
            <Row>
                {isEditing && (
                    <>
                        <FormInput 
                            label="Cód. Inventario" name="codigoInventario" 
                            value={formData.codigoInventario} disabled readOnly 
                        />
                        <FormInput 
                            label="Fecha Ult. Toma" name="fechaUltimaToma" type="date" 
                            value={formData.fechaUltimaToma} disabled readOnly 
                        />
                    </>
                )}
                {isEditing && formData.fechaResolucion && (
                    <FormInput 
                        label="Fecha Resolución" name="fechaResolucion" type="date" 
                        value={formData.fechaResolucion} disabled readOnly 
                    />
                )}
            </Row>

            <Row>
                <FormInput 
                    md="6" label="Descripción Corta" name="nombre" 
                    value={formData.nombre} onChange={handleInputChange} 
                    maxLength="35" required disabled={isSubmitting} 
                    error={errores?.nombre}
                />
                <FormInput 
                    md="6" label="Descripción Larga" name="descripcionLarga" 
                    value={formData.descripcionLarga} onChange={handleInputChange} 
                    maxLength="50" required disabled={isSubmitting} 
                    error={errores?.descripcionLarga}
                />
            </Row>

            <Row>
                <FormInput 
                    label="Fecha Ingreso" name="fechaIngreso" type="date" 
                    value={formData.fechaIngreso} onChange={handleInputChange} 
                    required disabled={isSubmitting} 
                    error={errores?.fechaIngreso}
                />
                <FormInput 
                    label="Tipo Objeto" name="tipoObjeto" 
                    value={formData.tipoObjeto} onChange={handleInputChange} 
                    required disabled={isSubmitting} 
                    error={errores?.tipoObjeto}
                />
                <FormSelect 
                    label="Responsable" name="responsableId" 
                    value={formData.responsableId} options={catalogos.responsables || []} 
                    onChange={handleCatalogoChange} required disabled={isSubmitting} 
                    error={errores?.responsableId}
                />
            </Row>

            <Row>
                <FormInput 
                    type="number" label="Costo Adquisición ($)" name="costoAdquisicion" 
                    value={formData.costoAdquisicion} onChange={handleInputChange} 
                    min="0" required disabled={isSubmitting || isEditing} 
                    readOnly={isEditing} 
                    error={errores?.costoAdquisicion}
                />
                <FormInput 
                    type="number" label="Valor Residual ($)" name="valorResidual" 
                    value={formData.valorResidual} onChange={handleInputChange} 
                    min="0" required disabled={isSubmitting} 
                    error={errores?.valorResidual}
                />
                <FormInput 
                    label="Valor Actual" name="valorDisplay" 
                    value={valorActualDisplay} 
                    disabled readOnly className="bg-light" 
                />
            </Row>

            <Row>
                <FormSelect 
                    label="Grupo" name="grupoId" 
                    value={formData.grupoId} options={catalogos.grupos || []} 
                    onChange={handleCatalogoChange} required disabled={isSubmitting} 
                    error={errores?.grupoId}
                />
                <FormSelect 
                    label="Clase" name="claseId" 
                    value={formData.claseId} options={dynamicOptions.clases} 
                    onChange={handleCatalogoChange} loading={loaders.clases} 
                    disabled={isSubmitting || !formData.grupoId} 
                    defaultOption={!formData.grupoId ? 'Seleccione Grupo primero' : 'Seleccione Clase'}
                    required error={errores?.claseId}
                />
                <FormSelect 
                    label="Subclase" name="subclaseId" 
                    value={formData.subclaseId} options={dynamicOptions.subclases} 
                    onChange={handleCatalogoChange} loading={loaders.subclases} 
                    disabled={isSubmitting || !formData.claseId} 
                    defaultOption={!formData.claseId ? 'Seleccione Clase primero' : 'Seleccione Subclase'}
                    required error={errores?.subclaseId}
                />
            </Row>

            <Row>
                <FormSelect 
                    md="6" label="Marca" name="marcaId" 
                    value={formData.marcaId} options={catalogos.marcas || []} 
                    onChange={handleCatalogoChange} required disabled={isSubmitting} 
                    error={errores?.marcaId}
                />
                <FormSelect 
                    md="6" label="Modelo" name="modeloId" 
                    value={formData.modeloId} options={dynamicOptions.modelos} 
                    onChange={handleCatalogoChange} loading={loaders.modelos} 
                    disabled={isSubmitting || !formData.marcaId} 
                    defaultOption={!formData.marcaId ? 'Seleccione Marca primero' : 'Seleccione Modelo'}
                    required error={errores?.modeloId}
                />
            </Row>

            <Row>
                <FormInput 
                    label="N° Serie" name="numSerie" 
                    value={formData.numSerie} onChange={handleInputChange} 
                    maxLength="20" disabled={isSubmitting} 
                    error={errores?.numSerie}
                />
                <FormInput 
                    label="Color" name="color" 
                    value={formData.color} onChange={handleInputChange} 
                    required disabled={isSubmitting} 
                    error={errores?.color}
                />
                <FormInput 
                    type="number" label="Cantidad" name="cantidadPieza" 
                    value={formData.cantidadPieza} onChange={handleInputChange} 
                    min="0" required disabled={isSubmitting} 
                    error={errores?.cantidadPieza}
                />
            </Row>

            <Row>
                <FormInput 
                    type="number" step="0.1" label="Largo" name="largo" 
                    value={formData.largo} onChange={handleInputChange} 
                    required disabled={isSubmitting} error={errores?.largo}
                />
                <FormInput 
                    type="number" step="0.1" label="Alto" name="alto" 
                    value={formData.alto} onChange={handleInputChange} 
                    required disabled={isSubmitting} error={errores?.alto}
                />
                <FormInput 
                    type="number" step="0.1" label="Ancho" name="ancho" 
                    value={formData.ancho} onChange={handleInputChange} 
                    min="0" required disabled={isSubmitting} error={errores?.ancho}
                />
            </Row>

            <Row>
                <FormInput label="Isla" name="isla" value={formData.isla} onChange={handleInputChange} maxLength="2" disabled={isSubmitting} />
                <FormInput label="Fila" name="fila" value={formData.fila} onChange={handleInputChange} maxLength="2" disabled={isSubmitting} />
                <FormInput label="Columna" name="columna" value={formData.columna} onChange={handleInputChange} maxLength="2" disabled={isSubmitting} />
            </Row>

            <Row>
                <FormSelect 
                    label="Ubicación" name="ubicacionId" 
                    value={formData.ubicacionId} options={catalogos.ubicaciones || []} 
                    onChange={handleCatalogoChange} required disabled={isSubmitting} 
                    error={errores?.ubicacionId}
                />
                <FormSelect 
                    label="Unidad Medida" name="unidadMedidaId" 
                    value={formData.unidadMedidaId} options={catalogos.unidadesMedida || []} 
                    onChange={handleCatalogoChange} required disabled={isSubmitting} 
                    error={errores?.unidadMedidaId}
                />
                
                <FormSelect 
                    label="Estado" name="estado" 
                    value={formData.estado} onChange={handleInputChange} 
                    disabled={isSubmitting} required error={errores?.estado}
                    options={[
                        { id: 'Bueno', nombre: 'Bueno' },
                        { id: 'Regular', nombre: 'Regular' },
                        { id: 'Malo', nombre: 'Malo' }
                    ]}
                />

                {isEditing && (
                    <FormInput 
                        label="Condición" name="condicion" 
                        value={formData.condicion} disabled readOnly 
                        className={condicionClass} 
                    />
                )}
            </Row>

            <div className="d-flex justify-content-end mt-4">
                {isEditing && onDelete && (
                    <Button 
                        variant="danger" onClick={onDelete} 
                        className="me-auto" disabled={isSubmitting}
                    >
                        <FaTrash /> Eliminar
                    </Button>
                )}
                
                <Button 
                    variant="secondary" onClick={() => navigate('/dashboard')} 
                    className="me-2" disabled={isSubmitting}
                >
                    Cancelar
                </Button>
                
                <Button variant="primary" type="submit" disabled={isSubmitting}>
                    {isSubmitting && <Spinner as="span" animation="border" size="sm" className="me-2" />}
                    {isEditing ? 'Guardar Cambios' : 'Agregar Bien'}
                </Button>
            </div>
        </Form>
    );
}

export default BienForm;