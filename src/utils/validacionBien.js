export const validarBien = (formData) => {
    const errores = [];
    
    const camposRequeridos = {
        nombre: 'Descripción Corta',
        descripcionLarga: 'Descripción Larga',
        fechaIngreso: 'Fecha Ingreso',
        tipoObjeto: 'Tipo Objeto',
        idResponsable: 'Responsable',
        color: 'Color',
        cantidadPieza: 'Cantidad Piezas',
        largo: 'Largo',
        alto: 'Alto',
        ancho: 'Ancho',
        condicion: 'Condición',
        idGrupo: 'Grupo',
        idClase: 'Clase',
        idSubClase: 'Subclase',
        idMarca: 'Marca',
        idModelo: 'Modelo',
        idUbicacion: 'Ubicación',
        idUnidadMedida: 'Unidad de Medida'
    };
    
    Object.entries(camposRequeridos).forEach(([campo, nombre]) => {
        if (!formData[campo]) {
            errores.push(nombre);
        }
    });
    
    const camposNumericos = ['cantidadPieza', 'largo', 'alto', 'ancho'];
    camposNumericos.forEach(campo => {
        const valor = formData[campo];
        if (valor !== undefined && valor !== null && valor !== '') {
            const valorNumerico = parseFloat(valor);
            if (isNaN(valorNumerico) || valorNumerico < 0) {
                if (!errores.includes(`${campo}`)) {
                    errores.push(`${campo}`);
                }
            }
        }
    });
    
    return {
        esValido: errores.length === 0,
        errores,
        mensajeError: errores.length > 0 
            ? `Por favor, corrija los siguientes campos: ${errores.join('; ')}.`
            : null
    };
};