import { createContext, useState, useEffect, useCallback } from 'react';
import api from '../api/axiosConfig';
import { manejarErrorAPI } from '../utils/errorHandler';
import { normalizarCondicion } from '../utils/condicionUtils';


const BienesContext = createContext(null);

export function BienesProvider({ children }) {

    const [bienes, setBienes] = useState([]);
    const [estaCargando, setEstaCargando] = useState(true);
    const [error, setError] = useState(null);

    const cargarBienes = useCallback(async () => {
        setEstaCargando(true);
        setError(null);
        try {
            const respuesta = await api.get('/bien/grid');
            const bienesNormalizados = (respuesta.data || []).map(bien => ({ ...bien, condicion: normalizarCondicion(bien.condicion) }));
            bienesNormalizados.sort((a, b) => (a.codigoInventario || '').localeCompare(b.codigoInventario || ''));
            setBienes(bienesNormalizados);
        } catch (err) {
            const mensajeError = manejarErrorAPI(err);
            setError(mensajeError);
            setBienes([]);
        } finally {
            setTimeout(() => { setEstaCargando(false) }, 2000);
        }
    }, []);

    useEffect(() => {
        cargarBienes();
    }, [cargarBienes]);

    const value = {
        bienes,
        estaCargando,
        error,
        cargarBienes
    };

    return (
        <BienesContext.Provider value={value}>
            {children}
        </BienesContext.Provider>
    );
}

export default BienesContext;