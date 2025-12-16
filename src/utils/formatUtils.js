export const formatCLP = (value) => {
    const numberToFormat = value ?? 0;

    const formatter = new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
    minimumFractionDigits: 0,
    });

    return formatter.format(numberToFormat).replace('CLP$', '$ ');
};

export const formatDate = (dateString) => {
    if (!dateString) return "-";
    
    const date = new Date(dateString);
    
    return date.toLocaleDateString('es-CL', {
        day: '2-digit', 
        month: '2-digit', 
        year: 'numeric',
        timeZone: 'UTC' 
    });
};