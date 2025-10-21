import { Form, Container, Button } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { FaPencilAlt, FaPlus } from 'react-icons/fa';
import api from '../../api/axiosConfig';
import FilaEdicion from './FilaEdicion';

function FormularioPrueba() {
    const [bienes, setBienes] = useState([]);
    const [barraBusqueda, setBarraBusqueda] = useState('');
    const [filaEditada, setFilaEditada] = useState(null);
    const [estaAgregando, setEstaAgregando] = useState(false);

    const [error, setError] = useState(null);
    const [estaCargando, setEstaCargando] = useState(true);

    const [grupos, setGrupos] = useState([]);

    const cargarBienes = async () => {
        try {
            const respuesta = await api.get('/bien/grid');
            console.log('Datos recibidos:', respuesta.data);
            setBienes(respuesta.data || []);
        } catch (err) {
            console.error('Error detallado al cargar bienes:', err);
            setError("Error al cargar la lista de bienes.");
            setBienes([]);
        }
    };

    const cargarCatalogosIniciales = async () => {
        try {
            const gruposRes = await api.get('/grupo/dropdown');
            setGrupos(gruposRes.data || []);
        } catch (error) {
            console.error("Error al cargar los catálogos iniciales:", error);
            setError("Error al cargar los datos de grupos.");
            setGrupos([]);
        }
    };

    useEffect(() => {
        const loadData = async () => {
            setEstaCargando(true);
            setError(null);
            try {
                await Promise.all([
                    cargarBienes(),
                    cargarCatalogosIniciales()
                ]);
            } catch (error) {
                 console.error("Error durante la carga inicial:", error);
                 setError("Ocurrió un error al cargar los datos iniciales.");
            } finally {
                setEstaCargando(false);
            }
        };
        loadData();
    }, []);

    const bienesFiltrados = bienes.filter((bien) =>
        (bien.nombre || '').toLowerCase().includes(barraBusqueda.toLowerCase()) ||
        (bien.codigoInventario || '').toLowerCase().includes(barraBusqueda.toLowerCase())
    );

    const mapFrontendToBackend = (frontendData) => {
        const backendData = {
            codigoInventario: frontendData.codigoInventario,
            descripcionCorta: frontendData.nombre,
            fechaIngreso: frontendData.fechaAdquisicion,
            condicion: frontendData.condicion,
        };
        if (frontendData.idGrupo) {
            backendData.grupo = { id: parseInt(frontendData.idGrupo, 10) };
        }
        if (frontendData.idClase) {
            backendData.clase = { id: parseInt(frontendData.idClase, 10) };
        }
        if (frontendData.idSubClase) {
            backendData.subclase = { id: parseInt(frontendData.idSubClase, 10) };
        }
        return backendData;
    };

    const handleGuardar = async (datosActualizados) => {
    const datosParaEnviar = mapFrontendToBackend(datosActualizados);


    console.log("Datos que se intentan enviar (datosActualizados):", datosActualizados);
    console.log("Endpoint que intenta armar:", `/bienes/${datosActualizados.id}`);

    try {
       
        await api.put(`/bienes/${datosActualizados.codigoInventario}`, datosParaEnviar);
        
        console.log("¡Modificación exitosa!"); 

        setBienes(bienes.map((bien) =>
            bien.codigoInventario === datosActualizados.codigoInventario
                ? datosActualizados
                : bien
        ));

        setFilaEditada(null);

    } catch (err) {
  
        console.error("Fallo en la llamada a la api:", err.message);
        console.error("Objeto de error de Axios:", err);
        setError("Error al modificar");
    }
};

    const handleAgregar = async (datosNuevos) => {
        if (!datosNuevos.codigoInventario || bienes.some(b => b.codigoInventario === datosNuevos.codigoInventario)) {
            alert('El código de inventario es obligatorio y no debe repetirse.');
            return;
        }
        const datosEnviar = mapFrontendToBackend(datosNuevos);
        try {
            const response = await api.post('/bienes/add', datosEnviar);
            const bienGuardado = response.data; 

            const bienParaGrid = {
                ...datosNuevos, 
                id: bienGuardado.id, 
            };
            

            setBienes([...bienes, bienParaGrid]); 
            setEstaAgregando(false);
        } catch (err) {
            console.error("Error al agregar el bien:", err);
            setError("Error al guardar el nuevo bien.");
        }
    };

    const FORMULARIO_BIEN_VACIO = {
        codigoInventario: '', nombre: '', grupo: '', clase: '', subClase: '',
        fechaAdquisicion: new Date().toISOString().split('T')[0],
        condicion: 'Alta', idGrupo: '', idClase: '', idSubClase: '',
    };

    return (
        <Container className="mt-4">
            <Button variant="success" className="mb-3 me-2" onClick={() => { setEstaAgregando(true); setFilaEditada(null); }}>
                <FaPlus className="me-1" /> Agregar Bien
            </Button>
            <Form.Control
                className="mb-3"
                placeholder="Buscar por Código o Nombre..."
                value={barraBusqueda}
                onChange={(e) => setBarraBusqueda(e.target.value)}
            />

            {estaCargando && <div className="text-center">Cargando datos...</div>}
            {error && <div className="alert alert-danger">Error: {error}</div>}

            {!estaCargando && !error && (
                <>
                    {estaAgregando && (
                        <table className="table table-sm table-bordered mb-3 bg-light">
                            <thead>
                                <tr><th colSpan="8">Agregar Nuevo Bien</th></tr>
                            </thead>
                            <tbody>
                                <FilaEdicion
                                    datosIniciales={FORMULARIO_BIEN_VACIO}
                                    onGuardar={handleAgregar}
                                    onCancelar={() => setEstaAgregando(false)}
                                    grupos={grupos}
                                />
                            </tbody>
                        </table>
                    )}

                    <table className="table table-striped table-bordered table-hover table-sm">
                        <thead>
                            <tr>
                                <th>Código Inv</th>
                                <th>Descripción Corta</th>
                                <th>Grupo</th>
                                <th>Clase</th>
                                <th>Sub Clase</th>
                                <th>Fecha Ingreso</th>
                                <th>Condición</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {bienesFiltrados.length > 0 ? (
                                bienesFiltrados.map((bien) => (
                                    filaEditada === bien.codigoInventario
                                        ? (
                                            <FilaEdicion
                                                key={bien.codigoInventario}
                                                datosIniciales={bien}
                                                onGuardar={handleGuardar}
                                                onCancelar={() => setFilaEditada(null)}
                                                grupos={grupos}
                                            />
                                        )
                                        : (
                                            <tr key={bien.codigoInventario}>
                                              {console.log('Datos del BIEN en el GRID:', bien)}
                                                <td>{bien.codigoInventario}</td>
                                                <td>{bien.descripcionCorta}</td>
                                                <td>{bien.grupo?.nombreGrupo}</td>
                                                <td>{bien.clase?.nombreClase}</td>
                                                <td>{bien.subClase?.nombreSubclase}</td>
                                                <td>{bien.fechaAdquisicion}</td>
                                                <td>{bien.condicion}</td>
                                                <td>
                                                    <Button variant="outline-primary" size="sm" onClick={() => { setFilaEditada(bien.codigoInventario); }}>
                                                        <FaPencilAlt />
                                                    </Button>
                                                </td>
                                            </tr>
                                        )
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="8" className="text-center">No se encontraron bienes.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </>
            )}
        </Container>
    );
}

export default FormularioPrueba;