import { Row, Alert } from 'react-bootstrap';
import { FormInput } from '../../bien/components/formFields.jsx';
import { formatCLP } from '../../../utils/formatUtils.js'; 
import { esAlta, CONDICION } from '../../../utils/condicionUtils.js';

const formatDate = (dateString) => dateString ? dateString.split('T')[0] : '';

export const AltaBajaDetalle = ({ bien, exitoso, tipoAccion }) => {
    if (!bien) return null;

    const esAltaActual = esAlta(bien.condicion);
    const condicionClass = esAltaActual ? 'bg-success-subtle' : 'bg-danger-subtle';
    const resolucionClass = exitoso ? 'bg-success-subtle' : 'bg-light';

    return (
        <>
            <h6 className="text-muted mb-3">Información del Bien</h6>
            <Row>
                <FormInput md="4" label="Código Inventario" name="codigo" value={bien.codigoInventario} disabled readOnly className="bg-light" />
                <FormInput md="8" label="Descripción Corta" name="nombre" value={bien.nombre} disabled readOnly className="bg-light" />
            </Row>
            <Row>
                <FormInput md="6" label="Condición Actual" name="condicion" value={bien.condicion} disabled readOnly className={condicionClass} />
                <FormInput md="6" label="Fecha Ingreso" name="fechaIngreso" value={formatDate(bien.fechaIngreso)} disabled readOnly className="bg-light" />
            </Row>

            <hr className="my-4" />
            
            <h6 className="text-muted mb-3">Información de Resolución</h6>
            <Row>
                <FormInput 
                    md="6" label="Número de Resolución" name="nroResolucion" 
                    value={bien.nroResolucion || '(Sin asignar)'} 
                    disabled readOnly className={resolucionClass} 
                />
                <FormInput 
                    md="6" label="Fecha de Resolución" name="fechaResolucion" 
                    value={formatDate(bien.fechaResolucion)} 
                    disabled readOnly className={resolucionClass} 
                />
            </Row>
            
            {!bien.nroResolucion && !exitoso && (
                <div className="text-muted small ms-2 mt-n2 mb-3">
                    * Se asignará automáticamente al dar de {tipoAccion}.
                </div>
            )}

            {exitoso && (
                <Alert variant="success" className="mt-3">
                    <strong>Datos Actualizados:</strong>
                    <ul className="mb-0 mt-2">
                        <li>Nro. Resolución: <strong>{bien.nroResolucion}</strong></li>
                        <li>Fecha: <strong>{formatDate(bien.fechaResolucion)}</strong></li>
                        <li>Nueva Condición: <strong>{esAlta(bien.condicion) ? CONDICION.ALTA : CONDICION.BAJA}</strong></li>
                    </ul>
                </Alert>
            )}
        </>
    );
};