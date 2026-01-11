import { Routes, Route } from "react-router-dom";

// Auth
import RutaProtegida from "../router/RutaProtegida.jsx";
import IniciarSesion from "../features/auth/pages/AuthIniciarSesion.jsx";
import OlvideContrasenha from "../features/auth/pages/AuthOlvideContrasenha.jsx";
import RestablecerContrasenha from "../features/auth/pages/AuthRestablecerContrasenha.jsx";
import ValidarCodigo from "../features/auth/pages/AuthValidarCodigo.jsx";

// Bienes
import Dashboard from "../features/bien/pages/Dashboard.jsx";
import AgregarBien from "../features/bien/pages/AgregarBien.jsx";
import ModificarBien from "../features/bien/pages/ModificarBien.jsx";

// Grupos
import DashboardGrupo from "../features/grupo/pages/DashboardGrupo.jsx"
import AgregarGrupo from "../features/grupo/pages/AgregarGrupo.jsx"
import ModificarGrupo from "../features/grupo/pages/ModificarGrupo.jsx"

// Clases
import DashboardClase from "../features/clase/pages/DashboardClase.jsx"
import AgregarClase from "../features/clase/pages/AgregarClase.jsx"
import ModificarClase from "../features/clase/pages/ModificarClase.jsx"

// Subclases
import DashboardSubclase from "../features/subclase/pages/DashboardSubclase.jsx"
import AgregarSubclase from "../features/subclase/pages/AgregarSubclase.jsx"
import ModificarSubclase from "../features/subclase/pages/ModificarSubclase.jsx"

// Marcas
import DashboardMarca from "../features/marca/pages/DashboardMarca.jsx"
import AgregarMarca from "../features/marca/pages/AgregarMarca.jsx"
import ModificarMarca from "../features/marca/pages/ModificarMarca.jsx"

// Modelos
import DashboardModelo from "../features/modelo/pages/DashboardModelo.jsx"
import AgregarModelo from "../features/modelo/pages/AgregarModelo.jsx"
import ModificarModelo from "../features/modelo/pages/ModificarModelo.jsx"

// Ubicaciones
import DashboardUbicacion from "../features/ubicacion/pages/DashboardUbicacion.jsx"
import AgregaUbicacion from "../features/ubicacion/pages/AgregarUbicacion.jsx"
import ModificarUbicacion from "../features/ubicacion/pages/ModificarUbicacion.jsx"

// Unidades De Medidas
import DashboardUnidadesMedidas from "../features/unidad-medida/pages/DashboardUnidadesMedidas.jsx"
import AgregarUnidadesMedida from "../features/unidad-medida/pages/AgregarUnidadesMedida.jsx"
import ModificarUnidadesMedida from "../features/unidad-medida/pages/ModificarUnidadesMedida.jsx"

// Responsables
import DashboardResponsable from "../features/responsable/pages/DashboardResponsable.jsx"
import AgregarResponsable from "../features/responsable/pages/AgregarResponsable.jsx"
import ModificarResponsable from "../features/responsable/pages/ModificarResponsable.jsx"

// Alta
import DarAlta from "../features/alta-baja/pages/Alta.jsx";

// Baja
import DarBaja from "../features/alta-baja/pages/Baja.jsx";

{/* import Test from "../test/TestPage.jsx"
import MaestroFuncionario from "../pages/ConfigMaestroFuncionario.jsx";
import TipoBien from "../pages/ConfigTipoBien.jsx";
import CambioResponsable from "../pages/ProcesosCambioResponsable.jsx";
import Depreciar from "../pages/ProcesosDepreciar.jsx";
import TomaInventario from "../pages/ProcesosTomaInventario.jsx";
import Traslado from "../pages/ProcesosTraslado.jsx";
import BienesAlta from "../pages/ReportesBienesAlta.jsx";
import BienesBaja from "../pages/ReportesBienesBaja.jsx";
import EtiquetaIndividual from "../pages/ReportesEtiquetaIndividual.jsx";
import EtiquetaPorResponsable from "../pages/ReportesEtiquetaPorResponsable.jsx";
import EtiquetasPorUbicacion from "../pages/ReportesEtiquetaPorUbicacion.jsx";
import HojaMural from "../pages/ReportesHojaMural.jsx";
import CorrelativosPorGrupo from "../pages/ConfigCorrelativosPorGrupo.jsx";*/}

