import { useState, useEffect } from 'react';
import { Container, Spinner, Alert, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { validarBien } from '../../../utils/validacionBien';
import { obtenerMensajeError } from '../../../utils/errorHandler';
import { mapFrontendToBackendAdd } from '../../../utils/mapeoBienes';
import BienForm from '../components/BienForm';
import api from '../../../api/axiosConfig';

const FORMULARIO_BIEN_VACIO = {
    nombre: '', grupo: '', clase: '', subClase: '', marca: '', modelo: '',
    fechaAdquisicion: new Date().toISOString().split('T')[0], condicion: 'Alta',
    idGrupo: '', idClase: '', idSubClase: '', idMarca: '', idModelo: '',
    descripcionLarga: '', tipoObjeto: '', numSerie: '', color: '', cantidadPieza: '',
    largo: '', alto: '', ancho: '', idUbicacion: '', idUnidadMedida: '',
    urlFoto: '', responsableRut: '', idResponsable: '', costoAdquisicion: '', valorResidual: '',
    valor: '', isla: '', fila: '', columna: ''
};

function AgregarBien() {
    const [catalogos, setCatalogos] = useState({
        grupos: [], marcas: [], ubicaciones: [], unidadesMedida: [], responsables: []
    });
    const [cargandoCatalogos, setCargandoCatalogos] = useState(true);
    const [errorCatalogos, setErrorCatalogos] = useState(null);
    const [errorGuardar, setErrorGuardar] = useState(null);
    const [cargando, setCargando] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const cargarCatalogosNecesarios = async () => {
            setCargandoCatalogos(true);
            setErrorCatalogos(null);
            try {
                const [
                    gruposRes, marcasRes, ubicacionesRes, unidadesMedidaRes, responsableRes
                ] = await Promise.all([
                    api.get('/grupo/dropdown'),
                    api.get('/marca/dropdown'),
                    api.get('/ubicacion/dropdown'),
                    api.get('/unidadMedida/dropdown'),
                    api.get('/responsable/all')
                ]);

                const loadedCatalogos = {
                    grupos: gruposRes.data || [],
                    marcas: marcasRes.data || [],
                    ubicaciones: ubicacionesRes.data || [],
                    unidadesMedida: unidadesMedidaRes.data || [],
                    responsables: responsableRes.data || [],
                };
                setCatalogos(loadedCatalogos);

            } catch (error) {
                const mensajeError = obtenerMensajeError(error, "Error al cargar catálogos");
                setErrorCatalogos(mensajeError);
                setCatalogos({ grupos: [], marcas: [], ubicaciones: [], unidadesMedida: [], responsables: [] });
            } finally {
                setCargandoCatalogos(false);
            }
        };
        cargarCatalogosNecesarios();
    }, []);

    const handleAgregarSubmit = async (formData) => {
        const { esValido, mensajeError } = validarBien(formData);

        if (!esValido) {
            setErrorGuardar(mensajeError);
            return;
        }

        const datosParaEnviar = mapFrontendToBackendAdd(formData, catalogos);
        setErrorGuardar(null);
        setCargando(true);
        try {
            await api.post('/bien/add', datosParaEnviar);
            navigate('/dashboard');
        } catch (err) {
            const mensajeError = obtenerMensajeError(err, "Error al agregar el bien");
            setErrorGuardar(mensajeError);
        } finally {
            setCargando(false);
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
                            {cargando ? (
                                <div className="text-center"><Spinner animation="border" /> Guardando...</div>
                            ) : (
                                <BienForm
                                    initialData={FORMULARIO_BIEN_VACIO}
                                    onSubmit={handleAgregarSubmit}
                                    isEditing={false}
                                    catalogos={catalogos}
                                    isSubmitting={cargando}
                                />
                            )}
                        </>
                    )}
                </Card.Body>
            </Card>
        </Container>
    );
}

export default AgregarBien;