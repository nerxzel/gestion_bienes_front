import { useContext } from 'react';
import BienesContext from '../context/BienContext.jsx'


export const useBienes = () => {
    const context = useContext(BienesContext);
    if (!context) {
        throw new Error('useBienes debe ser usado dentro de un BienesProvider');
    }
    return context;
};