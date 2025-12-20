import { useState, useEffect, useCallback } from "react";
import api from '../api/axiosConfig';

export const useBienForm = (initialData, isEditing) => {
    
    const [formData, setFormData] = useState(initialData);
    
    const [errores, setErrores] = useState({});

    const [dynamicOptions, setDynamicOptions] = useState({
        clases: [],
        subclases: [],
        modelos: []
    });
    
    const [loaders, setLoaders] = useState({
        clases: false,
        subclases: false,
        modelos: false
    });

    const fetchOptions = useCallback(async (endpoint, paramName, paramValue, stateKey) => {
        if (!paramValue) return; 
        
        setLoaders(prev => ({ ...prev, [stateKey]: true }));
        try {
            const res = await api.get(`/${endpoint}?dropdown=true&${paramName}=${paramValue}`);
            setDynamicOptions(prev => ({ ...prev, [stateKey]: res.data || [] }));
        } catch (e) { 
            console.error(`Error cargando ${stateKey}:`, e); 
            
        } finally { 
            setLoaders(prev => ({ ...prev, [stateKey]: false })); 
        }
    }, []);

    const loadDependencies = useCallback(async (data) => {
        await Promise.all([
            data.grupoId ? fetchOptions('clase', 'grupoId', data.grupoId, 'clases') : Promise.resolve(),
            data.claseId ? fetchOptions('subclase', 'claseId', data.claseId, 'subclases') : Promise.resolve(),
            data.marcaId ? fetchOptions('modelo', 'marcaId', data.marcaId, 'modelos') : Promise.resolve()
        ]);
    }, [fetchOptions]);

    useEffect(() => {
        setFormData(initialData);
        if (isEditing && initialData) {
            loadDependencies(initialData);
        }
    }, [initialData, isEditing, loadDependencies]);



    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        const newValue = type === 'checkbox' ? checked : value;
        
        setFormData(prev => ({ ...prev, [name]: newValue }));

        if (errores[name]) {
            setErrores(prev => ({ ...prev, [name]: null }));
        }
    };

    const handleCatalogoChange = (e) => {
        const { name, value } = e.target;
        
        let updates = { [name]: value };

        if (name === 'grupoId') {
            updates = { ...updates, claseId: '', subclaseId: '' };
            setDynamicOptions(prev => ({ ...prev, clases: [], subclases: [] }));
            if (value) fetchOptions('clase', 'grupoId', value, 'clases');
        } 
        else if (name === 'claseId') {
            updates = { ...updates, subclaseId: '' };
            setDynamicOptions(prev => ({ ...prev, subclases: [] }));
            if (value) fetchOptions('subclase', 'claseId', value, 'subclases');
        }
        else if (name === 'marcaId') {
            updates = { ...updates, modeloId: '' };
            setDynamicOptions(prev => ({ ...prev, modelos: [] }));
            if (value) fetchOptions('modelo', 'marcaId', value, 'modelos');
        }

        setFormData(prev => ({ ...prev, ...updates }));
        
        if (errores[name]) {
            setErrores(prev => ({ ...prev, [name]: null }));
        }
    };

    const setFormErrors = (newErrors) => setErrores(newErrors);

    return { 
        formData, 
        errores,
        setFormErrors,     
        handleInputChange, 
        handleCatalogoChange, 
        dynamicOptions, 
        loaders 
    };
};