export const obtenerMensajeError = (error, mensajePorDefecto = "Ocurrió un error inesperado") => {
    
    if (!error) return mensajePorDefecto;
    
    if (!error.response) {
        return "Error de conexión. Verifica tu conexión a internet.";
    }
    
    const { status, data } = error.response;
    
    switch (status) {
        case 400:
            return data?.message || "Datos inválidos. Verifica la información ingresada.";
        case 401:
            return "No autorizado. Por favor inicia sesión nuevamente.";
        case 403:
            return data?.message || "No tienes permisos para realizar esta acción.";
        case 404:
            return data?.message || "Recurso no encontrado.";
        case 422:
            return data?.message || "Error de validación. Verifica los datos.";
        case 500:
            return "Error del servidor. Intenta nuevamente más tarde.";
        default:
            return data?.message || data?.error || data || mensajePorDefecto;
    }
};

export const manejarErrorAPI = (error) => {
    console.error("Error API:", error);
    return obtenerMensajeError(error);
};