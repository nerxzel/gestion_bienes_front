export const validarBien = (formData) => {
    const errores = [];
    
    const camposRequeridos = {
        nombre: 'Descripción Corta',
        descripcionLarga: 'Descripción Larga',
        fechaAdquisicion: 'Fecha Ingreso',
        tipoObjeto: 'Tipo Objeto',
        responsableRut: 'Rut Responsable',
        numSerie: 'Número de Serie',
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
    
    // Validar campos numéricos
    const camposNumericos = ['cantidadPieza', 'largo', 'alto', 'ancho', 'responsableRut'];
    camposNumericos.forEach(campo => {
        const valor = formData[campo];
        if (valor !== undefined && valor !== null && valor !== '') {
            const valorNumerico = parseFloat(valor);
            if (isNaN(valorNumerico) || valorNumerico <= 0) {
                if (!errores.includes(`${campo} debe ser un número mayor que cero`)) {
                    errores.push(`${campo} debe ser un número mayor que cero`);
                }
            }
        }
    });
    
    return {
        esValido: errores.length === 0,
        errores,
        mensajeError: errores.length > 0 
            ? `Por favor, corrija los siguientes errores: ${errores.join('; ')}.`
            : null
    };
};