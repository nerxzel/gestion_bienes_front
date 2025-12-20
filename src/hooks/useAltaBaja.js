import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api/axiosConfig.js';
import { obtenerMensajeError } from '../utils/errorHandler.js';
import { normalizarCondicion } from '../utils/condicionUtils.js';

export const useAltaBaja = (endpointAccion) => {
    const { id } = useParams();

    const [bienData, setBienData] = useState(null);

    const [error, setError] = useState(null);
    const [exitoso, setExitoso] = useState(false);

    const [status, setStatus] = useState({
        cargando: true, 
        procesando: false 
    });

    const cargarBien = useCallback(async () => {
        if (!id) return;
        
        setStatus(prev => ({ ...prev, cargando: true }));
        setError(null);
        
        try {
            const { data } = await api.get(`/bien/${id}`);
            setBienData({ 
                ...data, 
                condicion: normalizarCondicion(data.condicion) 
            });
        } catch (err) {
            setError(obtenerMensajeError(err, `Error al cargar el bien ${id}`));
        } finally {
            setStatus(prev => ({ ...prev, cargando: false }));
        }
    }, [id]);

    useEffect(() => {
        cargarBien();
    }, [cargarBien]);

    const handleConfirmarAccion = async () => {
        setStatus(prev => ({ ...prev, procesando: true }));
        setError(null);

        try {
            await api.put(`${endpointAccion}/${id}`);
            const { data } = await api.get(`/bien/${id}`);            
            setBienData({ 
                ...data, 
                condicion: normalizarCondicion(data.condicion) 
            });
            setExitoso(true);

        } catch (err) {
            setError(obtenerMensajeError(err, "Error al procesar la solicitud"));
        } finally {
            setStatus(prev => ({ ...prev, procesando: false }));
        }
    };

    const handleLimpiarError = () => setError(null);
    const handleLimpiarExito = () => setExitoso(false);

    return {
        id,
        bienData,
        error,
        exitoso,
        status,
        handleConfirmarAccion,
        handleLimpiarError,
        handleLimpiarExito
    };
};