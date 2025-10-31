import { useState, useEffect } from 'react';
import { Container, Spinner, Alert, Card } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import BienForm from '../../components/MaestroBienes/BienForm'; 
import api from '../../api/axiosConfig'; 

function ModificarBien() {
    const { id } = useParams(); 
    const navigate = useNavigate();

    const [bienData, setBienData] = useState(null); 
    const [catalogos, setCatalogos] = useState({ 
        grupos: [], marcas: [], ubicaciones: [], unidadesMedida: []
    });
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);
    const [errorGuardar, setErrorGuardar] = useState(null);

    useEffect(() => {
        const cargarDatosCompletos = async () => {
            if (!id) {
                setError("No se especificó un ID para modificar.");
                setCargando(false);
                return;
            }
            setCargando(true);
            setError(null);
            setErrorGuardar(null);

            try {
                const [
                    bienRes, gruposRes, marcasRes, ubicacionesRes, unidadesRes
                ] = await Promise.all([
                    api.get(`/bien/${id}`), 
                    api.get('/grupo/dropdown'),
                    api.get('/marca/dropdown'),
                    api.get('/ubicacion/dropdown'),
                    api.get('/unidadMedida/dropdown'), 
                ]);

                const loadedCatalogos = {
                    grupos: gruposRes.data || [],
                    marcas: marcasRes.data || [],
                    ubicaciones: ubicacionesRes.data || [],
                    unidadesMedida: unidadesRes.data || [],
                };
                setCatalogos(loadedCatalogos);

                const mapResponseToFormState = (backendDto, loadedCats) => {
                    const formatDate = (dateString) => dateString ? dateString.split('T')[0] : '';
                    const findIdByName = (catName, nameValue) => {
                        const list = loadedCats[catName];
                        return list?.find(item => item.nombre === nameValue)?.id || '';
                    };

                    return {
                        id: backendDto.id,
                        codigoInventario: backendDto.codigoInventario,
                        nombre: backendDto.nombre,
                        descripcionLarga: backendDto.descripcionLarga,
                        fechaAdquisicion: formatDate(backendDto.fechaIngreso),
                        tipoObjeto: backendDto.tipoObjeto,
                        condicion: backendDto.condicion,
                        numSerie: backendDto.numSerie,
                        color: backendDto.color,
                        cantidadPieza: backendDto.cantidadPieza,
                        largo: backendDto.largo,
                        alto: backendDto.alto,
                        ancho: backendDto.ancho,
                        responsableRut: backendDto.responsableRut,
                        fechaUltimaToma: formatDate(backendDto.fechaUltimaToma),
                        urlFoto: backendDto.urlFoto,
                        
                        idGrupo: findIdByName('grupos', backendDto.grupo),
                        idMarca: findIdByName('marcas', backendDto.marca),
                        idUbicacion: findIdByName('ubicaciones', backendDto.ubicacion),
                        idUnidadMedida: findIdByName('unidadesMedida', backendDto.unidadMedida),

                        idClase: backendDto.clase ? null : '', 
                        idModelo: backendDto.modelo ? null : '', 
                        idSubClase: backendDto.subclase ? null : '', 

                        grupo: backendDto.grupo,
                        clase: backendDto.clase,
                        subClase: backendDto.subclase,
                        marca: backendDto.marca,
                        modelo: backendDto.modelo,
                        ubicacion: backendDto.ubicacion,
                        unidadMedida: backendDto.unidadMedida,
                    };
                };

               
                 const initialFormData = mapResponseToFormState(bienRes.data, loadedCatalogos);
                 setBienData(initialFormData); 


            } catch (error) {
                console.error("Error al cargar datos para modificar:", error.response || error);
                setError( error.response?.status === 404
                        ? `No se encontró el bien con ID ${id}.`
                        : "No se pudieron cargar los datos del bien o los catálogos."
                      );
                setBienData(null); 
            } finally {
                setCargando(false);
            }
        };
        cargarDatosCompletos();
   
    }, [id]);

   
     const mapFrontendToBackend = (formData) => {
        const backendData = {
            id: formData.id, 
            codigoInventario: formData.codigoInventario, 
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
          
            grupo: formData.idGrupo ? { id: parseInt(formData.idGrupo) } : null,
            clase: formData.idClase ? { id: parseInt(formData.idClase) } : null,
            subclase: formData.idSubClase ? { id: parseInt(formData.idSubClase) } : null,
            marca: formData.idMarca ? { id: parseInt(formData.idMarca) } : null,
            modelo: formData.idModelo ? { id: parseInt(formData.idModelo) } : null,
            ubicacion: formData.idUbicacion ? { id: parseInt(formData.idUbicacion) } : null,
            unidadMedida: formData.idUnidadMedida ? { id: parseInt(formData.idUnidadMedida) } : null,
            
        };
        
         Object.keys(backendData).forEach(key => {
            const value = backendData[key];
             if (value === undefined) { 
                delete backendData[key];
            } else if (typeof value === 'object' && value !== null && (value.id === null || value.id === undefined || isNaN(value.id))) {
                 backendData[key] = null;
                
            }
         });
        return backendData;
    };

    const handleGuardarSubmit = async (formData) => {
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
            await api.put(`/bien/update`, datosParaEnviar);
            navigate('/dashboard'); 
        } catch (err) {
            console.error("Error al modificar el bien:", err.response || err);
            let errorMsg = "Error al guardar los cambios. Verifique los datos e intente nuevamente.";
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

    const handleDelete = async () => {
        setErrorGuardar(null); 
        try {
            await api.delete(`/bien/${id}`);
            alert('Bien eliminado con éxito.'); 
            navigate('/dashboard');
        } catch (err) {
            console.error("Error al eliminar el bien:", err.response || err);
            const errorMsg = err.response?.data?.message || err.response?.data || "Error al intentar eliminar el bien.";
            setErrorGuardar(errorMsg); 
        }
    };

    return (
        <Container className="mt-4">
            <Card>
                <Card.Header as="h5">Modificar Bien</Card.Header>
                <Card.Body>
                    {cargando && <div className="text-center"><Spinner animation="border" /> Cargando datos del bien...</div>}
                    {error && <Alert variant="danger">{error}</Alert>}
                    {!cargando && !error && bienData && (
                        <>
                            {errorGuardar && <Alert variant="danger" onClose={() => setErrorGuardar(null)} dismissible>{errorGuardar}</Alert>}
                            <BienForm
                                initialData={bienData} 
                                onSubmit={handleGuardarSubmit}
                                isEditing={true} 
                                catalogos={catalogos}
                                onDelete={handleDelete}
                            />
                        </>
                    )}
                    
                    {!cargando && !error && !bienData && (
                        <Alert variant="warning">No se pudieron cargar los datos para el bien con ID {id}.</Alert>
                    )}
                </Card.Body>
            </Card>
        </Container>
    );
}

export default ModificarBien;