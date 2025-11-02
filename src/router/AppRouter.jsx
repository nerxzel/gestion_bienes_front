import { Routes, Route } from "react-router-dom";

// Auth
import RutaProtegida from "../components/RutaProtegida.jsx";
import IniciarSesion from '../pages/Auth/AuthIniciarSesion.jsx';
import OlvideContrasenha from "../pages/Auth/AuthOlvideContrasenha.jsx";
import RestablecerContrasenha from "../pages/Auth/AuthRestablecerContrasenha.jsx";
import ValidarCodigo from "../pages/Auth/AuthValidarCodigo.jsx";

// Bienes
import Dashboard from "../pages/Dashboard.jsx";
import AgregarBien from "../pages/MaestroBienes/AgregarBien.jsx";
import ModificarBien from "../pages/MaestroBienes/ModificarBien.jsx";

// Grupos
import DashboardGrupo from "../pages/MaestroGrupos-Clases-Subclases/DashboardGrupo.jsx"
import AgregarGrupo from "../pages/MaestroGrupos-Clases-Subclases/AgregarGrupo.jsx"
import ModificarGrupo from "../pages/MaestroGrupos-Clases-Subclases/ModificarGrupo.jsx"

// Clases
import DashboardClase from "../pages/MaestroGrupos-Clases-Subclases/DashboardClase.jsx"
import AgregarClase from "../pages/MaestroGrupos-Clases-Subclases/AgregarClase.jsx"
import ModificarClase from "../pages/MaestroGrupos-Clases-Subclases/ModificarClase.jsx"

// Subclases
import DashboardSubclase from "../pages/MaestroGrupos-Clases-Subclases/DashboardSubclase.jsx"
import AgregarSubclase from "../pages/MaestroGrupos-Clases-Subclases/AgregarSubclase.jsx"
import ModificarSubclase from "../pages/MaestroGrupos-Clases-Subclases/ModificarSubclase.jsx"

// Marcas
import DashboardMarca from "../pages/MaestroMarcas-Modelos/DashboardMarca.jsx"
import AgregarMarca from "../pages/MaestroMarcas-Modelos/AgregarMarca.jsx"
import ModificarMarca from "../pages/MaestroMarcas-Modelos/ModificarMarca.jsx"

// Modelos
import DashboardModelo from "../pages/MaestroMarcas-Modelos/DashboardModelo.jsx"
import AgregarModelo from "../pages/MaestroMarcas-Modelos/AgregarModelo.jsx"
import ModificarModelo from "../pages/MaestroMarcas-Modelos/ModificarModelo.jsx"

// Ubicaciones
import DashboardUbicacion from "../pages/MaestroUbicaciones/DashboardUbicacion.jsx"
import AgregaUbicacion from "../pages/MaestroUbicaciones/AgregarUbicacion.jsx"
import ModificarUbicacion from "../pages/MaestroUbicaciones/ModificarUbicacion.jsx"

// Unidades De Medidas
import DashboardUnidadesMedidas from "../pages/MaestroUnidadesMedidas/DashboardUnidadesMedidas.jsx"
import AgregarUnidadesMedida from "../pages/MaestroUnidadesMedidas/AgregarUnidadesMedida.jsx"
import ModificarUnidadesMedida from "../pages/MaestroUnidadesMedidas/ModificarUnidadesMedida.jsx"

// Responsables
import DashboardResponsable from "../pages/MaestroResponsable/DashboardResponsable.jsx"
import AgregarResponsable from "../pages/MaestroResponsable/AgregarResponsable.jsx"
import ModificarResponsable from "../pages/MaestroResponsable/ModificarResponsable.jsx"

// Alta
import DarAlta from "../pages/Alta-Baja/ProcesosDarDeAlta.jsx";

// Baja
import DarBaja from "../pages/Alta-Baja/ProcesosDarDeBaja.jsx";


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
import CorrelativosPorGrupo from "../pages/ConfigCorrelativosPorGrupo.jsx";

import App from "../App.jsx"


function AppRouter() {
    return(
        <Routes> 
            // Auth
            <Route path="/" element={<IniciarSesion />}/>
            <Route path="/olvide-contrasenha" element={<OlvideContrasenha />}/>
            <Route path="/restablecer-contrasenha" element={<RestablecerContrasenha/>}/>
            <Route path="/validar-codigo" element={<ValidarCodigo/>}/>

            <Route element={<RutaProtegida/>}>
                <Route element={<App/>}>
                    // Bienes
                    <Route path="/dashboard" element={<Dashboard/>}/>
                    <Route path="/agregar-bien" element={<AgregarBien/>}/>
                    <Route path="/modificar-bien/:id" element={<ModificarBien/>}/>

                    // Grupos
                    <Route path="/dashboard-grupo" element={<DashboardGrupo/>}/>
                    <Route path="/agregar-grupo" element={<AgregarGrupo/>}/>
                    <Route path="/modificar-grupo/:id" element={<ModificarGrupo/>}/>

                    // Clases
                    <Route path="/dashboard-clase" element={<DashboardClase/>}/>
                    <Route path="/agregar-clase" element={<AgregarClase/>}/>
                    <Route path="/modificar-clase/:id" element={<ModificarClase/>}/>

                    // Subclase
                    <Route path="/dashboard-subclase" element={<DashboardSubclase/>}/>
                    <Route path="/agregar-subclase" element={<AgregarSubclase/>}/>
                    <Route path="/modificar-subclase/:id" element={<ModificarSubclase/>}/>

                    // Marcas
                    <Route path="/dashboard-marca" element={<DashboardMarca/>}/>
                    <Route path="/agregar-marca" element={<AgregarMarca/>}/>
                    <Route path="/modificar-marca/:id" element={<ModificarMarca/>}/>

                    // Modelos
                    <Route path="/dashboard-modelo" element={<DashboardModelo/>}/>
                    <Route path="/agregar-modelo" element={<AgregarModelo/>}/>
                    <Route path="/modificar-modelo/:id" element={<ModificarModelo/>}/>

                    // Ubicaciones
                    <Route path="/dashboard-ubicacion" element={<DashboardUbicacion/>}/>
                    <Route path="/agregar-ubicacion" element={<AgregaUbicacion/>}/>
                    <Route path="/modificar-ubicacion/:id" element={<ModificarUbicacion/>}/>

                    // Unidades de medidas
                    <Route path="/dashboard-unidadesM" element={<DashboardUnidadesMedidas/>}/>
                    <Route path="/agregar-unidadesM" element={<AgregarUnidadesMedida/>}/>
                    <Route path="/modificar-unidadesM/:id" element={<ModificarUnidadesMedida/>}/>

                    // Responsables
                    <Route path="/dashboard-responsable" element={<DashboardResponsable/>}/>
                    <Route path="/agregar-responsable" element={<AgregarResponsable/>}/>
                    <Route path="/modificar-responsable/:id" element={<ModificarResponsable/>}/>

                    // Alta
                    <Route path="/dar-alta/:id" element={<DarAlta/>}/>
                    <Route path="/bienes-alta" element={<BienesAlta/>}/>

                    // Baja
                    <Route path="/dar-baja/:id" element={<DarBaja/>}/>
                    <Route path="/bienes-baja" element={<BienesBaja/>}/>


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
                    <Route path="/depreciar" element={<Depreciar/>}/>             
                </Route>
            </Route>
        </Routes>

    );
}

export default AppRouter