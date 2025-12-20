import { normalizarCondicion } from './condicionUtils';

const parseIdInt = (value) => (value && value !== "" ? parseInt(value) : null);
const parseFloatVal = (value) => (value && value !== "" ? parseFloat(value) : null);

export const mapFrontendToBackendAdd = (formData) => { 

    return {
        ...formData,
 
        // Fechas
        fechaIngreso: formData.fechaIngreso ? new Date(formData.fechaIngreso) : null,
        fechaResolucion: formData.fechaResolucion ? new Date(formData.fechaResolucion) : null,
        ultimaDepreciacion: formData.ultimaDepreciacion ? new Date(formData.ultimaDepreciacion) : null,

        // Campos numéricos
        cantidadPieza: parseIdInt(formData.cantidadPieza),
        largo: parseFloatVal(formData.largo),
        alto: parseFloatVal(formData.alto),
        ancho: parseFloatVal(formData.ancho),
        costoAdquisicion: parseFloatVal(formData.costoAdquisicion) ?? '',
        valorResidual: parseFloatVal(formData.valorResidual) || 0,
        valor: parseFloatVal(formData.valor),
        
        // Strings cortitos
        isla: formData.isla,
        fila: formData.fila,
        columna: formData.columna,

        // Catalogos
        grupoId: parseIdInt(formData.grupoId),
        claseId: parseIdInt(formData.claseId),
        subclaseId: parseIdInt(formData.subclaseId),
        marcaId: parseIdInt(formData.marcaId),
        modeloId: parseIdInt(formData.modeloId),
        ubicacionId: parseIdInt(formData.ubicacionId),
        unidadMedidaId: parseIdInt(formData.unidadMedidaId), 
        responsableId: parseIdInt(formData.responsableId),
        
    };
};

export const mapFrontendToBackendUpdate = (formData) => {
    const data = mapFrontendToBackendAdd(formData);
    return { id: parseIdInt(formData.id),
             ...data };
};

export const mapBackendToFrontend = (backendDto) => {
    const formatDate = (dateString) => dateString ? dateString.split('T')[0] : '';
    
    return {
        ...backendDto,

        fechaIngreso: formatDate(backendDto.fechaIngreso),
        fechaResolucion: formatDate(backendDto.fechaResolucion),
        ultimaDepreciacion: formatDate(backendDto.ultimaDepreciacion),
        
        condicion: normalizarCondicion(backendDto.condicion),

        grupoId: backendDto.grupoId,
        claseId: backendDto.claseId,
        subclaseId: backendDto.subclaseId,
        marcaId: backendDto.marcaId,
        modeloId: backendDto.modeloId,
        ubicacionId: backendDto.ubicacionId,
        unidadMedidaId: backendDto.unidadMedidaId,
        responsableId: backendDto.responsableId,
    };
};