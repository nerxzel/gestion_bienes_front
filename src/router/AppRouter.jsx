import { Routes, Route } from "react-router-dom";
import Login from '../pages/AuthLogin.jsx';
import ForgotPassword from "../pages/AuthForgotPassword.jsx";
import ResetPassword from "../pages/AuthResetPassword.jsx";
import EnterCode from "../pages/AuthEnterCode.jsx";
import Dashboard from "../pages/Dashboard.jsx";
import AgregarBien from "../pages/MaestroAgregarBien.jsx";
import ModificarBien from "../pages/MaestroModificarBien.jsx";
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
            <Route path="/" element={<Login />}/>
            <Route path="/forgot-password" element={<ForgotPassword />}/>
            <Route path="/reset-password" element={<ResetPassword/>}/>
            <Route path="/enter-code" element={<EnterCode/>}/>

            <Route element={<App/>}>
                <Route path="/dashboard" element={<Dashboard/>}/>
                <Route path="/agregar-bien" element={<AgregarBien/>}/>
                <Route path="/modificar-bien" element={<ModificarBien/>}/>
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
        </Routes>

    );
}

export default AppRouter