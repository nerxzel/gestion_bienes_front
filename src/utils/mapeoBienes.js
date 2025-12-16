import { normalizarCondicion } from './condicionUtils';

const parseIdInt = (value) => (value && value !== "" ? parseInt(value) : null);
const parseFloatVal = (value) => (value && value !== "" ? parseFloat(value) : null);

export const mapFrontendToBackendAdd = (formData) => { 

    return {
        // Campos de texto
        nombre: formData.nombre,
        descripcionLarga: formData.descripcionLarga,
        tipoObjeto: formData.tipoObjeto,
        condicion: formData.condicion,
        estado: formData.estado,
        numSerie: formData.numSerie,
        color: formData.color,

        // Fechas
        fechaIngreso: formData.fechaIngreso ? new Date(formData.fechaIngreso) : null,
        fechaResolucion: formData.fechaResolucion ? new Date(formData.fechaResolucion) : null,
        ultimaDepreciacion: formData.ultimaDepreciacion ? new Date(formData.ultimaDepreciacion) : null,

        // Campos numéricos
        cantidadPieza: parseIdInt(formData.cantidadPieza),
        largo: parseFloatVal(formData.largo),
        alto: parseFloatVal(formData.alto),
        ancho: parseFloatVal(formData.ancho),
        costoAdquisicion: parseFloatVal(formData.costoAdquisicion),
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
        id: backendDto.id,
        codigoInventario: backendDto.codigoInventario,
        nombre: backendDto.nombre,
        descripcionLarga: backendDto.descripcionLarga,
        tipoObjeto: backendDto.tipoObjeto,
        condicion: normalizarCondicion(backendDto.condicion),
        estado: backendDto.estado,
        numSerie: backendDto.numSerie,
        color: backendDto.color,

        fechaIngreso: formatDate(backendDto.fechaIngreso),
        fechaResolucion: formatDate(backendDto.fechaResolucion),
        ultimaDepreciacion: formatDate(backendDto.ultimaDepreciacion),
        
        
        cantidadPieza: backendDto.cantidadPieza,
        largo: backendDto.largo,
        alto: backendDto.alto,
        ancho: backendDto.ancho,
        nroResolucion: backendDto.nroResolucion,
        costoAdquisicion: backendDto.costoAdquisicion,
        valorResidual: backendDto.valorResidual,
        valor: backendDto.valor,
       
        isla: backendDto.isla,
        fila: backendDto.fila,
        columna: backendDto.columna,

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