export const mapFrontendToBackendAdd = (formData, catalogos) => { 

    const grupo = catalogos?.grupos?.find(g => g.id === parseInt(formData.idGrupo));
    const marca = catalogos?.marcas?.find(m => m.id === parseInt(formData.idMarca));
    const ubicacion = catalogos?.ubicaciones?.find(u => u.id === parseInt(formData.idUbicacion));
    const unidadMedida = catalogos?.unidadesMedida?.find(um => um.id === parseInt(formData.idUnidadMedida));
    
    const backendData = {
        nombre: formData.nombre,
        descripcionLarga: formData.descripcionLarga,
        fechaIngreso: formData.fechaAdquisicion,
        tipoObjeto: formData.tipoObjeto,
        condicion: formData.condicion,
        numSerie: formData.numSerie,
        color: formData.color,
        cantidadPieza: formData.cantidadPieza ? parseInt(formData.cantidadPieza) : null,
        largo: formData.largo ? parseFloat(formData.largo) : null,
        alto: formData.alto ? parseFloat(formData.alto) : null,
        ancho: formData.ancho ? parseFloat(formData.ancho) : null,
        responsableRut: formData.responsableRut ? parseInt(formData.responsableRut) : null,
        urlFoto: formData.urlFoto,
        
        grupo: formData.idGrupo ? { 
            id: parseInt(formData.idGrupo),
            nombre: grupo?.nombre || null 
        } : null,
        
        clase: formData.idClase ? { id: parseInt(formData.idClase) } : null,
        subclase: formData.idSubClase ? { id: parseInt(formData.idSubClase) } : null,
        
        marca: formData.idMarca ? { 
            id: parseInt(formData.idMarca),
            nombre: marca?.nombre || null 
        } : null,
        
        modelo: formData.idModelo ? { id: parseInt(formData.idModelo) } : null,
        
        ubicacion: formData.idUbicacion ? { 
            id: parseInt(formData.idUbicacion),
            nombre: ubicacion?.nombre || null 
        } : null,
        
        unidadMedida: formData.idUnidadMedida ? { 
            id: parseInt(formData.idUnidadMedida),
            nombre: unidadMedida?.nombre || null 
        } : null,
    };
    
    Object.keys(backendData).forEach(key => {
        const value = backendData[key];
        if (value === null || value === undefined || value === '') {
            delete backendData[key];
        } else if (typeof value === 'object' && value !== null && 
                (value.id === null || value.id === undefined || isNaN(value.id))) {
            delete backendData[key];
        }
    });
    
    return backendData;
};

export const mapFrontendToBackendUpdate = (formData) => {
    const backendData = {
        id: formData.id,
        codigoInventario: formData.codigoInventario,
        nombre: formData.nombre,
        descripcionLarga: formData.descripcionLarga,
        fechaIngreso: formData.fechaAdquisicion,
        tipoObjeto: formData.tipoObjeto,
        condicion: formData.condicion,
        numSerie: formData.numSerie,
        color: formData.color,
        cantidadPieza: formData.cantidadPieza ? parseInt(formData.cantidadPieza) : null,
        largo: formData.largo ? parseFloat(formData.largo) : null,
        alto: formData.alto ? parseFloat(formData.alto) : null,
        ancho: formData.ancho ? parseFloat(formData.ancho) : null,
        responsableRut: formData.responsableRut ? parseInt(formData.responsableRut) : null,
        urlFoto: formData.urlFoto,
        
        grupo: formData.idGrupo ? { id: parseInt(formData.idGrupo) } : null,
        clase: formData.idClase ? { id: parseInt(formData.idClase) } : null,
        subclase: formData.idSubClase ? { id: parseInt(formData.idSubClase) } : null,
        marca: formData.idMarca ? { id: parseInt(formData.idMarca) } : null,
        modelo: formData.idModelo ? { id: parseInt(formData.idModelo) } : null,
        ubicacion: formData.idUbicacion ? { id: parseInt(formData.idUbicacion) } : null,
        unidadMedida: formData.idUnidadMedida ? { id: parseInt(formData.idUnidadMedida) } : null,
    };
    
    Object.keys(backendData).forEach(key => {
        const value = backendData[key];
        if (value === undefined) {
            delete backendData[key];
        } else if (typeof value === 'object' && value !== null && 
                (value.id === null || value.id === undefined || isNaN(value.id))) {
            backendData[key] = null;
        }
    });
    
    return backendData;
};

export const mapBackendToFrontend = (backendDto, catalogos) => {
    const formatDate = (dateString) => dateString ? dateString.split('T')[0] : '';
    
    const findIdByName = (catName, nameValue) => {
        const list = catalogos[catName];
        return list?.find(item => item.nombre === nameValue)?.id || '';
    };

    return {
        id: backendDto.id,
        codigoInventario: backendDto.codigoInventario,
        nombre: backendDto.nombre,
        descripcionLarga: backendDto.descripcionLarga,
        fechaAdquisicion: formatDate(backendDto.fechaIngreso),
        tipoObjeto: backendDto.tipoObjeto,
        condicion: backendDto.condicion,
        numSerie: backendDto.numSerie,
        color: backendDto.color,
        cantidadPieza: backendDto.cantidadPieza,
        largo: backendDto.largo,
        alto: backendDto.alto,
        ancho: backendDto.ancho,
        responsableRut: backendDto.responsableRut,
        fechaUltimaToma: formatDate(backendDto.fechaUltimaToma),
        urlFoto: backendDto.urlFoto,
        
        idGrupo: findIdByName('grupos', backendDto.grupo),
        idMarca: findIdByName('marcas', backendDto.marca),
        idUbicacion: findIdByName('ubicaciones', backendDto.ubicacion),
        idUnidadMedida: findIdByName('unidadesMedida', backendDto.unidadMedida),

        idClase: backendDto.clase ? null : '',
        idModelo: backendDto.modelo ? null : '',
        idSubClase: backendDto.subclase ? null : '',

        grupo: backendDto.grupo,
        clase: backendDto.clase,
        subClase: backendDto.subclase,
        marca: backendDto.marca,
        modelo: backendDto.modelo,
        ubicacion: backendDto.ubicacion,
        unidadMedida: backendDto.unidadMedida,
    };
};