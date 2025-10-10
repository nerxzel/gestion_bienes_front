import { useState, useEffect } from 'react';
import api from '../api/axiosConfig';

function Saludito() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Usa la instancia 'api'. Ya sabe la URL base, solo necesita el endpoint.
    api.get('/users/show') 
      .then(response => {
        setUser(response.data);
      })
      .catch(error => {
        console.error("Hubo un error al traer los datos", error);
      });
  }, []);

  return   <>
            <h1>{user?.name}</h1>
            <p>Email: {user?.email}</p>
        </>;
}

export default Saludito;