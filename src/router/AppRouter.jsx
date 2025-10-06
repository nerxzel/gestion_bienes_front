import { Routes, Route } from "react-router-dom";
import Login from '../pages/Login.jsx';
import ForgotPassword from "../pages/ForgotPassword.jsx";
import ResetPassword from "../pages/ResetPassword.jsx";

function AppRouter() {
    return(
        <Routes> 
            <Route path="/" element={<Login />}/>
            <Route path="/forgot-password" element={<ForgotPassword />}/>
            <Route path="/reset-password" element={<ResetPassword/>}/>
          
        </Routes>

    );
}

export default AppRouter