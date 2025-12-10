export let mockBienes = [
    {
        id: 1,
        codigoInventario: "GRU-CLA-001",
        nombre: "Silla de Oficina Ergonómica",
        descripcionLarga: "Silla ejecutiva con soporte lumbar",
        valor: 150000,
        fechaIngreso: "2023-01-15",
        tipoObjeto: "Activo Fijo",
        numSerie: "SN-AERON-123-MOD",
        color: "Gris Oscuro",
        cantidadPieza: 1,
        largo: 0.65,
        alto: 1.1,
        ancho: 0.6,
        condicion: "Alta",
        costoAdquisicion: 180000,
        valorResidual: 18000,
        isla: "AA",
        fila: "A1",
        columna: "A2",
        grupo: "Mobiliario",
        clase: "Sillas",
        subClase: "Sillas de Oficina",
        marca: "Herman Miller",
        modelo: "Aeron",
        responsable: "123456789",
        idResponsable: 1,
        idGrupo: 1,
        idClase: 1,
        idSubClase: 1,
        idMarca: 1,
        idModelo: 1,
        idUbicacion: 1,
        idUnidadMedida: 1,
    },

    {
        id: 1,
        codigoInventario: "GRU-CLA-002",
        nombre: "Silla de Oficina Ergonómica",
        descripcionLarga: "Silla ejecutiva con soporte lumbar",
        valor: 150000,
        fechaIngreso: "2023-01-15",
        tipoObjeto: "Activo Fijo",
        numSerie: "SN-AERON-123-MOD",
        color: "Gris Oscuro",
        cantidadPieza: 1,
        largo: 0.65,
        alto: 1.1,
        ancho: 0.6,
        condicion: "Alta",
        costoAdquisicion: 180000,
        valorResidual: 18000,
        isla: "AA",
        fila: "A1",
        columna: "A2",
        grupo: "Mobiliario",
        clase: "Sillas",
        subClase: "Sillas de Oficina",
        marca: "Herman Miller",
        modelo: "Aeron",
        responsable: "123456789",
        idResponsable: 1,
        idGrupo: 1,
        idClase: 1,
        idSubClase: 1,
        idMarca: 1,
        idModelo: 1,
        idUbicacion: 1,
        idUnidadMedida: 1,
    },

];

export let mockGrupos = [
    { id: 1, nombre: "Mobiliario", vidaUtil: 10 },
    { id: 2, nombre: "Equipos Computacionales", vidaUtil: 5 },
];

export let mockClases = [
    { id: 1, nombre: "Sillas", idGrupo: 1, grupo: "Mobiliario" },
    { id: 2, nombre: "Mesas", idGrupo: 1, grupo: "Mobiliario" },
    { id: 3, nombre: "Notebooks", idGrupo: 2, grupo: "Equipos Computacionales" },
];

export let mockSubclases = [
    { id: 1, nombre: "Sillas de Oficina", idClase: 1, clase: "Sillas", grupo: "Mobiliario" },
    { id: 2, nombre: "Sillas de Espera", idClase: 1, clase: "Sillas", grupo: "Mobiliario" },
];

export let mockMarcas = [
    { id: 1, nombre: "Herman Miller" },
    { id: 2, nombre: "Dell" },
];

export let mockModelos = [
    { id: 1, nombre: "Aeron", idMarca: 1, marca: "Herman Miller" },
    { id: 2, nombre: "Latitude 5490", idMarca: 2, marca: "Dell" },
];

export let mockUbicaciones = [
    { id: 1, nombre: "Oficina Gerencia" },
    { id: 2, nombre: "Sala de Reuniones A" },
];

export let mockUnidadesMedida = [
    { id: 1, nombre: "Metro" },
    { id: 2, nombre: "Centimetro" },
];

export let mockResponsables = [
    { id: 1, nombre: "Juan Pérez", rut: "123456789", cargo: "Gerente TI", estado: "activo" },
    { id: 2, nombre: "Maria López", rut: "998887776", cargo: "Asistente", estado: "activo" },
];

const getNextId = (array) => {
    return array.length > 0 ? Math.max(...array.map(item => item.id)) + 1 : 1;
};