import App from "../App.jsx"


function AppRouter() {
    return (
        <Routes>
            // Auth
            <Route path="/" element={<IniciarSesion />} />
            <Route path="/olvide-contrasenha" element={<OlvideContrasenha />} />
            <Route path="/restablecer-contrasenha" element={<RestablecerContrasenha />} />
            <Route path="/validar-codigo" element={<ValidarCodigo />} />

            <Route element={<RutaProtegida />}>
                <Route element={<App />}>
                    // Bienes
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/agregar-bien" element={<AgregarBien />} />
                    <Route path="/modificar-bien/:id" element={<ModificarBien />} />

                    // Grupos
                    <Route path="/dashboard-grupo" element={<DashboardGrupo />} />
                    <Route path="/agregar-grupo" element={<AgregarGrupo />} />
                    <Route path="/modificar-grupo/:id" element={<ModificarGrupo />} />

                    // Clases
                    <Route path="/dashboard-clase" element={<DashboardClase />} />
                    <Route path="/agregar-clase" element={<AgregarClase />} />
                    <Route path="/modificar-clase/:id" element={<ModificarClase />} />

                    // Subclase
                    <Route path="/dashboard-subclase" element={<DashboardSubclase />} />
                    <Route path="/agregar-subclase" element={<AgregarSubclase />} />
                    <Route path="/modificar-subclase/:id" element={<ModificarSubclase />} />

                    // Marcas
                    <Route path="/dashboard-marca" element={<DashboardMarca />} />
                    <Route path="/agregar-marca" element={<AgregarMarca />} />
                    <Route path="/modificar-marca/:id" element={<ModificarMarca />} />

                    // Modelos
                    <Route path="/dashboard-modelo" element={<DashboardModelo />} />
                    <Route path="/agregar-modelo" element={<AgregarModelo />} />
                    <Route path="/modificar-modelo/:id" element={<ModificarModelo />} />

                    // Ubicaciones
                    <Route path="/dashboard-ubicacion" element={<DashboardUbicacion />} />
                    <Route path="/agregar-ubicacion" element={<AgregaUbicacion />} />
                    <Route path="/modificar-ubicacion/:id" element={<ModificarUbicacion />} />

                    // Unidades de medidas
                    <Route path="/dashboard-unidadesM" element={<DashboardUnidadesMedidas />} />
                    <Route path="/agregar-unidadesM" element={<AgregarUnidadesMedida />} />
                    <Route path="/modificar-unidadesM/:id" element={<ModificarUnidadesMedida />} />

                    // Responsables
                    <Route path="/dashboard-responsable" element={<DashboardResponsable />} />
                    <Route path="/agregar-responsable" element={<AgregarResponsable />} />
                    <Route path="/modificar-responsable/:id" element={<ModificarResponsable />} />

                    // Alta
                    <Route path="/dar-alta/:id" element={<DarAlta />} />
                    {/*<Route path="/bienes-alta" element={<BienesAlta/>}/>*/}

                    // Baja
                    <Route path="/dar-baja/:id" element={<DarBaja />} />
                    {/*<Route path="/bienes-baja" element={<BienesBaja/>}/>*/}

                    {/*
                    <Route path="/test" element={<Test />} />
                    <Route path="/cambio-responsable" element={<CambioResponsable/>}/>
                    <Route path="/toma-inventario" element={<TomaInventario/>}/>
                    <Route path="/traslado" element={<Traslado/>}/>
                    <Route path="/etiquetas-individual" element={<EtiquetaIndividual/>}/>
                    <Route path="/etiquetas-responsable" element={<EtiquetaPorResponsable/>}/>
                    <Route path="/etiquetas-ubicacion" element={<EtiquetasPorUbicacion/>}/>
                    <Route path="/hoja-mural" element={<HojaMural/>}/>
                    <Route path="/correlativo-grupo" element={<CorrelativosPorGrupo/>}/>
                    <Route path="/maestro-funcionario" element={<MaestroFuncionario/>}/>
                    <Route path="/tipo-bien" element={<TipoBien/>}/>
                    <Route path="/depreciar" element={<Depreciar/>}/>*/}
                </Route>
            </Route>
        </Routes>

    );
}

export default AppRouter