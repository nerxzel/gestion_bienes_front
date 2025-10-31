import { Navigate, Outlet } from 'react-router-dom';

const RutaProtegida = () => {
  const userToken = localStorage.getItem('userToken');

  if (!userToken) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default RutaProtegida;