import { Routes, Route } from "react-router-dom";
import Login from '../pages/Login.jsx';
import RecuperarContrasenha from '../pages/RecuperarContrasenha.jsx'
import RestablecerContrasenha from "../pages/RestablecerContrasenha.jsx";



function AppRouter() {
    return(
        <Routes> 
            <Route path="/" element={<Login />}/>
            <Route path="/recuperar" element={<RecuperarContrasenha />}/>
            <Route path="/restablecer-contrasenha" element={<RestablecerContrasenha/>}/>
          
        </Routes>

    );
}

export default AppRouter