export const db = {

    // --- BIENES ---
    getBienesGrid: () => mockBienes.map(b => ({
        ...b,
        fechaAdquisicion: b.fechaIngreso.split('T')[0],
    })).filter(b => !b.isDeleted),

    getBienById: (id) => {
        const bien = mockBienes.find(b => b.id === parseInt(id));
        if (bien) {
            const responsable = mockResponsables.find(r => r.rut === bien.responsable);
            return {
                ...bien,
                fechaAdquisicion: bien.fechaIngreso.split('T')[0],
                idResponsable: responsable ? responsable.id : '',
            };
        }
        return null;
    },

    addBien: (data) => {
        const newId = getNextId(mockBienes);
        const grupo = mockGrupos.find(g => g.id === data.grupo.id)?.nombre || "N/A";
        const clase = mockClases.find(c => c.id === data.clase.id)?.nombre || "N/A";
        const subclase = mockSubclases.find(sc => sc.id === data.subclase.id)?.nombre || "N/A";
        const marca = mockMarcas.find(m => m.id === data.marca.id)?.nombre || "N/A";
        const modelo = mockModelos.find(m => m.id === data.modelo.id)?.nombre || "N/A";
        const ubicacion = mockUbicaciones.find(u => u.id === data.ubicacion.id)?.nombre || "N/A";
        const unidadMedida = mockUnidadesMedida.find(um => um.id === data.unidadMedida.id)?.nombre || "N/A";
        const responsable = mockResponsables.find(r => r.id === data.responsable.id)?.rut || "N/A";

        const nuevoBien = {
            ...data,
            id: newId,
            codigoInventario: `MOCK-${newId.toString().padStart(3, '0')}`,
            valor: data.costoAdquisicion,
            condicion: "Alta",
            isDeleted: false,
            fechaIngreso: data.fechaAdquisicion,
            grupo, clase, subclase, marca, modelo, ubicacion, unidadMedida, responsable
        };
        mockBienes.push(nuevoBien);
        return nuevoBien;
    },

    updateBien: (data) => {
        const grupo = mockGrupos.find(g => g.id === data.grupo.id)?.nombre || "N/A";
        const clase = mockClases.find(c => c.id === data.clase.id)?.nombre || "N/A";
        const subclase = mockSubclases.find(sc => sc.id === data.subclase.id)?.nombre || "N/A";
        const marca = mockMarcas.find(m => m.id === data.marca.id)?.nombre || "N/A";
        const modelo = mockModelos.find(m => m.id === data.modelo.id)?.nombre || "N/A";
        const ubicacion = mockUbicaciones.find(u => u.id === data.ubicacion.id)?.nombre || "N/A";
        const unidadMedida = mockUnidadesMedida.find(um => um.id === data.unidadMedida.id)?.nombre || "N/A";
        const responsable = mockResponsables.find(r => r.id === data.responsable.id)?.rut || "N/A";

        let bienActualizado = null;
        mockBienes = mockBienes.map(b => {
            if (b.id === data.id) {
                bienActualizado = {
                    ...b,
                    ...data,
                    fechaIngreso: data.fechaAdquisicion,
                    grupo, clase, subclase, marca, modelo, ubicacion, unidadMedida, responsable
                };
                return bienActualizado;
            }
            return b;
        });
        return bienActualizado;
    },

    deleteBien: (id) => {
        let bienEliminado = null;
        mockBienes = mockBienes.map(b => {
            if (b.id === parseInt(id)) {
                console.warn(`MOCK: Borrado lógico de bien ID: ${id}`);
                bienEliminado = { ...b, isDeleted: true, condicion: 'Baja' };
                return bienEliminado;
            }
            return b;
        });
        return bienEliminado;
    },

    setBienCondicion: (id, condicion) => {
        let bienActualizado = null;
        mockBienes = mockBienes.map(b =>
            b.id === parseInt(id)
                ? (bienActualizado = {
                    ...b,
                    condicion,
                    nroResolucion: `RES-MOCK-${id}`,
                    fechaResolucion: new Date().toISOString()
                })
                : b
        );
        return bienActualizado;
    },

    depreciar: () => {
        mockBienes.forEach(b => {
            if (b.condicion === "Alta" && b.valor > b.valorResidual) {
                const grupo = mockGrupos.find(g => g.nombre === b.grupo);
                if (grupo && grupo.vidaUtil > 0) {
                    const depreciacionAnual = (b.costoAdquisicion - b.valorResidual) / grupo.vidaUtil;
                    const depreciacionMensual = depreciacionAnual / 12;
                    b.valor = Math.max(b.valor - depreciacionMensual, b.valorResidual);
                    b.ultimaDepreciacion = new Date().toISOString().split('T')[0];
                }
            }
        });
        return { message: "Depreciación masiva simulada con éxito." };
    },

    // --- GRUPOS ---
    getGrupos: () => mockGrupos,

    getGruposDropdown: () => mockGrupos.map(g => ({ id: g.id, nombre: g.nombre })),

    getGrupoById: (id) => mockGrupos.find(g => g.id === parseInt(id)),

    addGrupo: (data) => {
        const newGrupo = {
            ...data,
            id: getNextId(mockGrupos),
            vidaUtil: parseInt(data.vidaUtil)
        };
        mockGrupos.push(newGrupo);
        return newGrupo;
    },

    updateGrupo: (data) => {
        mockGrupos = mockGrupos.map(g => {
            if (g.id === data.id) {
                return {
                    ...g,
                    ...data,
                    vidaUtil: parseInt(data.vidaUtil)
                };
            }
            return g;
        });
        return data;
    },

    // --- CLASES ---
    getClases: () => mockClases,

    getClaseById: (id) => mockClases.find(c => c.id === parseInt(id)),

    addClase: (data) => {
        const grupo = mockGrupos.find(g => g.id === parseInt(data.grupo.id));
        const newClase = {
            id: getNextId(mockClases),
            nombre: data.nombre,
            idGrupo: grupo.id,
            grupo: grupo.nombre
        };
        mockClases.push(newClase);
        return newClase;
    },

    updateClase: (data) => {
        const idGrupoEntrante = data.grupo?.id || data.idGrupo;
        const grupo = mockGrupos.find(g => g.id === parseInt(idGrupoEntrante));
        if (!grupo) {
            console.error(`ERROR: No se encontró el grupo con ID: ${idGrupoEntrante}`);
            return null;
        }

        let updateClase = null;
        mockClases = mockClases.map(c => {
            if (c.id === data.id) {
                updateClase = {
                    ...c,
                    nombre: data.nombre,
                    idGrupo: grupo.id,
                    grupo: grupo.nombre
                };
                return updateClase;
            }
            return c;
        });
        return updateClase;
    },

    getClasesDropdown: (idGrupo) => mockClases
        .filter(c => c.idGrupo === parseInt(idGrupo))
        .map(c => ({ id: c.id, nombre: c.nombre })),

    // --- SUBCLASES ---
    getSubclases: () => mockSubclases,

    getSubclaseById: (id) => mockSubclases.find(s => s.id === parseInt(id)),

    addSubclase: (data) => {
        const clase = mockClases.find(c => c.id === parseInt(data.clase.id));
        const grupo = mockGrupos.find(g => g.id === parseInt(data.grupo.id));
        const newSubclase = {
            id: getNextId(mockSubclases),
            nombre: data.nombre,
            idClase: clase.id,
            clase: clase.nombre,
            grupo: grupo.nombre
        };
        mockSubclases.push(newSubclase);
        return newSubclase;
    },

    updateSubclase: (data) => {
        const idClaseEntrante = data.clase?.id || data.idClase;
        const clase = mockClases.find(c => c.id === parseInt(idClaseEntrante));

        if (!clase) {
            console.error(`MOCK ERROR: No se encontró la clase con ID: ${idClaseEntrante}`);
            return null;
        }

        const grupo = mockGrupos.find(g => g.id === clase.idGrupo);

        if (!grupo) {
            console.error(`MOCK ERROR: La clase "${clase.nombre}" apunta a un grupo inexistente (ID: ${clase.idGrupo})`);
            return null;
        }

        let updatedSubclase = null;
        mockSubclases = mockSubclases.map(s => {
            if (s.id === data.id) {
                updatedSubclase = {
                    ...s,
                    nombre: data.nombre,
                    idClase: clase.id,
                    clase: clase.nombre,
                    grupo: grupo.nombre
                };
                return updatedSubclase;
            }
            return s;
        });
        return updatedSubclase;
    },

    getSubclasesDropdown: (idClase) => mockSubclases
        .filter(s => s.idClase === parseInt(idClase))
        .map(s => ({ id: s.id, nombre: s.nombre })),

    // --- MARCAS ---
    getMarcas: () => mockMarcas,
    getMarcasDropdown: () => mockMarcas.map(m => ({ id: m.id, nombre: m.nombre })),
    getMarcaById: (id) => mockMarcas.find(m => m.id === parseInt(id)),
    addMarca: (data) => {
        const newMarca = { ...data, id: getNextId(mockMarcas) };
        mockMarcas.push(newMarca);
        return newMarca;
    },
    updateMarca: (data) => {
        mockMarcas = mockMarcas.map(m => (m.id === data.id ? { ...m, ...data } : m));
        return data;
    },

    // --- MODELOS ---
    getModelos: () => mockModelos,
    getModeloById: (id) => mockModelos.find(m => m.id === parseInt(id)),
    addModelo: (data) => {
        const marca = mockMarcas.find(m => m.id === parseInt(data.marca.id));
        const newModelo = {
            id: getNextId(mockModelos),
            nombre: data.nombre,
            idMarca: marca.id,
            marca: marca.nombre
        };
        mockModelos.push(newModelo);
        return newModelo;
    },

    updateModelo: (data) => {
        const idMarcaEntrante = data.marca?.id || data.idMarca;
        const marca = mockMarcas.find(m => m.id === parseInt(idMarcaEntrante));
        if (!marca) {
            console.error(`ERROR: No se encontró la marca con ID: ${idMarcaEntrante}`);
            return null;
        }

        let updatedModelo = null;
        mockModelos = mockModelos.map(m => {
            if (m.id === data.id) {
                updatedModelo = {
                    ...m,
                    nombre: data.nombre,
                    idMarca: marca.id,
                    marca: marca.nombre
                };
                return updatedModelo;
            }
            return m;
        });
        return updatedModelo;
    },

    getModelosDropdown: (idMarca) => mockModelos
        .filter(m => m.idMarca === parseInt(idMarca))
        .map(m => ({ id: m.id, nombre: m.nombre })),

    // --- UBICACIONES ---
    getUbicaciones: () => mockUbicaciones,
    getUbicacionesDropdown: () => mockUbicaciones.map(u => ({ id: u.id, nombre: u.nombre })),
    getUbicacionById: (id) => mockUbicaciones.find(u => u.id === parseInt(id)),
    addUbicacion: (data) => {
        const newUbicacion = { ...data, id: getNextId(mockUbicaciones) };
        mockUbicaciones.push(newUbicacion);
        return newUbicacion;
    },
    updateUbicacion: (data) => {
        mockUbicaciones = mockUbicaciones.map(u => (u.id === data.id ? { ...u, ...data } : u));
        return data;
    },

    // --- UNIDADES DE MEDIDA ---
    getUnidadesMedida: () => mockUnidadesMedida,
    getUnidadesMedidaDropdown: () => mockUnidadesMedida.map(u => ({ id: u.id, nombre: u.nombre })),
    getUnidadMedidaById: (id) => mockUnidadesMedida.find(u => u.id === parseInt(id)),
    addUnidadMedida: (data) => {
        const newUnidad = { ...data, id: getNextId(mockUnidadesMedida) };
        mockUnidadesMedida.push(newUnidad);
        return newUnidad;
    },
    updateUnidadMedida: (data) => {
        mockUnidadesMedida = mockUnidadesMedida.map(u => (u.id === data.id ? { ...u, ...data } : u));
        return data;
    },

    // --- RESPONSABLES ---
    getResponsables: () => mockResponsables,
    getResponsableById: (id) => mockResponsables.find(r => r.id === parseInt(id)),
    addResponsable: (data) => {
        const newResponsable = { ...data, id: getNextId(mockResponsables) };
        mockResponsables.push(newResponsable);
        return newResponsable;
    },
    updateResponsable: (data) => {
        mockResponsables = mockResponsables.map(r => (r.id === data.id ? { ...r, ...data } : r));
        return data;
    },

    // --- AUTH ---
    login: (user, pass) => {
        if (user === "admin" && pass === "admin") {
            return { success: true, token: btoa("admin:admin") };
        }
        return { success: false };
    }
};