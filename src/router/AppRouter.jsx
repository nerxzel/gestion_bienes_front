import { Routes, Route} from "react-router-dom";
import Login from '../pages/Login.jsx';



function AppRoutes() {
    return(
        <Routes> 
            <Route path="/" element={<Login />}/>
          
        </Routes>

    );
}

export default AppRoutes