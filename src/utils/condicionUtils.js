export const CONDICION = {
    ALTA: 'Alta',
    BAJA: 'Baja'
};

export const normalizarCondicion = (condicion) => {
    if (!condicion) return CONDICION.ALTA;
    
    const condicionLower = condicion.toLowerCase();
    
    if (condicionLower === 'alta') {
        return CONDICION.ALTA;
    } else if (condicionLower === 'baja') {
        return CONDICION.BAJA;
    }

    return condicion;
};

export const esCondicion = (condicion, valorEsperado) => {
    if (!condicion || !valorEsperado) return false;
    return condicion.toLowerCase() === valorEsperado.toLowerCase();
};

export const esAlta = (condicion) => {
    return esCondicion(condicion, CONDICION.ALTA);
};

export const esBaja = (condicion) => {
    return esCondicion(condicion, CONDICION.BAJA);
};