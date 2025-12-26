export const formatCLP = (value) => {
    const numberToFormat = value ?? 0;

    const formatter = new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
    minimumFractionDigits: 0,
    });

    return formatter.format(numberToFormat).replace('CLP$', '$ ');
};

export const formatDate = (dateString) => dateString ? dateString.split('T')[0] : '';

