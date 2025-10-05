import { Routes, Route } from "react-router-dom";
import Login from '../pages/Login.jsx';
import RecuperarContrasenha from '../pages/RecuperarContrasenha.jsx'



function AppRouter() {
    return(
        <Routes> 
            <Route path="/" element={<Login />}/>
            <Route path="/recuperar" element={<RecuperarContrasenha />} />
          
        </Routes>

    );
}

export default AppRouter