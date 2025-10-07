import { Routes, Route } from "react-router-dom";
import Login from '../pages/Login.jsx';
import ForgotPassword from "../pages/ForgotPassword.jsx";
import ResetPassword from "../pages/ResetPassword.jsx";
import EnterCode from "../pages/EnterCode.jsx";

function AppRouter() {
    return(
        <Routes> 
            <Route path="/" element={<Login />}/>
            <Route path="/forgot-password" element={<ForgotPassword />}/>
            <Route path="/reset-password" element={<ResetPassword/>}/>
            <Route path="/enter-code" element={<EnterCode/>}/>
          
        </Routes>

    );
}

export default AppRouter