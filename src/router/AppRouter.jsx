import { Routes, Route } from "react-router-dom";
import RutaProtegida from "../components/RutaProtegida.jsx";
import IniciarSesion from '../pages/AuthIniciarSesion.jsx';
import OlvideContrasenha from "../pages/AuthOlvideContrasenha.jsx";
import RestablecerContrasenha from "../pages/AuthRestablecerContrasenha.jsx";
import ValidarCodigo from "../pages/AuthValidarCodigo.jsx";
import Dashboard from "../pages/Dashboard.jsx";
import CorrelativosPorGrupo from "../pages/ConfigCorrelativosPorGrupo.jsx";
import GrupoClaseSubclase from "../pages/ConfigGrupoClaseSubclase.jsx"
import MaestroFuncionario from "../pages/ConfigMaestroFuncionario.jsx";
import Marca from "../pages/ConfigMarca.jsx";
import TipoBien from "../pages/ConfigTipoBien.jsx";
import Ubicaciones from "../pages/ConfigUbicaciones.jsx";
import UnidadesMedida from "../pages/ConfigUnidadesMedida.jsx";
import CambioResponsable from "../pages/ProcesosCambioResponsable.jsx";
import DarAlta from "../pages/ProcesosDarDeAlta.jsx";
import DarBaja from "../pages/ProcesosDarDeBaja.jsx";
import Depreciar from "../pages/ProcesosDepreciar.jsx";
import TomaInventario from "../pages/ProcesosTomaInventario.jsx";
import Traslado from "../pages/ProcesosTraslado.jsx";
import BienesAlta from "../pages/ReportesBienesAlta.jsx";
import BienesBaja from "../pages/ReportesBienesBaja.jsx";
import EtiquetaIndividual from "../pages/ReportesEtiquetaIndividual.jsx";
import EtiquetaPorResponsable from "../pages/ReportesEtiquetaPorResponsable.jsx";
import EtiquetasPorUbicacion from "../pages/ReportesEtiquetaPorUbicacion.jsx";
import HojaMural from "../pages/ReportesHojaMural.jsx";
import App from "../App.jsx"

function AppRouter() {
    return(
        <Routes> 
            <Route path="/" element={<IniciarSesion />}/>
            <Route path="/olvide-contrasenha" element={<OlvideContrasenha />}/>
            <Route path="/restablecer-contrasenha" element={<RestablecerContrasenha/>}/>
            <Route path="/validar-codigo" element={<ValidarCodigo/>}/>

            <Route element={<RutaProtegida/>}>
                <Route element={<App/>}>
                    <Route path="/dashboard" element={<Dashboard/>}/>
                    <Route path="/cambio-responsable" element={<CambioResponsable/>}/>
                    <Route path="/dar-alta" element={<DarAlta/>}/>
                    <Route path="/dar-baja" element={<DarBaja/>}/>
                    <Route path="/toma-inventario" element={<TomaInventario/>}/>
                    <Route path="/traslado" element={<Traslado/>}/>
                    <Route path="/bienes-alta" element={<BienesAlta/>}/>
                    <Route path="/bienes-baja" element={<BienesBaja/>}/>
                    <Route path="/etiquetas-individual" element={<EtiquetaIndividual/>}/>
                    <Route path="/etiquetas-responsable" element={<EtiquetaPorResponsable/>}/>
                    <Route path="/etiquetas-ubicacion" element={<EtiquetasPorUbicacion/>}/>
                    <Route path="/hoja-mural" element={<HojaMural/>}/>
                    <Route path="/correlativo-grupo" element={<CorrelativosPorGrupo/>}/>
                    <Route path="/grupo-clase-subclase" element={<GrupoClaseSubclase/>}/>
                    <Route path="/maestro-funcionario" element={<MaestroFuncionario/>}/>
                    <Route path="/marca" element={<Marca/>}/>
                    <Route path="/tipo-bien" element={<TipoBien/>}/>
                    <Route path="/ubicaciones" element={<Ubicaciones/>}/>
                    <Route path="/unidades-medida" element={<UnidadesMedida/>}/>
                    <Route path="/depreciar" element={<Depreciar/>}/>             
                </Route>
            </Route>
        </Routes>

    );
}

export default AppRouter