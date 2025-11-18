import { http, HttpResponse } from 'msw'
import { db } from './db'

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const API_URL = import.meta.env.VITE_API_URL;

export const handlers = [
    
    // --- AUTH ---
    http.get(`${API_URL}/users/all`, async () => {
        await delay(400);
        return HttpResponse.json(db.login());
    }),

    // --- BIENES ---
    http.get(`${API_URL}/bien/grid`, async () => {
        await delay(500);
        return HttpResponse.json(db.getBienesGrid());
    }),
    
    http.get(`${API_URL}/bien/:id`, async ({ params }) => {
        await delay(300);
        const bien = db.getBienById(params.id);
        if (bien) {
            return HttpResponse.json(bien);
        }
        return new HttpResponse(null, { status: 404, statusText: 'Bien no encontrado' });
    }),
    
    http.post(`${API_URL}/bien/add`, async ({ request }) => {
        await delay(700);
        const data = await request.json();
        const nuevoBien = db.addBien(data);
        return HttpResponse.json(nuevoBien, { status: 201 });
    }),
    
    http.put(`${API_URL}/bien/update`, async ({ request }) => {
        await delay(700);
        const data = await request.json();
        const bienActualizado = db.updateBien(data);
        return HttpResponse.json(bienActualizado);
    }),

    http.delete(`${API_URL}/bien/:id`, async ({ params }) => {
        await delay(1000);
        db.deleteBien(params.id);
        return new HttpResponse(null, { status: 204 });
    }),

    // --- ALTA / BAJA ---
    http.put(`${API_URL}/bien/baja/:id`, async ({ params }) => {
        await delay(500);
        const bien = db.setBienCondicion(params.id, "Baja");
        return HttpResponse.json(bien);
    }),

    http.put(`${API_URL}/bien/alta/:id`, async ({ params }) => {
        await delay(500);
        const bien = db.setBienCondicion(params.id, "Alta");
        return HttpResponse.json(bien);
    }),

    // --- PROCESOS ---
    http.post(`${API_URL}/bien/depreciar`, async () => {
        await delay(2000); 
        const resultado = db.depreciar();
        return HttpResponse.json(resultado);
    }),

    // --- DROPDOWNS DINÁMICOS ---
    http.get(`${API_URL}/clase/dropdown/:grupoId`, async ({ params }) => {
        await delay(250);
        const clases = db.getClasesDropdown(params.grupoId);
        return HttpResponse.json(clases);
    }),

    http.get(`${API_URL}/subclase/dropdown/:claseId`, async ({ params }) => {
        await delay(250);
        const subclases = db.getSubclasesDropdown(params.claseId);
        return HttpResponse.json(subclases);
    }),

    http.get(`${API_URL}/modelo/dropdown/:marcaId`, async ({ params }) => {
        await delay(250);
        const modelos = db.getModelosDropdown(params.marcaId);
        return HttpResponse.json(modelos);
    }),

    // --- GRIDS Y DROPDOWNS ESTÁTICOS ---
    http.get(`${API_URL}/grupo/all`, async () => {
        await delay(150);
        return HttpResponse.json(db.getGrupos());
    }),

    http.get('/grupo/:id', async ({ params }) => {
        await delay(100);
        const grupo = db.getGrupoById(params.id);
        if (grupo) {
            return HttpResponse.json(grupo);
        }
        return new HttpResponse(null, { status: 404 });
    }),

    http.post('/grupo/add', async ({ request }) => {
        await delay(300);
        const data = await request.json();
        return HttpResponse.json(db.addGrupo(data), { status: 201 });
    }),
    
    http.put(`${API_URL}/grupo/update`, async ({ request }) => {
        await delay(300);
        const data = await request.json();
        return HttpResponse.json(db.updateGrupo(data));
    }),

    http.get(`${API_URL}/grupo/dropdown`, async () => {
        await delay(150);
        return HttpResponse.json(db.getGruposDropdown());
    }),
    
    http.get(`${API_URL}/responsable/all`, async () => {
        await delay(150);
        return HttpResponse.json(db.getResponsables());
    }),
    
    // --- Clases ---
    http.get(`${API_URL}/clase/all`, async () => {
        await delay(150);
        return HttpResponse.json(db.getClases());
    }),

    http.get(`${API_URL}/clase/:id`, async ({ params }) => {
        await delay(100);
        return HttpResponse.json(db.getClaseById(params.id));
    }),

    http.post(`${API_URL}/clase/add`, async ({ request }) => {
        await delay(300);
        const data = await request.json();
        return HttpResponse.json(db.addClase(data), { status: 201 });
    }),

    http.put(`${API_URL}/clase/update`, async ({ request }) => {
        await delay(300);
        const data = await request.json();
        return HttpResponse.json(db.updateClase(data));
    }),

    // --- Subclases ---
    http.get(`${API_URL}/subclase/all`, async () => {
        await delay(150);
        return HttpResponse.json(db.getSubclases());
    }),

    http.get(`${API_URL}/subclase/:id`, async ({ params }) => {
        await delay(100);
        return HttpResponse.json(db.getSubclaseById(params.id));
    }),

    http.post(`${API_URL}/subclase/add`, async ({ request }) => {
        await delay(300);
        const data = await request.json();
        return HttpResponse.json(db.addSubclase(data), { status: 201 });
    }),

    http.put(`${API_URL}/subclase/update`, async ({ request }) => {
        await delay(300);
        const data = await request.json();
        return HttpResponse.json(db.updateSubclase(data));
    }),

    // --- Marcas ---
    http.get(`${API_URL}/marca/all`, async () => {
        await delay(150);
        return HttpResponse.json(db.getMarcas());
    }),

    http.get(`${API_URL}/marca/dropdown`, async () => {
        await delay(150);
        return HttpResponse.json(db.getMarcasDropdown());
    }),

    http.get(`${API_URL}/marca/:id`, async ({ params }) => {
        await delay(100);
        return HttpResponse.json(db.getMarcaById(params.id));
    }),

    http.post(`${API_URL}/marca/add`, async ({ request }) => {
        await delay(300);
        const data = await request.json();
        return HttpResponse.json(db.addMarca(data), { status: 201 });
    }),
    
    http.put(`${API_URL}/marca/update`, async ({ request }) => {
        await delay(300);
        const data = await request.json();
        return HttpResponse.json(db.updateMarca(data));
    }),

    // --- Modelos ---
    http.get(`${API_URL}/modelo/all`, async () => {
        await delay(150);
        return HttpResponse.json(db.getModelos());
    }),

    http.get(`${API_URL}/modelo/:id`, async ({ params }) => {
        await delay(100);
        return HttpResponse.json(db.getModeloById(params.id));
    }),

    http.post(`${API_URL}/modelo/add`, async ({ request }) => {
        await delay(300);
        const data = await request.json();
        return HttpResponse.json(db.addModelo(data), { status: 201 });
    }),
    
    http.put(`${API_URL}/modelo/update`, async ({ request }) => {
        await delay(300);
        const data = await request.json();
        return HttpResponse.json(db.updateModelo(data));
    }),

    // --- Ubicaciones ---
    http.get(`${API_URL}/ubicacion/all`, async () => {
        await delay(150);
        return HttpResponse.json(db.getUbicaciones());
    }),

    http.get(`${API_URL}/ubicacion/dropdown`, async () => {
        await delay(150);
        return HttpResponse.json(db.getUbicacionesDropdown());
    }),

    http.get(`${API_URL}/ubicacion/:id`, async ({ params }) => {
        await delay(100);
        return HttpResponse.json(db.getUbicacionById(params.id));
    }),

    http.post(`${API_URL}/ubicacion/add`, async ({ request }) => {
        await delay(300);
        const data = await request.json();
        return HttpResponse.json(db.addUbicacion(data), { status: 201 });
    }),

    http.put(`${API_URL}/ubicacion/update`, async ({ request }) => {
        await delay(300);
        const data = await request.json();
        return HttpResponse.json(db.updateUbicacion(data));
    }),

    // --- Unidades de Medida ---
    http.get(`${API_URL}/unidadMedida/all`, async () => {
        await delay(150);
        return HttpResponse.json(db.getUnidadesMedida());
    }),

    http.get(`${API_URL}/unidadMedida/dropdown`, async () => {
        await delay(150);
        return HttpResponse.json(db.getUnidadesMedidaDropdown());
    }),
    
    http.get(`${API_URL}/unidadMedida/:id`, async ({ params }) => {
        await delay(100);
        return HttpResponse.json(db.getUnidadMedidaById(params.id));
    }),

    http.post(`${API_URL}/unidadMedida/add`, async ({ request }) => {
        await delay(300);
        const data = await request.json();
        return HttpResponse.json(db.addUnidadMedida(data), { status: 201 });
    }),

    http.put(`${API_URL}/unidadMedida/update`, async ({ request }) => {
        await delay(300);
        const data = await request.json();
        return HttpResponse.json(db.updateUnidadMedida(data));
    }),

    // --- Responsables
    http.get(`${API_URL}/responsable/:id`, async ({ params }) => {
        await delay(100);
        return HttpResponse.json(db.getResponsableById(params.id));
    }),

    http.post(`${API_URL}/responsable/add`, async ({ request }) => {
        await delay(300);
        const data = await request.json();
        return HttpResponse.json(db.addResponsable(data), { status: 201 });
    }),
    
    http.put(`${API_URL}/responsable/update`, async ({ request }) => {
        await delay(300);
        const data = await request.json();
        return HttpResponse.json(db.updateResponsable(data));
    }),
    
    http.get(`${API_URL}/marca/all`, async () => {
        await delay(150);
        return HttpResponse.json(db.getMarcas());
    }),

    http.get(`${API_URL}/marca/dropdown`, async () => {
        await delay(150);
        return HttpResponse.json(db.getMarcasDropdown());
    }),

    // --- REPORTES (Simulación de descarga) ---
    http.get(`${API_URL}/bien/excel/all`, async () => {
        await delay(1500);
        const fakeExcelBlob = new Blob(
            ["Este es un reporte Excel de bienes (simulado por MSW)"], 
            { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" }
        );
        return new HttpResponse(fakeExcelBlob, {
            headers: {
                'Content-Disposition': 'attachment; filename="Reporte_General_Mock.xlsx"',
            },
        });
    }),

    http.get(`${API_URL}/bien/hojamural/:responsableId`, async ({ params }) => {
        await delay(1000);
        const responsable = db.getResponsables().find(r => r.id === parseInt(params.responsableId));
        const nombre = responsable ? responsable.nombre.replace(' ', '_') : 'Desconocido';
        const fakeExcelBlob = new Blob(
            [`Este es un reporte de Hoja Mural para ${responsable.nombre} (simulado por MSW)`], 
            { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" }
        );
        return new HttpResponse(fakeExcelBlob, {
            headers: {
                'Content-Disposition': `attachment; filename="Hoja_Mural_${nombre}.xlsx"`,
            },
        });
    }),
];