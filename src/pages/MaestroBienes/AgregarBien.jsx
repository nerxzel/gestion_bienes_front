import { useState, useEffect } from 'react';
import { Container, Spinner, Alert, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import BienForm from '../../components/MaestroBienes/BienForm'; 
import api from '../../api/axiosConfig'; 

function AgregarBien() {
    const [catalogos, setCatalogos] = useState({
        grupos: [], marcas: [], ubicaciones: [], unidadesMedida: []
    });
    const [cargandoCatalogos, setCargandoCatalogos] = useState(true);
    const [errorCatalogos, setErrorCatalogos] = useState(null);
    const [errorGuardar, setErrorGuardar] = useState(null);
    const navigate = useNavigate();

    const FORMULARIO_BIEN_VACIO = {
        nombre: '', 
        grupo: '', clase: '', subClase: '', marca: '', modelo: '',
        fechaAdquisicion: new Date().toISOString().split('T')[0], 
        condicion: 'Alta', idGrupo: '', idClase: '', idSubClase: '', idMarca: '', idModelo: '',
        descripcionLarga: '', tipoObjeto: '', numSerie: '', color: '', cantidadPieza: '',
        largo: '', alto: '', ancho: '', idUbicacion: '', idUnidadMedida: '',
        urlFoto: '', responsableRut: '',
    };

    useEffect(() => {
        const cargarCatalogosNecesarios = async () => {
            setCargandoCatalogos(true);
            setErrorCatalogos(null);
            try {
                const [
                    gruposRes, marcasRes, ubicacionesRes, unidadesMedidaRes
                ] = await Promise.all([
                    api.get('/grupo/dropdown'),
                    api.get('/marca/dropdown'),
                    api.get('/ubicacion/dropdown'),
                    api.get('/unidadMedida/dropdown') 
                ]);

                const loadedCatalogos = {
                    grupos: gruposRes.data || [],
                    marcas: marcasRes.data || [],
                    ubicaciones: ubicacionesRes.data || [],
                    unidadesMedida: unidadesMedidaRes.data || []
                };
                setCatalogos(loadedCatalogos);

            } catch (error) {
                console.error("Error al cargar catálogos desde la API:", error);
                setErrorCatalogos(`Error al cargar datos necesarios: ${error.message}. Intente recargar la página.`);
                setCatalogos({ grupos: [], marcas: [], ubicaciones: [], unidadesMedida: [] });
            } finally {
                setCargandoCatalogos(false);
            }
        };
        cargarCatalogosNecesarios();
    }, []);

    const mapFrontendToBackend = (formData) => {

        const selectedGroup = catalogos.grupos.find(g => g.id === parseInt(formData.idGrupo));

        const backendData = {
            nombre: formData.nombre,
            descripcionLarga: formData.descripcionLarga,
            fechaIngreso: formData.fechaAdquisicion, 
            tipoObjeto: formData.tipoObjeto,
            condicion: formData.condicion,
            numSerie: formData.numSerie,
            color: formData.color,
            cantidadPieza: formData.cantidadPieza ? parseInt(formData.cantidadPieza) : null,
            largo: formData.largo ? parseFloat(formData.largo) : null,
            alto: formData.alto ? parseFloat(formData.alto) : null,
            ancho: formData.ancho ? parseFloat(formData.ancho) : null,
            responsableRut: formData.responsableRut ? parseInt(formData.responsableRut) : null,
            urlFoto: formData.urlFoto,
            
            grupo: formData.idGrupo ? { 
                id: parseInt(formData.idGrupo), nombre: selectedGroup?.nombre } : null,
            clase: formData.idClase ? { id: parseInt(formData.idClase) } : null,
            subclase: formData.idSubClase ? { id: parseInt(formData.idSubClase) } : null,
            marca: formData.idMarca ? { id: parseInt(formData.idMarca) } : null,
            modelo: formData.idModelo ? { id: parseInt(formData.idModelo) } : null,
            ubicacion: formData.idUbicacion ? { id: parseInt(formData.idUbicacion) } : null,
            unidadMedida: formData.idUnidadMedida ? { id: parseInt(formData.idUnidadMedida) } : null,
        };

        Object.keys(backendData).forEach(key => {
            const value = backendData[key];
            if (value === null || value === undefined || value === '') {
                delete backendData[key];
            } else if (typeof value === 'object' && value !== null && (value.id === null || value.id === undefined || isNaN(value.id))) {
                delete backendData[key];
            }
        });
        return backendData;
    };


    const handleAgregarSubmit = async (formData) => {
        const errores = [];
        if (!formData.nombre) errores.push('Descripción Corta');
        if (!formData.descripcionLarga) errores.push('Descripción Larga');
        if (!formData.fechaAdquisicion) errores.push('Fecha Ingreso');
        if (!formData.tipoObjeto) errores.push('Tipo Objeto');
        if (!formData.responsableRut) errores.push('Rut Responsable');
        if (!formData.numSerie) errores.push('Numero de Serie');
        if (!formData.color) errores.push('Color');
        if (!formData.cantidadPieza) errores.push('Cantidad Piezas');
        if (!formData.largo) errores.push('Largo');
        if (!formData.alto) errores.push('Alto');
        if (!formData.ancho) errores.push('Ancho');
        if (!formData.condicion) errores.push('Condicion');
    
        if (!formData.idGrupo) errores.push('Grupo');
        if (!formData.idClase) errores.push('Clase');
        if (!formData.idSubClase) errores.push('Subclase');
        if (!formData.idMarca) errores.push('Marca');
        if (!formData.idModelo) errores.push('Modelo');
        if (!formData.idUbicacion) errores.push('Ubicacion');
        if (!formData.idUnidadMedida) errores.push('Unidad de Medida');

        const camposNumericos = ['cantidadPieza', 'largo', 'alto', 'ancho', 'responsableRut'];
            camposNumericos.forEach(campo => {
    
    if (formData[campo] !== undefined && formData[campo] !== null && formData[campo] !== '') {
        const valorNumerico = parseFloat(formData[campo]);
        if (isNaN(valorNumerico) || valorNumerico <= 0) {

            if (!errores.includes(`${campo} debe ser un número mayor que cero`)) {
                errores.push(`${campo} debe ser un número mayor que cero`);
            }
        }
    }
});

        if (errores.length > 0) {
            setErrorGuardar(`Por favor, corrija los siguientes errores: ${errores.join('; ')}.`);
        return;
        }

        const datosParaEnviar = mapFrontendToBackend(formData);
        setErrorGuardar(null);
        try {
            await api.post('/bien/add', datosParaEnviar);
            navigate('/dashboard');
        } catch (err) {
            console.error("Error al agregar el bien:", err.response || err);
            let errorMsg = "Error al guardar. Verifique los datos e intente nuevamente.";
            if (err.response?.data?.message) {
                errorMsg = err.response.data.message;
            } else if (typeof err.response?.data === 'string') {
                errorMsg = err.response.data;
            } else if (err.response?.data?.error) {
                errorMsg = `${err.response.data.error} (Status: ${err.response.data.status})`;
            } else if (err.message) {
                errorMsg = err.message;
            }
            setErrorGuardar(errorMsg);
        }
    };

    return (
        <Container className="mt-4">
            <Card>
                <Card.Header as="h5">Agregar Nuevo Bien</Card.Header>
                <Card.Body>
                    {cargandoCatalogos && <div className="text-center"><Spinner animation="border" /> Cargando datos necesarios...</div>}
                    {errorCatalogos && <Alert variant="danger">{errorCatalogos}</Alert>}
                    {!cargandoCatalogos && !errorCatalogos && (
                        <>
                            {errorGuardar && <Alert variant="danger" onClose={() => setErrorGuardar(null)} dismissible>{errorGuardar}</Alert>}
                            <BienForm
                                initialData={FORMULARIO_BIEN_VACIO}
                                onSubmit={handleAgregarSubmit}
                                isEditing={false}
                                catalogos={catalogos}
                            />
                        </>
                    )}
                </Card.Body>
            </Card>
        </Container>
    );
}

export default AgregarBien;